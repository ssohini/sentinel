import { motion } from 'framer-motion'
import { ArrowDownRight, Eye, Radar, ShieldAlert, Sparkles } from 'lucide-react'
import { FadingVideo } from './FadingVideo'

interface HeroProps {
  onEnterCommandCenter: () => void
}

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'

export function Hero({ onEnterCommandCenter }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 24 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.9,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center text-center px-4 pt-24 pb-8 select-none">
      {/* Background Video */}
      <FadingVideo
        src={HERO_VIDEO_URL}
        opacity={1}
        overlayOpacity={0.15}
      />

      {/* Light top & bottom fade for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050605] pointer-events-none z-10" />

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 my-auto max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#00D9A5]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#00D9A5] font-semibold drop-shadow-md">
            AI-POWERED BORDER INTELLIGENCE
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white max-w-4xl drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
        >
          See the movement <br className="hidden sm:inline" />
          before it becomes a threat.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-white font-normal max-w-2xl leading-relaxed tracking-wide font-sans drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]"
        >
          Transform existing border CCTV into an intelligent surveillance network with spatial awareness, persistent tracking and proactive risk intelligence.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onEnterCommandCenter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full liquid-glass-strong text-white font-semibold tracking-wider uppercase text-xs sm:text-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_0_35px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] cursor-pointer"
          >
            <span>ENTER COMMAND CENTER</span>
            <ArrowDownRight className="w-4 h-4 text-[#00D9A5] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Hero Bottom Information Strip (Section 4) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-20 w-full max-w-5xl mx-auto"
      >
        <div className="liquid-glass-strong py-3.5 px-6 rounded-2xl md:rounded-full border border-white/20 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-white shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#00D9A5]" />
            <span className="font-bold text-white uppercase">MULTI-CAMERA</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Surveillance</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-white/20" />

          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-[#00D9A5]" />
            <span className="font-bold text-white uppercase">SPATIAL</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Intelligence</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-white/20" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9A5] shadow-[0_0_10px_#00D9A5]" />
            <span className="font-bold text-white uppercase">PERSISTENT</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Tracking</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-white/20" />

          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#00D9A5]" />
            <span className="font-bold text-white uppercase">PROACTIVE</span>
            <span className="text-white/70 uppercase tracking-wider text-[10px]">Risk Analysis</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
