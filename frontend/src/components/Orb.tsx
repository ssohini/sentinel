import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function Orb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      setMousePos({
        x: Math.max(-1, Math.min(1, deltaX)),
        y: Math.max(-1, Math.min(1, deltaY)),
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto my-4 py-4 select-none"
    >
      {/* Eyebrow Above Orb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-1 mb-6 text-center z-20"
      >
        <span className="text-[11px] font-mono tracking-[0.35em] text-[#00D9A5] font-semibold uppercase drop-shadow-[0_0_8px_rgba(0,217,165,0.4)]">
          SENTINEL
        </span>
        <span className="text-[9px] font-mono tracking-[0.25em] text-white/50 uppercase">
          SPATIAL VIDEO INTELLIGENCE
        </span>
      </motion.div>

      {/* Central 3D Orb Composition Container */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center">
        {/* Outer Atmospheric Aura Glow */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 15}% ${
              50 + mousePos.y * 15
            }%, rgba(0, 217, 165, 0.25) 0%, rgba(168, 85, 247, 0.2) 40%, rgba(59, 130, 246, 0.15) 70%, transparent 100%)`,
          }}
        />

        {/* Outer Edge Rim Light Rings */}
        <motion.div
          style={{
            x: mousePos.x * 12,
            y: mousePos.y * 12,
            background: 'conic-gradient(from 0deg, #00D9A5, #3b82f6, #a855f7, #f59e0b, #00D9A5)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 68%, black 70%)',
            maskImage: 'radial-gradient(circle, transparent 68%, black 70%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-full h-full rounded-full p-[1px] opacity-70"
        />

        {/* Core Glossy Metallic Glass Orb Body */}
        <motion.div
          style={{
            x: mousePos.x * 18,
            y: mousePos.y * 18,
          }}
          animate={{
            scale: [0.98, 1.02, 0.98],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-[92%] h-[92%] rounded-full overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-15px_30px_rgba(0,0,0,0.8)] border border-white/20 backdrop-blur-3xl flex items-center justify-center"
        >
          {/* Internal Dark Glass Radial Shader */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle at ${35 + mousePos.x * 20}% ${
                30 + mousePos.y * 20
              }%, rgba(30, 41, 36, 0.95) 0%, rgba(10, 15, 12, 0.98) 55%, rgba(5, 7, 6, 1) 100%)`,
            }}
          />

          {/* Floating Internal Fluid Light Swirls */}
          <div
            className="absolute -inset-10 opacity-60 mix-blend-screen animate-orb-breathe"
            style={{
              background: `radial-gradient(circle at ${60 - mousePos.x * 20}% ${
                70 - mousePos.y * 20
              }%, rgba(0, 217, 165, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at ${20 + mousePos.x * 20}% ${
                20 + mousePos.y * 20
              }%, rgba(168, 85, 247, 0.35) 0%, transparent 45%),
                           radial-gradient(circle at ${80 + mousePos.x * 10}% ${
                30 + mousePos.y * 10
              }%, rgba(245, 158, 11, 0.25) 0%, transparent 40%)`,
            }}
          />

          {/* Glossy Curved Glass Reflection Crescent */}
          <div className="absolute -top-12 left-12 right-12 h-36 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[2px] opacity-70 pointer-events-none transform -rotate-12" />

          {/* Bottom Rim Light Reflection */}
          <div className="absolute -bottom-10 left-16 right-16 h-24 rounded-full bg-gradient-to-t from-[#00D9A5]/30 via-[#3b82f6]/20 to-transparent blur-md pointer-events-none" />

          {/* TEXT DIRECTLY OVER / WITHIN THE ORB */}
          <div className="relative z-10 p-6 sm:p-8 text-center space-y-3 max-w-[85%] mx-auto">
            <h2 className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_15px_rgba(0,0,0,0.95)]">
              From Vision <br />
              <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                to Situational Awareness
              </span>
            </h2>

            <p className="text-[11px] sm:text-xs text-white/75 font-sans font-light leading-relaxed max-w-xs mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Spatial intelligence for proactive border surveillance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
