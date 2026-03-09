import { Toaster } from 'react-hot-toast'
import Navbar          from './components/Navbar'
import HeroSection     from './components/HeroSection'
import AboutSection    from './components/AboutSection'
import ProjectsGrid    from './components/ProjectsGrid'
import SkillsSection   from './components/SkillsSection'
import ContactSection  from './components/ContactSection'
import Footer          from './components/Footer'
import GlobalParticles from './components/GlobalParticles'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-surface-100">
      {/* Background grid overlay (subtle) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-40"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-radial-brand"
        aria-hidden="true"
      />

      {/* Global particle orbs — persists across all sections */}
      <GlobalParticles />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsGrid />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#151520',
            color: '#f1f5f9',
            border: '1px solid #1e2030',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#06b6d4', secondary: '#0a0a0f' } },
          error:   { iconTheme: { primary: '#f43f5e', secondary: '#0a0a0f' } },
        }}
      />
    </div>
  )
}
