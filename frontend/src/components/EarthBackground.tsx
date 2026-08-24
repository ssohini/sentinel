import { useEffect, useRef, useState } from 'react'

const EARTH_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4'

export function EarthBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setLoaded(true)
      video.play().catch(() => {})
    }

    if (video.readyState >= 3) {
      setLoaded(true)
      video.play().catch(() => {})
    } else {
      video.addEventListener('canplay', handleCanPlay)
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      <video
        ref={videoRef}
        src={EARTH_VIDEO_URL}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Light Gradient Overlay so Earth remains completely visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
    </div>
  )
}
