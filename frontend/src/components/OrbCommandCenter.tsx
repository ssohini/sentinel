import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Camera,
  Eye,
  FileText,
  MapPin,
  Radar,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import OptionWheel from './OptionWheel'

interface OrbCommandCenterProps {
  onSelectOption: (option: 'inspect' | 'history' | 'system') => void
}

const SENTINEL_MODES = [
  'THREAT ANALYSIS',
  'CAMERA NETWORK',
  'DAILY SURVEILLANCE REPORT',
  'LIVE FEED',
  'MAJOR INCIDENT LOG',
  'PATROL ACTIVITY',
  'ZONE MONITORING',
  'SYSTEM STATUS',
]

export function OrbCommandCenter({ onSelectOption }: OrbCommandCenterProps) {
  // Option 3: LIVE FEED is selected by default (PRIMARY MODE)
  const [selectedMode, setSelectedMode] = useState<number>(3)

  const handleModeChange = (index: number) => {
    setSelectedMode(index)
  }

  const handleExecuteAction = () => {
    if (selectedMode === 3) {
      onSelectOption('inspect') // Page 3 Live Feed
    } else if (selectedMode === 4) {
      onSelectOption('history') // Major Incident Log
    } else if (selectedMode === 2) {
      onSelectOption('system') // Daily Surveillance Report
    } else {
      // For demo modes (Threat Analysis, Camera Network, Patrol, Zone, System), fallback to live feed or report
      onSelectOption('inspect')
    }
  }

  return (
    <section id="command-center" className="relative h-screen max-h-screen w-full bg-[#030605] text-white pt-20 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden select-none flex flex-col justify-between">
      {/* Subtle Technical Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle Atmospheric Emerald Glow behind OptionWheel */}
      <div className="absolute left-[15%] top-[35%] w-[450px] h-[450px] bg-[#00D9B0]/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between my-auto space-y-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#00D9B0]/10 border border-[#00D9B0]/30 text-[10px] font-mono tracking-[0.25em] text-[#00D9B0] uppercase font-bold">
            SENTINEL
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-wider uppercase">
            COMMAND CENTER
          </h2>
          <p className="text-[11px] font-mono tracking-widest uppercase text-white/60 font-medium">
            SELECT A SURVEILLANCE MODE
          </p>
        </motion.div>

        {/* Main Command Console 3-Column Grid: OptionWheel (Left) | Selected Mode Panel (Center) | System Overview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Column 1: React Bits OptionWheel Container (35% Width) */}
          <div className="lg:col-span-4 relative flex flex-col justify-center">
            {/* Subtle Vertical Accent Guide Line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-[#00D9B0]/40 to-transparent pointer-events-none z-0" />

            <div className="flex items-center justify-between text-[10px] font-mono text-white/60 px-4 mb-2 z-10 font-bold">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9B0] shadow-[0_0_8px_#00D9B0]" />
                <span>SURVEILLANCE MODES ({SENTINEL_MODES.length})</span>
              </span>
              <span>● SYSTEM READY</span>
            </div>

            {/* React Bits OptionWheel Component Container with Explicit Height */}
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-black/60 border border-white/10 p-2 overflow-hidden z-10 shadow-2xl backdrop-blur-xl">
              <OptionWheel
                items={SENTINEL_MODES}
                defaultSelected={3}
                textColor="#707775"
                activeColor="#ffffff"
                side="left"
                fontSize={2.1}
                spacing={1.45}
                curve={1.2}
                tilt={7}
                blur={1.5}
                fade={0.22}
                smoothing={140}
                inset={50}
                loop={false}
                draggable
                onChange={handleModeChange}
              />
            </div>
          </div>

          {/* Column 2: Selected Mode Information Panel (Center 45% Width) */}
          <div className="lg:col-span-5">
            <motion.div
              key={selectedMode}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`p-6 sm:p-8 rounded-3xl backdrop-blur-2xl transition-all duration-300 ${
                selectedMode === 3
                  ? 'bg-black/70 border-[#00D9B0] shadow-[0_0_40px_rgba(0,217,176,0.25)] ring-1 ring-[#00D9B0]'
                  : selectedMode === 4
                  ? 'bg-amber-950/30 border-amber-500/70 shadow-[0_0_40px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/50'
                  : 'bg-white/[0.025] border-white/10'
              }`}
            >
              {/* MODE 0: THREAT ANALYSIS */}
              {selectedMode === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 01 / INTELLIGENCE
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#00D9B0]/40 text-xs font-mono text-[#00D9B0] font-bold">
                      <Radar className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● ANALYSIS ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      THREAT ANALYSIS
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Analyze detected movement, unusual activity and emerging risk patterns across monitored border sectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">THREAT LEVEL</span>
                      <span className="text-[#00D9B0] font-bold text-base mt-1 block">LOW</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">ACTIVE TRACKS</span>
                      <span className="text-white font-bold text-base mt-1 block">03 Subjects</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">PATTERN MATCH</span>
                      <span className="text-white font-bold text-base mt-1 block">87%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>OPEN THREAT ANALYSIS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 1: CAMERA NETWORK */}
              {selectedMode === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 02 / SURVEILLANCE
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/90 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● NETWORK STABLE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      CAMERA NETWORK
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Monitor the operational state and coverage of every connected surveillance camera across active border sectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">CAMERAS ONLINE</span>
                      <span className="text-white font-bold text-base mt-1 block">06 / 06 Feeds</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">SIGNAL QUALITY</span>
                      <span className="text-[#00D9B0] font-bold text-base mt-1 block">98%</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">ACTIVE SECTORS</span>
                      <span className="text-white font-bold text-base mt-1 block">04 Sectors</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>VIEW CAMERA NETWORK</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 2: DAILY SURVEILLANCE REPORT */}
              {selectedMode === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 03 / DAILY INTELLIGENCE
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/90 font-medium">
                      <FileText className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● REPORT READY
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      DAILY SURVEILLANCE REPORT
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Review detected activity, movement patterns, alerts and recurring conditions recorded throughout the surveillance cycle.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">EVENTS DETECTED</span>
                      <span className="text-[#00D9B0] font-bold text-base mt-1 block">18 Total</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">CAMERAS MONITORED</span>
                      <span className="text-white font-bold text-base mt-1 block">06 Sectors</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">RISK LEVEL</span>
                      <span className="text-white font-bold text-xs mt-1 block">MODERATE</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>VIEW DAILY REPORT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 3: LIVE FEED (PRIMARY MODE) */}
              {selectedMode === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 04 / PRIMARY MONITOR
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-[#00D9B0]/60 text-xs font-mono text-[#00D9B0] font-bold shadow-md">
                      <Camera className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● LIVE CCTV
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl sm:text-5xl font-sans font-black text-[#00D9B0] tracking-wide uppercase drop-shadow-[0_0_25px_rgba(0,217,176,0.5)]">
                      LIVE FEED
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-sans font-normal leading-relaxed">
                      Monitor active border CCTV footage and spatial video intelligence across surveillance sectors in real time.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/15 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-medium">CAMERAS</span>
                      <span className="text-white font-bold text-base mt-1 block">06 Feeds</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/15 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-medium">ACTIVE TRACKS</span>
                      <span className="text-[#00D9B0] font-bold text-base mt-1 block">03 Subjects</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/15 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-medium">ALERTS</span>
                      <span className="text-amber-400 font-bold text-xs mt-1 block flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> 01 Alert
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-4 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,217,176,0.4)]"
                  >
                    <span>ENTER LIVE MONITOR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 4: MAJOR INCIDENT LOG */}
              {selectedMode === 4 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                      OPTION 05 / HIGH PRIORITY
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/60 text-xs font-mono text-amber-300 font-bold shadow-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ● ALERTS ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-black text-amber-300 tracking-wide uppercase drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                      MAJOR INCIDENT LOG
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-sans font-normal leading-relaxed">
                      Review high-priority border events, alerts and recorded surveillance evidence requiring investigation.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-amber-500/30 bg-amber-950/20">
                      <span className="text-white/60 block text-[10px] font-semibold">ACTIVE INCIDENTS</span>
                      <span className="text-white font-bold text-base mt-1 block">03 Events</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-amber-500/40 bg-amber-950/30">
                      <span className="text-amber-300/80 block text-[10px] font-semibold">UNRESOLVED</span>
                      <span className="text-amber-400 font-black text-base mt-1 block">01 Pending</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-amber-500/30 bg-amber-950/20">
                      <span className="text-white/60 block text-[10px] font-semibold">LAST EVENT</span>
                      <span className="text-white font-bold text-xs mt-1 block">23:41:18</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>OPEN INCIDENT LOG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 5: PATROL ACTIVITY */}
              {selectedMode === 5 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 06 / MOVEMENT
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/90 font-medium">
                      <Activity className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● PATROL TRACKING
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      PATROL ACTIVITY
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Review observed patrol movement, route activity and recurring patterns across monitored border sectors.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">ACTIVE PATROLS</span>
                      <span className="text-white font-bold text-base mt-1 block">04 Units</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">SECTORS COVERED</span>
                      <span className="text-[#00D9B0] font-bold text-base mt-1 block">03 Sectors</span>
                    </div>
                    <div className="liquid-glass p-3 rounded-2xl border border-white/10 bg-black/40">
                      <span className="text-white/50 block text-[10px] font-semibold">LAST MOVEMENT</span>
                      <span className="text-white font-bold text-xs mt-1 block">23:38:42</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>VIEW PATROL ACTIVITY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 6: ZONE MONITORING */}
              {selectedMode === 6 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 07 / SPATIAL
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● ZONES ACTIVE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      ZONE MONITORING
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Inspect the current surveillance state of monitored border zones and identify areas requiring increased attention.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/70">NORTH SECTOR</span>
                      <span className="text-[#00D9B0] font-bold text-[10px]">STABLE</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/70">EAST CHECKPOINT</span>
                      <span className="text-blue-400 font-bold text-[10px]">MONITOR</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/70">RESTRICTED ZONE</span>
                      <span className="text-amber-400 font-bold text-[10px]">ALERT</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/70">SOUTH PERIMETER</span>
                      <span className="text-[#00D9B0] font-bold text-[10px]">STABLE</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>OPEN ZONE MAP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MODE 7: SYSTEM STATUS */}
              {selectedMode === 7 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                      OPTION 08 / SYSTEM
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#00D9B0]/40 text-xs font-mono text-[#00D9B0] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00D9B0]" />
                      ● ALL SYSTEMS OPERATIONAL
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-wide uppercase">
                      SYSTEM STATUS
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-sans font-normal leading-relaxed">
                      Monitor the operational health of cameras, spatial intelligence services and surveillance infrastructure.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/60">CAMERA NETWORK</span>
                      <span className="text-white font-bold">98%</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/60">AI ENGINE</span>
                      <span className="text-[#00D9B0] font-bold">ONLINE</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/60">VIDEO PIPELINE</span>
                      <span className="text-white font-bold">STABLE</span>
                    </div>
                    <div className="liquid-glass p-2.5 rounded-xl border border-white/10 bg-black/40 flex justify-between items-center">
                      <span className="text-white/60">SYSTEM UPTIME</span>
                      <span className="text-[#00D9B0] font-bold">99.8%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteAction}
                    className="w-full py-3.5 rounded-2xl bg-[#00D9B0] hover:bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>VIEW SYSTEM STATUS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Column 3: Right Side Information Column (3-Column Desktop Layout) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col space-y-4">
            <div className="liquid-glass p-5 rounded-3xl border border-white/10 bg-black/40 space-y-4">
              <div className="border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#00D9B0] font-bold uppercase">
                  SYSTEM OVERVIEW
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">CURRENT SECTOR</span>
                  <span className="text-white font-bold">NORTH BORDER</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">ACTIVE CAMERAS</span>
                  <span className="text-white font-bold">06 / 06</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">AI DETECTIONS</span>
                  <span className="text-[#00D9B0] font-bold">03 Subjects</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">SYSTEM UPTIME</span>
                  <span className="text-[#00D9B0] font-bold">99.8%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block font-semibold">
                  LIVE ACTIVITY LOG
                </span>
                <div className="space-y-1.5 text-[10px] font-mono text-white/70">
                  <div className="py-1 border-b border-white/5">
                    <span className="text-[#00D9B0]">23:41:18</span> Movement detected (North Sector)
                  </div>
                  <div className="py-1 border-b border-white/5">
                    <span className="text-white/40">23:38:42</span> Patrol movement (East Checkpoint)
                  </div>
                  <div className="py-1">
                    <span className="text-white/40">23:32:09</span> Camera state verified (Watchtower 03)
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-white/50 uppercase font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-white">SENTINEL SYSTEM</span>
            <span>·</span>
            <span className="text-white/70">SPATIAL VIDEO INTELLIGENCE</span>
          </div>

          <div className="flex items-center gap-4">
            <span>NETWORK: <strong className="text-[#00D9B0]">STABLE</strong></span>
            <span>CAMERAS: <strong className="text-white">06/06</strong></span>
            <span>AI ENGINE: <strong className="text-[#00D9B0]">ONLINE</strong></span>
            <span className="hidden sm:inline">LAST SYNC: <strong className="text-white/80">23:41:18</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
