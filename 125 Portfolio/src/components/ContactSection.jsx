import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, SendHorizonal, Loader2, CheckCircle2, Github, Linkedin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { SOCIAL } from '../lib/data'

// ─── EmailJS config — set these in .env.local ─────────────────────────────────
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const EJS_READY    = EJS_SERVICE && EJS_TEMPLATE && EJS_KEY

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'motisanjay04@gmail.com',
    href: 'mailto:motisanjay04@gmail.com',
    color: '#06b6d4',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Chennai, Tamil Nadu, India 🇮🇳',
    href: null,
    color: '#f43f5e',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/sanjayrockerz',
    href: SOCIAL.github,
    color: '#94a3b8',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/moti-sanjay-m',
    href: SOCIAL.linkedin,
    color: '#0ea5e9',
  },
]

const PROJECT_TYPES = [
  'Full-Stack Web App',
  'Frontend / UI',
  'Backend / API',
  'AI / ML Integration',
  'Logistics / Freight',
  'Other',
]

const INITIAL_FORM = { name: '', email: '', projectType: '', budget: '', message: '' }

export default function ContactSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form,    setForm]    = useState(INITIAL_FORM)
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in Name, Email, and Message.')
      return
    }
    setSending(true)

    // ── Path 1: EmailJS (credentials configured in .env.local) ──────────────
    if (EJS_READY) {
      try {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          {
            from_name:    form.name,
            from_email:   form.email,
            project_type: form.projectType || 'Not specified',
            budget:       form.budget       || 'Not specified',
            message:      form.message,
            to_email:     'motisanjay04@gmail.com',
          },
          EJS_KEY,
        )
        setSent(true)
        toast.success("Message sent! I'll reply within 24 hours.")
        setForm(INITIAL_FORM)
        setTimeout(() => setSent(false), 5000)
        setSending(false)
        return
      } catch (err) {
        console.error('EmailJS error:', err)
        // fall through to mailto fallback
      }
    }

    // ── Path 2: mailto fallback (always works, zero config) ─────────────────
    setSending(false)
    const subject = encodeURIComponent(
      `Portfolio Inquiry — ${form.projectType || 'Project'} from ${form.name}`
    )
    const body = encodeURIComponent(
      `Hi Moti,\n\nName: ${form.name}\nEmail: ${form.email}\nProject: ${form.projectType || 'N/A'}\nBudget: ${form.budget || 'TBD'}\n\n${form.message}\n\n---\nSent from motisanjay.vercel.app`
    )
    window.open(`mailto:motisanjay04@gmail.com?subject=${subject}&body=${body}`)
    toast.success('Opening your mail client — message pre-filled!')
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-surface-900/60 border border-surface-700/60 text-surface-100 ' +
    'text-sm placeholder:text-surface-600 focus:outline-none focus:border-brand-500/60 ' +
    'focus:bg-surface-900 transition-all duration-200'

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Let's Build Something</h2>
          <p className="section-subtitle">
            Got a project idea? Need a developer who ships? Send me a message and I'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px,1fr] gap-8 max-w-5xl mx-auto">
          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Intro card */}
            <div className="card p-5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <Mail size={18} className="text-brand-400" />
              </div>
              <p className="text-surface-300 text-sm leading-relaxed">
                Open to <span className="text-surface-100 font-medium">freelance projects</span>,{' '}
                <span className="text-surface-100 font-medium">internships</span>, and{' '}
                <span className="text-surface-100 font-medium">collaboration</span>.
                Based in Chennai — remote-friendly.
              </p>
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <p className="text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available · Typical projects start at ₹10k
                </p>
              </div>
            </div>

            {/* Contact items */}
            {CONTACT_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="card card-hover p-4 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.color + '15', border: `1px solid ${item.color}30` }}
                >
                  <item.icon size={15} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-surface-500 text-[11px] uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-surface-200 text-xs hover:text-brand-400 transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-surface-200 text-xs truncate">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-4">

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">
                    Name <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">
                    Email <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="priya@startup.in"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">Project Type</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select type…</option>
                    {PROJECT_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-surface-400">Budget (₹)</label>
                  <input
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. ₹15,000 – ₹25,000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-surface-400">
                  Message <span className="text-brand-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project — what you're building, timeline, and what help you need…"
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2
                            transition-all duration-300
                            ${sent
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'btn-primary justify-center'}`}
              >
                {sending ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : sent ? (
                  <><CheckCircle2 size={16} /> Message Sent!</>
                ) : (
                  <><SendHorizonal size={16} /> Send Message — I'll Reply in 24h</>
                )}
              </button>

              <p className="text-center text-surface-600 text-[11px]">
                {EJS_READY
                  ? 'Direct delivery to motisanjay04@gmail.com · No spam, ever.'
                  : 'Will open your mail client pre-filled · motisanjay04@gmail.com'}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
