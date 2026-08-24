import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react'
import { EarthBackground } from './EarthBackground'

interface LandingPageProps {
  onLoginSuccess: () => void
}

export function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [accessCode, setAccessCode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode.trim().toLowerCase() === 'sentinel') {
      setErrorMsg('')
      onLoginSuccess()
    } else {
      setErrorMsg('ACCESS DENIED — INVALID ACCESS CODE')
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030403] text-white flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Realistic Cinematic Earth Video Background */}
      <EarthBackground />

      {/* Top Header / Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center gap-1.5 pt-4 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#00D9A5]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#00D9A5] font-semibold">
            BORDER SURVEILLANCE COMMAND PLATFORM
          </span>
        </div>
      </motion.div>

      {/* Main Center Content: SENTINEL Title & Glass Login Box over Earth */}
      <div className="relative z-20 max-w-xl w-full mx-auto my-auto flex flex-col items-center gap-8 text-center">
        {/* Cinematic Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="space-y-2"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-sans font-extrabold tracking-[0.25em] uppercase text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
            SEN<span className="text-[#00D9A5] drop-shadow-[0_0_25px_#00D9A5]">T</span>INEL
          </h1>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/90 font-medium drop-shadow-md">
              AI-POWERED SPATIAL VIDEO INTELLIGENCE
            </p>
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60 drop-shadow-sm">
              BORDER SURVEILLANCE COMMAND PLATFORM
            </p>
          </div>
        </motion.div>

        {/* Compact Glass Login Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="w-full max-w-md p-6 sm:p-8 rounded-3xl liquid-glass-strong border border-white/20 shadow-2xl backdrop-blur-3xl space-y-6 text-left"
        >
          <div className="space-y-1 border-b border-white/10 pb-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Lock className="w-4 h-4 text-[#00D9A5]" />
              <h2 className="font-serif italic text-2xl sm:text-3xl text-white font-normal">
                ENTER COMMAND CENTER
              </h2>
            </div>
            <p className="text-xs text-white/60 font-sans font-light">
              Access the Sentinel surveillance intelligence interface.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="access-code" className="block text-[11px] font-mono uppercase tracking-wider text-white/70">
                ACCESS CODE
              </label>
              <input
                id="access-code"
                type="password"
                value={accessCode}
                placeholder="Enter access code"
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-2xl px-4 py-3 text-sm text-white font-mono placeholder-white/40 focus:outline-none focus:border-[#00D9A5] transition-all"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-mono text-center animate-fadeIn">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#00D9A5] hover:bg-emerald-400 text-black font-semibold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,217,165,0.35)] cursor-pointer"
            >
              <span>ENTER SENTINEL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] font-mono text-white/50 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D9A5]" />
            <span>DEMO PASSWORD: <strong className="text-white">sentinel</strong></span>
          </div>
        </motion.div>
      </div>

      {/* Footer Status Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-20 py-2 text-center text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase"
      >
        <span>SENTINEL SYSTEM</span> · <span>SPATIAL VIDEO INTELLIGENCE</span> · <span className="text-[#00D9A5]">DEMO ENVIRONMENT</span>
      </motion.div>
    </div>
  )
}
