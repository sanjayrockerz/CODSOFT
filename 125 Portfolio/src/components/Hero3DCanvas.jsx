import { useEffect, useRef } from 'react'
import { TECH_NODES } from '../lib/data'

// ── colour helpers ─────────────────────────────────────────────────────────────
const hexToRgb = (hex) => ({
  r: (hex >> 16) & 255,
  g: (hex >> 8)  & 255,
  b:  hex        & 255,
})
const rgba = (hex, a) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r},${g},${b},${a})`
}

// ── 3-D maths ─────────────────────────────────────────────────────────────────
const rotY = (x, z, a) => ({
  x: x * Math.cos(a) - z * Math.sin(a),
  z: x * Math.sin(a) + z * Math.cos(a),
})
const project = (x, y, z, fov, cx, cy) => {
  const s = fov / (fov + z)
  return { sx: x * s + cx, sy: y * s + cy, s }
}

// ── Sphere distribution ───────────────────────────────────────────────────────
const fibonacci = (n, total) => {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (n / (total - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const theta = golden * n
  return { x: r * Math.cos(theta), y, z: r * Math.sin(theta) }
}

export default function Hero3DCanvas() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const tilt      = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect reduced-motion preference
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId
    let angle = 0

    // ── Build node objects ─────────────────────────────────────────────────
    const R = 160          // sphere radius
    const nodes = TECH_NODES.map((n, i) => {
      const { x, y, z } = fibonacci(i, TECH_NODES.length)
      return {
        ...n,
        x: x * R,
        y: y * R,
        z: z * R,
        ox: x * R,
        oy: y * R,
        oz: z * R,
        pulse: Math.random() * Math.PI * 2,   // phase offset for glow pulse
      }
    })

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Mouse tracking ────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width  - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Draw loop ─────────────────────────────────────────────────────────
    const loop = () => {
      const W  = canvas.width
      const H  = canvas.height
      const cx = W / 2
      const cy = H / 2
      const fov = Math.min(W, H) * 0.9

      ctx.clearRect(0, 0, W, H)

      // Smooth tilt toward mouse
      const targetTiltX =  mouse.current.y * 0.18
      const targetTiltY = -mouse.current.x * 0.18
      tilt.current.x += (targetTiltX - tilt.current.x) * 0.06
      tilt.current.y += (targetTiltY - tilt.current.y) * 0.06

      const speed = noMotion ? 0 : 0.0025
      angle += speed

      // Apply rotations
      const rotated = nodes.map(n => {
        // Y-axis auto-rotate
        const ry = rotY(n.ox, n.oz, angle)
        // X-tilt from mouse
        const cosX = Math.cos(tilt.current.x)
        const sinX = Math.sin(tilt.current.x)
        const y2   = n.oy * cosX - ry.z * sinX
        const z2   = n.oy * sinX + ry.z * cosX
        // Y-tilt from mouse
        const cosY2 = Math.cos(tilt.current.y)
        const sinY2 = Math.sin(tilt.current.y)
        const x3    = ry.x * cosY2 - z2 * sinY2
        const z3    = ry.x * sinY2 + z2 * cosY2

        const proj = project(x3, y2, z3, fov, cx, cy)
        return { ...n, ...proj, dz: z3 }
      })

      // Sort back-to-front for correct overlap
      rotated.sort((a, b) => a.dz - b.dz)

      // ── Draw connections ─────────────────────────────────────────────────
      for (let i = 0; i < rotated.length; i++) {
        for (let j = i + 1; j < rotated.length; j++) {
          const a = rotated[i]
          const b = rotated[j]
          const dx = a.ox - b.ox
          const dy = a.oy - b.oy
          const dz = a.oz - b.oz
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
          if (dist > 120) continue            // only connect nearby nodes

          const avgDepth = (a.dz + b.dz) / 2
          const depthFade = Math.max(0, Math.min(1, (avgDepth + R) / (R * 2)))
          const alpha = (1 - dist / 120) * 0.25 * (0.4 + 0.6 * depthFade)

          // Mixed colour for cross-group connections
          const hexA = a.hex; const hexB = b.hex
          const rA = hexToRgb(hexA); const rB = hexToRgb(hexB)
          const rM = Math.round((rA.r + rB.r) / 2)
          const gM = Math.round((rA.g + rB.g) / 2)
          const bM = Math.round((rA.b + rB.b) / 2)

          ctx.beginPath()
          ctx.moveTo(a.sx, a.sy)
          ctx.lineTo(b.sx, b.sy)
          ctx.strokeStyle = `rgba(${rM},${gM},${bM},${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // ── Draw nodes ───────────────────────────────────────────────────────
      const t = performance.now() / 1000
      rotated.forEach(n => {
        const depthFade = Math.max(0.2, Math.min(1, (n.dz + R) / (R * 2)))
        const baseR = (n.s * 7) * depthFade
        const glowR = baseR * (1 + 0.15 * Math.sin(t * 2 + n.pulse))

        // Glow
        const grad = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, glowR * 3.5)
        grad.addColorStop(0,   rgba(n.hex, 0.55 * depthFade))
        grad.addColorStop(0.4, rgba(n.hex, 0.18 * depthFade))
        grad.addColorStop(1,   rgba(n.hex, 0))
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, glowR * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core sphere
        const coreGrad = ctx.createRadialGradient(
          n.sx - glowR * 0.25, n.sy - glowR * 0.25, 0,
          n.sx, n.sy, glowR,
        )
        coreGrad.addColorStop(0, rgba(n.hex, 0.95))
        coreGrad.addColorStop(1, rgba(n.hex, 0.55))
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, glowR, 0, Math.PI * 2)
        ctx.fillStyle = coreGrad
        ctx.fill()

        // Label — only readable nodes (front half + big enough)
        if (depthFade > 0.55 && n.s > 0.55) {
          const fontSize = Math.max(9, Math.round(11 * n.s * depthFade))
          ctx.font      = `600 ${fontSize}px Inter, sans-serif`
          ctx.textAlign = 'center'
          ctx.shadowBlur   = 6
          ctx.shadowColor  = rgba(n.hex, 0.8)
          ctx.fillStyle    = rgba(n.hex, Math.min(1, depthFade * 1.4))
          ctx.fillText(n.label, n.sx, n.sy - glowR - 4)
          ctx.shadowBlur = 0
        }
      })

      animId = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
