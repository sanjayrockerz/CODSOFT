import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Download } from 'lucide-react'
import { SOCIAL } from '../lib/data'
import clsx from 'clsx'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Update active section
      const sectionIds = ['home','about','projects','skills','contact']
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-surface-950/90 backdrop-blur-md border-b border-surface-800/60 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center group-hover:border-brand-400/60 transition-colors">
              <Terminal size={14} className="text-brand-400" />
            </div>
            <span className="font-mono font-bold text-surface-100 text-sm tracking-tight">
              moti<span className="text-brand-400">.</span>dev
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={clsx(
                  'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  active === link.href.replace('#', '')
                    ? 'text-brand-400'
                    : 'text-surface-400 hover:text-surface-100'
                )}
              >
                {active === link.href.replace('#', '') && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-brand-500/10 border border-brand-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-2 px-4"
            >
              <Download size={13} />
              Resume
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary text-xs py-2 px-4"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-surface-400 hover:text-surface-100 rounded-lg hover:bg-surface-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-4 right-4 z-40 rounded-2xl border border-surface-700/60
                       bg-surface-900/95 backdrop-blur-lg shadow-2xl p-4"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={clsx(
                    'text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    active === link.href.replace('#', '')
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : 'text-surface-300 hover:bg-surface-800/50 hover:text-surface-100'
                  )}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-surface-800 mt-2 pt-3 flex flex-col gap-2">
                <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center text-sm">
                  <Download size={14} /> Resume
                </a>
                <button onClick={() => scrollTo('#contact')} className="btn-primary justify-center text-sm">
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
