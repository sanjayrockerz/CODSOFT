import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../lib/data'

const TECH_MARQUEE = [
  'React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB',
  'Express', 'Tailwind', 'Figma', 'Vercel', 'Docker',
  'Streamlit', 'FastAPI', 'Next.js', 'Git', 'PostgreSQL',
  'Postman', 'Vite', 'NumPy', 'Pandas', 'JWT',
]

function SkillBar({ name, level, icon, color, delay }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="space-y-1.5 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-xs font-medium text-surface-300 group-hover:text-surface-100 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono text-surface-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  )
}

function SkillCategory({ categoryKey, data, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-5 space-y-4 hover:border-brand-500/20 transition-colors duration-300"
    >
      {/* Category header */}
      <div className="flex items-center gap-2.5 pb-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base
                     border border-surface-700/60 bg-surface-800/50"
          style={{ borderColor: data.color + '30' }}
        >
          {data.icon}
        </div>
        <h3 className="text-sm font-bold text-surface-100">{data.label}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {data.items.map((skill, i) => (
          <SkillBar
            key={skill.name}
            {...skill}
            color={data.color}
            delay={index * 0.1 + i * 0.06 + 0.2}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-eyebrow">Technical Skills</span>
          <h2 className="section-title">Stack & Expertise</h2>
          <p className="section-subtitle">
            Full-stack to ML — the tools I use to ship production-grade applications.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(SKILLS).map(([key, data], i) => (
            <SkillCategory key={key} categoryKey={key} data={data} index={i} />
          ))}
        </div>

        {/* LeetCode callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col sm:flex-row
                     items-start sm:items-center gap-4"
        >
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <p className="text-surface-100 font-semibold text-sm">230+ LeetCode Problems Solved</p>
            <p className="text-surface-400 text-xs mt-0.5">
              Consistent problem-solver across Array, DP, Graph, and Tree domains.
              Strong DSA foundation applied in every system I build.
            </p>
          </div>
          <a
            href="https://leetcode.com/u/sanjay304/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs py-2 px-4 flex-shrink-0 border-amber-500/30 text-amber-400
                       hover:border-amber-400 hover:bg-amber-500/10"
          >
            View Profile
          </a>
        </motion.div>

        {/* Tech marquee */}
        <div className="mt-12 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="flex gap-3 animate-marquee whitespace-nowrap" aria-hidden="true">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-surface-800
                           bg-surface-900/40 text-surface-400 text-xs font-mono flex-shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
