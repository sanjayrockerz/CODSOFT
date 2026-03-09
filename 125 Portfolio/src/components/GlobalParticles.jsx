import { useEffect, useRef } from 'react'

// ─── Config ──────────────────────────────────────────────────────────────────
const CFG = {
  count:         72,        // total orbs
  connectDist:   130,       // px — draw line between orbs this close
  repelRadius:   110,       // px — mouse pushes orbs away within this radius
  repelStrength: 0.018,     // how hard the push is
  returnSpeed:   0.042,     // how fast orbs drift back to their home
  orbitSpeed:    0.00022,   // base revolution speed (very slow)
  // palette — cyan / teal / violet / emerald at varying values
  colors: [
    [6,  182, 212],   // cyan-500
    [14, 165, 233],   // sky-500
    [34, 211, 238],   // cyan-400
    [139, 92, 246],   // violet-500
    [16, 185, 129],   // emerald-500
    [99, 102, 241],   // indigo-500
  ],
}

// ─── Helper ───────────────────────────────────────────────────────────────────
const rand  = (a, b) => a + Math.random() * (b - a)
const pick  = (arr)  => arr[Math.floor(Math.random() * arr.length)]

// ─── Component ───────────────────────────────────────────────────────────────
export default function GlobalParticles() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    // Respect reduced-motion
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // ── Build orbs ───────────────────────────────────────────────────────────
    const orbs = Array.from({ length: CFG.count }, () => {
      const rgb        = pick(CFG.colors)
      const orbitR     = rand(40, 220)          // orbit radius around home
      const orbitAngle = rand(0, Math.PI * 2)   // starting angle
      const orbitSpeed = CFG.orbitSpeed * rand(0.3, 1.8) * (Math.random() > 0.5 ? 1 : -1)
      const hx = rand(0, 1)   // home position as fraction (set after first resize)
      const hy = rand(0, 1)
      return {
        rgb,
        r:        rand(1.5, 4.2),   // base radius
        alpha:    rand(0.35, 0.85),
        orbitR,
        orbitAngle,
        orbitSpeed,
        hxF: hx, hyF: hy,           // home fractions (responsive)
        hx:  0, hy: 0,              // absolute home (computed each frame)
        x:   0, y:  0,              // live position
        vx:  0, vy: 0,              // repel velocity
      }
    })

    // ── Draw loop ────────────────────────────────────────────────────────────
    const loop = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const speed = noMotion ? 0 : 1

      // Update orbs
      orbs.forEach(o => {
        // Home position (responsive)
        o.hx = o.hxF * W
        o.hy = o.hyF * H

        // Orbit around home
        if (speed) o.orbitAngle += o.orbitSpeed

        const targetX = o.hx + Math.cos(o.orbitAngle) * o.orbitR
        const targetY = o.hy + Math.sin(o.orbitAngle) * o.orbitR

        // Mouse repulsion
        const dx    = o.x - mouse.current.x
        const dy    = o.y - mouse.current.y
        const dist  = Math.sqrt(dx * dx + dy * dy)
        if (dist < CFG.repelRadius && dist > 0) {
          const force = (1 - dist / CFG.repelRadius) * CFG.repelStrength
          o.vx += (dx / dist) * force * 60
          o.vy += (dy / dist) * force * 60
        }

        // Dampen velocity
        o.vx *= 0.88
        o.vy *= 0.88

        // Move toward orbit target + drift from repel
        o.x += (targetX - o.x) * CFG.returnSpeed * speed + o.vx
        o.y += (targetY - o.y) * CFG.returnSpeed * speed + o.vy

        // Init position on first frame
        if (o.x === 0 && o.y === 0) {
          o.x = targetX
          o.y = targetY
        }
      })

      // Draw connections
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a  = orbs[i]
          const b  = orbs[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d > CFG.connectDist) continue

          const alpha = (1 - d / CFG.connectDist) * 0.12
          const [r, g, bl] = a.rgb
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`
          ctx.lineWidth   = 0.7
          ctx.stroke()
        }
      }

      // Draw orbs
      orbs.forEach(o => {
        const [r, g, b] = o.rgb

        // Outer glow
        const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5)
        glow.addColorStop(0,   `rgba(${r},${g},${b},${o.alpha * 0.45})`)
        glow.addColorStop(0.5, `rgba(${r},${g},${b},${o.alpha * 0.12})`)
        glow.addColorStop(1,   `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core orb
        const core = ctx.createRadialGradient(
          o.x - o.r * 0.3, o.y - o.r * 0.3, 0,
          o.x, o.y, o.r,
        )
        core.addColorStop(0, `rgba(255,255,255,${o.alpha * 0.9})`)
        core.addColorStop(0.4, `rgba(${r},${g},${b},${o.alpha})`)
        core.addColorStop(1,   `rgba(${r},${g},${b},${o.alpha * 0.4})`)
        ctx.beginPath()
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
      })

      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
