import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  activeTab: 'inspect' | 'history' | 'system'
  onSelectTab: (tab: 'inspect' | 'history' | 'system') => void
  onScrollToCommandCenter: () => void
  isOnline?: boolean
}

export function Navbar({
  activeTab,
  onSelectTab,
  onScrollToCommandCenter,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (tab?: 'inspect' | 'history' | 'system') => {
    setMobileOpen(false)
    if (tab) {
      onSelectTab(tab)
    }
    onScrollToCommandCenter()
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div className="liquid-glass px-6 py-3.5 flex items-center justify-between rounded-full transition-all duration-300">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="group flex items-center gap-2 text-white no-underline"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9A5] shadow-[0_0_10px_#00D9A5] animate-pulse" />
            <span className="font-serif italic text-2xl tracking-tight font-normal text-white group-hover:text-[#00D9A5] transition-colors">
              SENTINEL
            </span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.06]">
          <button
            type="button"
            onClick={() => handleNavClick()}
            className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium text-white/75 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            COMMAND CENTER
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('inspect')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'inspect'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/65 hover:text-white hover:bg-white/10'
            }`}
          >
            SURVEILLANCE
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('system')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'system'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/65 hover:text-white hover:bg-white/10'
            }`}
          >
            INTELLIGENCE
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('history')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-white/65 hover:text-white hover:bg-white/10'
            }`}
          >
            INCIDENTS
          </button>
        </div>

        {/* System Ready Badge */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-950/40 border border-[#00D9A5]/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#00D9A5]">
          <span className="w-2 h-2 rounded-full bg-[#00D9A5] shadow-[0_0_8px_#00D9A5]" />
          <span className="tracking-widest">● SYSTEM READY</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white p-1 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 liquid-glass-strong p-4 rounded-2xl flex flex-col gap-2 border border-white/15 animate-fadeIn">
          <button
            type="button"
            onClick={() => handleNavClick('inspect')}
            className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'inspect' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            SURVEILLANCE
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('system')}
            className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'system' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            INTELLIGENCE
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('history')}
            className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'history' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            INCIDENTS
          </button>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#00D9A5] px-2">
            <span>STATUS</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00D9A5] animate-pulse" />
              ● SYSTEM READY
            </span>
          </div>
        </div>
      )}
    </nav>
  )
}
