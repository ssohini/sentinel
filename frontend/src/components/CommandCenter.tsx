import { motion } from 'framer-motion'
import { Activity, AlertTriangle, ArrowUpRight, Camera, FileText } from 'lucide-react'
import { FadingVideo } from './FadingVideo'

interface CommandCenterProps {
  activeTab: 'inspect' | 'history' | 'system'
  onSelectTab: (tab: 'inspect' | 'history' | 'system') => void
  children: React.ReactNode
}

const ATMOSPHERIC_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4'

export function CommandCenter({
  activeTab,
  onSelectTab,
  children,
}: CommandCenterProps) {
  return (
    <section id="command-center" className="relative min-h-screen bg-[#080908] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Bright Background Atmospheric Video */}
      <FadingVideo
        src={ATMOSPHERIC_VIDEO_URL}
        opacity={0.65}
        overlayOpacity={0.25}
        className="z-0"
      />

      {/* Dark Stone Texture Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c221f_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-emerald-400 font-semibold drop-shadow-md">
              // ENVIRONMENTAL INTELLIGENCE
            </span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-white tracking-tight drop-shadow-lg">
            EHS-Vision Safety Command Center
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl font-light drop-shadow-md">
            Monitor live environments, review safety intelligence, and investigate critical incidents from one place.
          </p>
        </div>

        {/* Three Primary Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: LIVE FEED */}
          <motion.div
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectTab('inspect')}
            className={`cursor-pointer group relative p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
              activeTab === 'inspect'
                ? 'liquid-glass-strong border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
                : 'liquid-glass border-white/15 hover:border-white/30 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                <Camera className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono tracking-widest text-emerald-300 uppercase shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400/90 font-medium">
                OPTION 01
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                Live Feed
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Observe active camera feeds and AI detections as they happen.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
              <span>EXPLORE FEED</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: DAILY REPORT */}
          <motion.div
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectTab('system')}
            className={`cursor-pointer group relative p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
              activeTab === 'system'
                ? 'liquid-glass-strong border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
                : 'liquid-glass border-white/15 hover:border-white/30 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/20 text-[10px] font-mono tracking-widest text-white/80 uppercase shadow-md">
                <Activity className="w-3 h-3 text-emerald-400" />
                REPORT ACTIVE
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400/90 font-medium">
                OPTION 02
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                Daily Report
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Review the day's detected hazards, safety events, risk levels and recurring conditions.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
              <span>VIEW REPORT</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: MAJOR INCIDENT LOG */}
          <motion.div
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectTab('history')}
            className={`cursor-pointer group relative p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
              activeTab === 'history'
                ? 'liquid-glass-strong border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]'
                : 'liquid-glass border-white/15 hover:border-white/30 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/15 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[10px] font-mono tracking-widest text-amber-300 uppercase shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                LOG SYNCHRONIZED
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400/90 font-medium">
                OPTION 03
              </span>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white font-normal group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                Major Incident Log
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Investigate high-priority incidents with traceable IDs, timestamps and recorded evidence.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70 group-hover:text-white transition-colors">
              <span>OPEN INCIDENTS</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* Selected Application View Content Container */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  )
}
