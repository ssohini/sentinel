import { Activity } from 'lucide-react'

export interface NavbarProps {
  activeTab?: 'inspect' | 'history' | 'system'
  currentTab?: 'inspect' | 'history' | 'system'
  onSelectTab?: (tab: 'inspect' | 'history' | 'system') => void
  onNavigateTab?: (tab: 'inspect' | 'history' | 'system') => void
  onScrollToCommandCenter?: () => void
  onReturnToCommandCenter?: () => void
  isOnline?: boolean
}

export function Navbar({
  activeTab = 'inspect',
  currentTab,
  onSelectTab,
  onNavigateTab,
  onScrollToCommandCenter,
  onReturnToCommandCenter,
}: NavbarProps) {
  const current = currentTab || activeTab
  const handleTabClick = (tab: 'inspect' | 'history' | 'system') => {
    if (onSelectTab) onSelectTab(tab)
    if (onNavigateTab) onNavigateTab(tab)
  }

  const handleCommandCenterClick = () => {
    if (onScrollToCommandCenter) onScrollToCommandCenter()
    if (onReturnToCommandCenter) onReturnToCommandCenter()
  }

  return (
    <header className="fixed top-4 left-6 right-6 z-50 h-[64px] rounded-full bg-[#050a09]/75 backdrop-blur-xl border border-white/[0.08] shadow-2xl px-6 flex items-center justify-between select-none">
      {/* Left: Emerald Status Dot + SENTINEL Title + Subtitle */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={handleCommandCenterClick}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#00D9B0] shadow-[0_0_10px_#00D9B0] animate-pulse" />
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-serif italic font-bold tracking-wider text-white">
            SENTINEL
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.2em] text-[#00D9B0] uppercase font-semibold">
            SPATIAL VIDEO INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Center: Floating Navigation Pills */}
      <nav className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10 text-xs font-mono">
        <button
          type="button"
          onClick={handleCommandCenterClick}
          className="px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold text-white/80 hover:text-white hover:bg-white/10"
        >
          COMMAND CENTER
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('inspect')}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
            current === 'inspect'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          SURVEILLANCE
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('system')}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
            current === 'system'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          INTELLIGENCE
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('history')}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
            current === 'history'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          INCIDENTS
        </button>
      </nav>

      {/* Right: SYSTEM READY Badge */}
      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#00D9B0]/40 text-[10px] font-mono text-[#00D9B0] font-bold">
          <Activity className="w-3 h-3 text-[#00D9B0]" />
          ● SYSTEM READY
        </span>
      </div>
    </header>
  )
}
