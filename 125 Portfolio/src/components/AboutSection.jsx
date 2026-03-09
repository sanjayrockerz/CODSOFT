import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Briefcase, Code2, Trophy, MapPin } from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    color: '#06b6d4',
    title: 'Education',
    lines: ['B.E. CSE — RMK Engineering College (2024–2028)', 'B.S. Data Science — IIT Madras (ongoing)'],
  },
  {
    icon: Briefcase,
    color: '#10b981',
    title: 'Experience',
    lines: ['₹10,000+ freelance revenue delivered', '4+ production apps on Vercel'],
  },
  {
    icon: Trophy,
    color: '#f59e0b',
    title: 'Achievements',
    lines: ['SIH 2024 — Internal College Pick', '230+ LeetCode problems solved'],
  },
  {
    icon: MapPin,
    color: '#f43f5e',
    title: 'Location',
    lines: ['Chennai, Tamil Nadu 🇮🇳', 'Remote-friendly, open to relocation'],
  },
]

const STATS = [
  { number: '6+',    label: 'Live Projects' },
  { number: '230+',  label: 'LeetCode Solves' },
  { number: '₹20k+', label: 'Freelance Revenue' },
  { number: '2',     label: 'Degrees (ongoing)' },
]

function StatItem({ number, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl font-black text-gradient">{number}</div>
      <div className="text-xs text-surface-500 mt-1 leading-tight">{label}</div>
    </motion.div>
  )
}

export default function AboutSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="section-header">
            <span className="section-eyebrow">About Me</span>
            <h2 className="section-title">The Person Behind the Code</h2>
            <p className="section-subtitle">
              2nd-year CSE student at RMK + IIT B.S. Data Science — building real products, solving real problems.
            </p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: image + stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden border border-surface-800 bg-surface-900/40">
                <img
                  src="/moti-about.jpg"
                  alt="Moti Sanjay M at work"
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-surface-100 font-semibold text-sm">Moti Sanjay M</p>
                  <p className="text-brand-400 text-xs font-mono">Full Stack Engineer · Chennai</p>
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-surface-800 bg-surface-900/40">
                {STATS.map((s, i) => (
                  <StatItem key={s.label} {...s} delay={0.3 + i * 0.08} />
                ))}
              </div>
            </motion.div>

            {/* Right: bio + highlights */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-4 text-surface-300 leading-relaxed">
                <p className="text-base">
                  I'm a{' '}
                  <span className="text-surface-100 font-semibold">2nd-year B.E. CSE student at RMK Engineering College</span>{' '}
                  pursuing a dual degree with{' '}
                  <span className="text-brand-400 font-semibold">IIT Madras B.S. Data Science</span>.
                  My goal is an AI/ML career — and I'm building towards it one project at a time.
                </p>
                <p>
                  Right now my shipped work is full-stack: the{' '}
                  <span className="text-amber-400 font-medium">TRA Freight Network</span>{' '}
                  earned ₹10,000+ as a paid freelance build, and the{' '}
                  <span className="text-violet-400 font-medium">Smart Cattle Breed AI</span>{' '}
                  (MobileNetV2 + Streamlit) was selected for SIH 2024 at the college level.
                  Full-stack gives me the power to deploy ML models — not just train them.
                </p>
                <p>
                  With{' '}
                  <span className="text-emerald-400 font-medium">230+ LeetCode problems solved</span>{' '}
                  and an ongoing IIT Data Science degree, I'm actively bridging the gap between
                  production web engineering and applied machine learning.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="card card-hover p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: h.color + '18', border: `1px solid ${h.color}30` }}
                      >
                        <h.icon size={15} style={{ color: h.color }} />
                      </div>
                      <span className="text-sm font-semibold text-surface-100">{h.title}</span>
                    </div>
                    {h.lines.map((line) => (
                      <p key={line} className="text-xs text-surface-400 leading-snug pl-8 sm:pl-[42px]">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View / Download Resume
                </a>
                <a href={`mailto:motisanjay2004@gmail.com`} className="btn-outline">
                  <Code2 size={14} /> Let's Build Together
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
