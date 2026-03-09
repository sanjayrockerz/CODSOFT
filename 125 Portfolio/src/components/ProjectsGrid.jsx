import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'
import { PROJECTS } from '../lib/data'

const STATUS_MAP = {
  production: 'badge-production',
  live:       'badge-live',
  sih:        'badge-sih',
  progress:   'badge-progress',
}

const STATUS_DOT = {
  production: 'bg-emerald-400',
  live:       'bg-cyan-400',
  sih:        'bg-violet-400',
  progress:   'bg-amber-400',
}

function ProjectCard({ project, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card card-hover group relative overflow-hidden flex flex-col h-full"
    >
      {/* Gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Top: icon + badges */}
      <div className="flex items-start justify-between p-5 pb-0">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl
                       border border-surface-700 bg-surface-800/50 flex-shrink-0"
          >
            {project.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-surface-50 font-bold text-sm leading-tight group-hover:text-brand-300 transition-colors">
              {project.name}
            </h3>
            <p className="text-surface-500 text-xs mt-0.5 font-mono">{project.tagline}</p>
          </div>
        </div>

        {/* Status */}
        <div className={`${STATUS_MAP[project.status]} flex-shrink-0 text-[11px]`}>
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]} ${project.status === 'live' || project.status === 'production' ? 'animate-pulse' : ''}`} />
          {project.statusLabel}
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-4 flex-1">
        <p className="text-surface-400 text-xs leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Revenue badge */}
        {project.revenue && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                          bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <TrendingUp size={11} />
            {project.revenue} {project.revenueLabel}
          </div>
        )}
      </div>

      {/* Tech tags */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-surface-800 flex items-center justify-between">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-surface-500 hover:text-surface-200 text-xs transition-colors"
        >
          <Github size={13} />
          Source
        </a>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs py-1.5 px-3.5 gap-1.5"
        >
          <ExternalLink size={12} />
          Live Demo
        </a>
      </div>

      {/* Highlight ring for TRA */}
      {project.highlight && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 40px rgba(249,115,22,0.06)` }}
        />
      )}
    </motion.div>
  )
}

export default function ProjectsGrid() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-eyebrow">Production Portfolio</span>
          <h2 className="section-title">Real Projects. Real Impact.</h2>
          <p className="section-subtitle">
            Every project listed here is live and deployed — with real users, real revenue, or national recognition.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/sanjayrockerz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github size={15} /> More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
