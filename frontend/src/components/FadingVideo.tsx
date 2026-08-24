import { useEffect, useRef, useState } from 'react'

interface FadingVideoProps {
  src: string
  className?: string
  opacity?: number
  overlayOpacity?: number
}

export function FadingVideo({
  src,
  className = '',
  opacity = 1,
  overlayOpacity = 0.15,
}: FadingVideoProps) {
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
  }, [src])

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: loaded ? opacity : 0,
        }}
      />
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, rgba(8,9,8,${overlayOpacity * 1.5}) 0%, rgba(8,9,8,0) 25%, rgba(8,9,8,0) 75%, rgba(8,9,8,${overlayOpacity * 2}) 100%)`,
          }}
        />
      )}
    </div>
  )
}
