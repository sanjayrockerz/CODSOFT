import { Github, Linkedin, Mail, Heart, Code2, ArrowUp } from 'lucide-react'
import { SOCIAL } from '../lib/data'

const FOOTER_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',   href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-surface-800 bg-surface-950/80 backdrop-blur">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-brand-400" />
              <span className="font-mono font-bold text-surface-100 text-sm">
                moti<span className="text-brand-400">.</span>dev
              </span>
            </div>
            <p className="text-surface-500 text-xs max-w-xs leading-relaxed">
              Full-Stack Engineer · RMK CSE + IIT Data Science · Chennai 🇮🇳
            </p>
            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { Icon: Github,   href: SOCIAL.github,   label: 'GitHub' },
                { Icon: Linkedin, href: SOCIAL.linkedin, label: 'LinkedIn' },
                { Icon: Mail,     href: `mailto:${SOCIAL.email}`, label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-surface-800 flex items-center justify-center
                             text-surface-500 hover:text-brand-400 hover:border-brand-400/30 transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-1">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-surface-500 hover:text-surface-200 text-xs transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl border border-surface-800 flex items-center justify-center
                       text-surface-500 hover:text-brand-400 hover:border-brand-400/30 transition-all duration-200
                       hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800 mt-8 pt-6 flex flex-col sm:flex-row items-center
                        justify-between gap-2">
          <p className="text-surface-600 text-[11px] text-center">
            © {new Date().getFullYear()} Moti Sanjay M. All rights reserved.
          </p>
          <p className="text-surface-700 text-[11px] flex items-center gap-1">
            Built with <Heart size={10} className="text-rose-500 fill-rose-500 mx-0.5" /> using React · Vite · Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
