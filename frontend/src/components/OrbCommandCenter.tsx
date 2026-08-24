import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Camera, FileText, ShieldAlert } from 'lucide-react'
import OptionWheel from './OptionWheel'

interface OrbCommandCenterProps {
  onSelectOption: (option: 'inspect' | 'history' | 'system') => void
}

export function OrbCommandCenter({ onSelectOption }: OrbCommandCenterProps) {
  // Option 0: MAJOR INCIDENT LOG, Option 1: DAILY SURVEILLANCE REPORT, Option 2: LIVE FEED (Default selected)
  const [selectedMode, setSelectedMode] = useState<number>(2)

  const handleModeChange = (index: number) => {
    setSelectedMode(index)
  }

  const handleExecuteAction = () => {
    if (selectedMode === 2) {
      onSelectOption('inspect') // Page 3 Live Feed
    } else if (selectedMode === 0) {
      onSelectOption('history') // Incident Log
    } else if (selectedMode === 1) {
      onSelectOption('system') // Daily Report
    }
  }

  return (
    <section id="command-center" className="relative h-screen max-h-screen w-full bg-[#050807] text-white pt-20 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden select-none flex flex-col justify-center">
      {/* Background Atmospheric Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(0,217,176,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between my-auto space-y-4">
        {/* Page Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-[0.25em] text-[#00D9A5] uppercase">
            SITUATIONAL AWARENESS
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-white tracking-tight">
            COMMAND CENTER
          </h2>
          <p className="text-[11px] sm:text-xs text-white/70 font-mono tracking-widest uppercase">
            SELECT A SURVEILLANCE MODE
          </p>
        </motion.div>

        {/* Main Content Split Grid: React Bits OptionWheel (Left 45%) vs Selected Mode Info Panel (Right 55%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Left Column: React Bits OptionWheel Container (Explicit Height Required) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            {/* Subtle Vertical Accent Guide Line behind Wheel */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#00D9A5]/40 to-transparent pointer-events-none z-0" />

            <div className="flex items-center justify-between text-[10px] font-mono text-white/50 px-4 mb-2 z-10">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9A5] shadow-[0_0_8px_#00D9A5]" />
                <span>SURVEILLANCE MODES</span>
              </span>
              <span>● SYSTEM READY</span>
            </div>

            {/* React Bits OptionWheel Component Container with Controlled Explicit Height */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-3xl bg-black/40 border border-white/10 p-2 overflow-hidden z-10 shadow-2xl">
              <OptionWheel
                items={[
                  'MAJOR INCIDENT LOG',
                  'DAILY SURVEILLANCE REPORT',
                  'LIVE FEED',
                ]}
                defaultSelected={2}
                textColor="#707775"
                activeColor="#ffffff"
                side="left"
                fontSize={2.3}
                spacing={1.4}
                curve={1.2}
                tilt={7}
                blur={1.5}
                fade={0.22}
                smoothing={140}
                inset={70}
                loop={false}
                draggable
                onChange={handleModeChange}
              />
            </div>
          </div>

          {/* Right Column: Selected Mode Information Panel (55% Width) */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedMode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
                selectedMode === 2
                  ? 'liquid-glass-strong border-[#00D9A5] shadow-[0_0_40px_rgba(0,217,165,0.25)] ring-1 ring-[#00D9A5]'
                  : 'liquid-glass border-white/15'
              }`}
            >
              {/* MODE 0: MAJOR INCIDENT LOG */}
              {selectedMode === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                      OPTION 01 / HIGH PRIORITY
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-mono text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ALERTS ACTIVE
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      MAJOR INCIDENT LOG
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 font-sans font-light leading-relaxed">
                      Review high-priority border events, alerts, detected movement and recorded surveillance evidence across all sectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">ACTIVE INCIDENTS</span>
                      <span className="text-white font-bold text-base mt-1 block">03 Events</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">UNRESOLVED</span>
                      <span className="text-amber-400 font-bold text-base mt-1 block">01 Pending</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">LAST EVENT</span>
                      <span className="text-white font-bold text-xs mt-1 block">23:41:18</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>OPEN INCIDENT LOG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 1: DAILY SURVEILLANCE REPORT */}
              {selectedMode === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9A5] font-bold uppercase">
                      OPTION 02 / DAILY INTELLIGENCE
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-[11px] font-mono text-white/80">
                      <FileText className="w-3.5 h-3.5 text-[#00D9A5]" />
                      REPORT READY
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                      DAILY SURVEILLANCE REPORT
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 font-sans font-light leading-relaxed">
                      Review detected activity, movement patterns, alerts and recurring border events recorded throughout the day.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">CAMERAS MONITORED</span>
                      <span className="text-white font-bold text-base mt-1 block">06 Sectors</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">EVENTS DETECTED</span>
                      <span className="text-[#00D9A5] font-bold text-base mt-1 block">18 Total</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">RISK LEVEL</span>
                      <span className="text-white font-bold text-xs mt-1 block">MODERATE</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9A5] hover:bg-emerald-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>VIEW DAILY REPORT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 2: LIVE FEED (PRIMARY EMPHASIZED OPTION) */}
              {selectedMode === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9A5] font-bold uppercase">
                      OPTION 03 / PRIMARY MONITOR
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-[#00D9A5]/50 text-[11px] font-mono text-[#00D9A5]">
                      <Camera className="w-3.5 h-3.5 text-[#00D9A5]" />
                      ● LIVE CCTV DEMO
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif italic text-3xl sm:text-4xl text-[#00D9A5] font-normal drop-shadow-[0_0_20px_rgba(0,217,165,0.4)]">
                      LIVE FEED
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-light leading-relaxed">
                      Monitor simulated border CCTV footage and spatial video intelligence across active surveillance sectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">CCTV CHANNELS</span>
                      <span className="text-white font-bold text-base mt-1 block">06 Feeds</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">ACTIVE TRACKS</span>
                      <span className="text-[#00D9A5] font-bold text-base mt-1 block">03 Subjects</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10">
                      <span className="text-white/40 block text-[10px]">SPATIAL ALERTS</span>
                      <span className="text-amber-400 font-bold text-xs mt-1 block flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> 01 Alert
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9A5] hover:bg-emerald-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,217,165,0.35)]"
                  >
                    <span>ENTER LIVE MONITOR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
