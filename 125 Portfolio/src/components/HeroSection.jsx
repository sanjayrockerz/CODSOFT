import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown, Code2, Zap, BrainCircuit } from 'lucide-react'
import { TERMINAL_SEQUENCE, ACHIEVEMENTS, SOCIAL, HERO_ROLES } from '../lib/data'

// ── Terminal simulation ───────────────────────────────────────────────────────
function TerminalWindow() {
  const [lines,      setLines]      = useState([])
  const [typing,     setTyping]     = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const bodyRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, typing])

  const runPhase = useCallback((idx) => {
    if (idx >= TERMINAL_SEQUENCE.length) return
    const { cmd, output } = TERMINAL_SEQUENCE[idx]
    let charIdx = 0
    const iv = setInterval(() => {
      charIdx++
      setTyping(cmd.slice(0, charIdx))
      if (charIdx >= cmd.length) {
        clearInterval(iv)
        setTimeout(() => {
          setTyping('')
          setLines(prev => [
            ...prev,
            { type: 'cmd', text: cmd },
            ...output.map(o => ({ type: 'out', text: o })),
          ])
          if (idx + 1 < TERMINAL_SEQUENCE.length) {
            setTimeout(() => runPhase(idx + 1), 900)
          }
        }, 350)
      }
    }, 42)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => runPhase(0), 800)
    return () => clearTimeout(id)
  }, [runPhase])

  return (
    <div className="terminal-window w-full max-w-lg">
      <div className="terminal-bar gap-3">
        <span className="terminal-dot bg-red-500/80" />
        <span className="terminal-dot bg-yellow-500/80" />
        <span className="terminal-dot bg-emerald-500/80" />
        <span className="ml-2 text-surface-500 text-xs font-mono">moti@dev:~$</span>
        {/* Dual-identity label */}
        <span className="ml-auto flex items-center gap-2 text-[10px] font-mono mr-1">
          <span className="text-brand-400">FS</span>
          <span className="text-surface-600">+</span>
          <span className="text-violet-400">AI/ML</span>
        </span>
      </div>
      <div
        ref={bodyRef}
        className="p-4 h-52 overflow-y-auto text-xs leading-relaxed space-y-0.5 scrollbar-thin"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'cmd'
                ? 'text-brand-400 font-semibold'
                : line.text.includes('ai_ml') || line.text.includes('TensorFlow') ||
                  line.text.includes('Streamlit') || line.text.includes('iit')
                  ? 'text-violet-300 pl-2'
                  : 'text-surface-300 pl-2'
            }
          >
            {line.type === 'cmd' && <span className="text-surface-500 mr-2 select-none">▶</span>}
            {line.text}
          </div>
        ))}
        <div className="text-brand-400 font-semibold">
          <span className="text-surface-500 mr-2 select-none">▶</span>
          {typing}
          <span
            className="inline-block w-[7px] h-[13px] bg-brand-400 ml-0.5 align-middle"
            style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Achievement badge ─────────────────────────────────────────────────────────
function AchievementBadge({ icon, label, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', bounce: 0.3 }}
      className="flex flex-col items-center gap-1 p-3 rounded-xl border border-surface-800
                 bg-surface-900/60 backdrop-blur-sm hover:border-brand-500/30
                 hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      <span className="text-lg">{icon}</span>
      <span className="font-bold text-sm leading-none" style={{ color }}>{label}</span>
      <span className="text-[10px] text-surface-500 text-center leading-tight">{sub}</span>
    </motion.div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact  = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % HERO_ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Radial vignette + bottom fade */}
      <div className="absolute inset-0 pointer-events-none z-[1]"
           style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, rgba(10,10,15,0.82) 100%)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-24 pb-16">
        <div className="section-container w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left ── */}
            <div className="space-y-6 order-2 lg:order-1">

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="section-eyebrow">
                  <Zap size={10} className="inline mr-1" />
                  Available for Internships &amp; Freelance
                </span>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-1.5 pb-2"
              >
                <p className="font-mono text-[11px] text-brand-400 tracking-[0.3em] uppercase select-none">
                  Hi, I'm
                </p>
                <h1
                  className="font-display font-bold leading-[1.15] tracking-[-0.025em] text-shimmer"
                  style={{ fontSize: 'clamp(2rem, 7.5vw, 3.75rem)' }}
                >
                  Moti Sanjay M
                </h1>
              </motion.div>

              {/* Dual-identity pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28 }}
                className="flex items-center gap-2 flex-wrap"
              >
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                 bg-brand-500/10 border border-brand-500/25 text-brand-300">
                  <Code2 size={11} /> Full-Stack Engineer
                </span>
                <span className="text-surface-600 text-xs">+</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                 bg-violet-500/10 border border-violet-500/25 text-violet-300">
                  <BrainCircuit size={11} /> AI / ML
                </span>
              </motion.div>

              {/* Cycling role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-col gap-1.5 w-full sm:max-w-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 sm:h-8 sm:overflow-hidden">
                  <span className="text-surface-500 text-sm font-light tracking-wide">Currently building as a</span>
                  <div className="relative h-8 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIdx}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0,  opacity: 1 }}
                        exit={{    y: -24, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        className="font-display font-semibold text-[1.05rem] whitespace-nowrap"
                        style={{
                          color: roleIdx === 1 || roleIdx === 3 || roleIdx === 4
                            ? '#a78bfa'
                            : '#06b6d4',
                        }}
                      >
                        {HERO_ROLES[roleIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
                <p className="text-surface-500 text-[11px] font-mono tracking-[0.1em]">
                  RMK CSE&nbsp;'28 ·&nbsp;IIT B.S. Data Science · Chennai 🇮🇳
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <button onClick={scrollToProjects} className="btn-primary">
                  <Code2 size={15} /> View My Work
                </button>
                <button onClick={scrollToContact} className="btn-outline">
                  <Mail size={15} /> Get In Touch
                </button>
              </motion.div>

              {/* Social row */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="flex items-center gap-3 pt-1 flex-wrap"
              >
                {[
                  { icon: Github,   href: SOCIAL.github,   label: 'GitHub' },
                  { icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
                  { icon: Mail,     href: `mailto:${SOCIAL.email}`, label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     aria-label={label}
                     className="w-9 h-9 rounded-lg border border-surface-700 flex items-center justify-center
                                text-surface-400 hover:text-brand-400 hover:border-brand-400/40
                                hover:bg-brand-400/5 transition-all duration-200">
                    <Icon size={16} />
                  </a>
                ))}
                <a href={SOCIAL.leetcode} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-700
                              text-surface-400 hover:text-amber-400 hover:border-amber-400/40
                              text-xs font-mono transition-all duration-200">
                  💡 LeetCode · 230+
                </a>
              </motion.div>
            </div>

            {/* ── Right: profile card + terminal ── */}
            <div className="space-y-5 order-1 lg:order-2">

              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-surface-800
                           bg-surface-900/60 backdrop-blur"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-500/30 glow-cyan">
                    <img
                      src="/moti-sanjay-profile.jpg"
                      alt="Moti Sanjay M"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full
                                   border-2 border-surface-900 flex items-center justify-center text-[8px]">✓</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-surface-50 tracking-[-0.01em]">Moti Sanjay M</p>
                  <p className="text-brand-400 text-xs font-mono mt-0.5">@sanjayrockerz</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="badge-production">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open to work
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                                     bg-violet-500/10 border border-violet-500/25 text-violet-300">
                      🤖 AI/ML Career
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <TerminalWindow />
              </motion.div>
            </div>
          </div>

          {/* Achievement strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-14 grid grid-cols-3 sm:grid-cols-5 gap-3"
          >
            {ACHIEVEMENTS.map((a, i) => (
              <AchievementBadge key={a.label} {...a} delay={0.85 + i * 0.07} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <button
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-1.5 text-surface-500 hover:text-brand-400 transition-colors"
          aria-label="Scroll to projects"
        >
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <ChevronDown size={18} className="animate-bounce-gentle" />
        </button>
      </motion.div>
    </section>
  )
}
