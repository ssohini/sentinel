import { useEffect, useRef, useState } from 'react'
import './OptionWheel.css'

export interface OptionWheelProps {
  items: string[]
  defaultSelected?: number
  textColor?: string
  activeColor?: string
  side?: 'left' | 'right'
  fontSize?: number
  spacing?: number
  curve?: number
  tilt?: number
  blur?: number
  fade?: number
  smoothing?: number
  inset?: number
  loop?: boolean
  draggable?: boolean
  onChange?: (index: number, item: string) => void
}

export default function OptionWheel({
  items = ['LIVE FEED', 'MAJOR INCIDENT LOG', 'DAILY SURVEILLANCE REPORT'],
  defaultSelected = 0,
  textColor = '#8a9491',
  activeColor = '#ffffff',
  side = 'left',
  fontSize = 1.5,
  spacing = 1.6,
  curve = 1.2,
  tilt = 6,
  blur = 1.2,
  fade = 0.25,
  smoothing = 140,
  inset = 50,
  loop = false,
  draggable = true,
  onChange,
}: OptionWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaultSelected >= 0 && defaultSelected < items.length ? defaultSelected : 0,
  )

  const currentScroll = useRef<number>(selectedIndex)
  const targetScroll = useRef<number>(selectedIndex)
  const isDragging = useRef<boolean>(false)
  const startY = useRef<number>(0)
  const startScroll = useRef<number>(0)
  const lastTime = useRef<number>(performance.now())
  const lastWheelTime = useRef<number>(0)
  const prevIndex = useRef<number>(selectedIndex)

  useEffect(() => {
    let animId: number

    const renderLoop = (time: number) => {
      const delta = (time - lastTime.current) / 1000
      lastTime.current = time

      // Smooth exponential interpolation
      const factor = 1 - Math.exp(-delta * (smoothing / 10))
      currentScroll.current += (targetScroll.current - currentScroll.current) * factor

      const roundedIndex = Math.round(currentScroll.current)
      let clampedIndex = roundedIndex
      if (!loop) {
        clampedIndex = Math.max(0, Math.min(items.length - 1, roundedIndex))
      } else {
        clampedIndex = ((roundedIndex % items.length) + items.length) % items.length
      }

      if (clampedIndex !== prevIndex.current) {
        prevIndex.current = clampedIndex
        setSelectedIndex(clampedIndex)
        if (onChange) {
          onChange(clampedIndex, items[clampedIndex])
        }
      }

      // Update 3D transforms for all option items
      if (containerRef.current) {
        const itemNodes = containerRef.current.querySelectorAll<HTMLElement>('.option-wheel__item')
        itemNodes.forEach((node, idx) => {
          let offset = idx - currentScroll.current
          if (loop) {
            const total = items.length
            offset = ((offset % total) + total) % total
            if (offset > total / 2) offset -= total
          }

          const absOffset = Math.abs(offset)
          const isSelected = Math.round(currentScroll.current) === idx

          const yPos = offset * fontSize * 24 * spacing
          const xPos = Math.pow(absOffset, curve) * (side === 'left' ? inset * 0.4 : -inset * 0.4)
          const rotY = offset * tilt * (side === 'left' ? 1 : -1)
          const scale = Math.max(0.72, 1 - absOffset * 0.12)
          const opacityVal = Math.max(0.15, 1 - absOffset * fade)
          const blurVal = absOffset * blur

          node.style.transform = `translate3d(${xPos}px, ${yPos}px, 0px) rotateY(${rotY}deg) scale(${scale})`
          node.style.opacity = `${opacityVal}`
          node.style.filter = `blur(${blurVal}px)`
          node.style.fontSize = `${fontSize}rem`
          node.style.color = isSelected ? activeColor : textColor

          if (isSelected) {
            node.classList.add('option-wheel__item--selected')
          } else {
            node.classList.remove('option-wheel__item--selected')
          }
        })
      }

      animId = requestAnimationFrame(renderLoop)
    }

    animId = requestAnimationFrame(renderLoop)
    return () => cancelAnimationFrame(animId)
  }, [items, fontSize, spacing, curve, tilt, blur, fade, smoothing, inset, side, loop, textColor, activeColor, onChange])

  // Native non-passive Wheel listener to stop page scroll and move wheel smoothly
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onNativeWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const now = performance.now()
      if (now - lastWheelTime.current < 160) return

      const dir = e.deltaY > 0 ? 1 : -1
      let next = Math.round(targetScroll.current) + dir
      if (!loop) {
        next = Math.max(0, Math.min(items.length - 1, next))
      }
      targetScroll.current = next
      lastWheelTime.current = now
    }

    el.addEventListener('wheel', onNativeWheel, { passive: false })
    return () => el.removeEventListener('wheel', onNativeWheel)
  }, [items.length, loop])

  // Keyboard navigation listener (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        targetScroll.current = Math.min(items.length - 1, Math.round(targetScroll.current) + 1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        targetScroll.current = Math.max(0, Math.round(targetScroll.current) - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items.length])

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return
    isDragging.current = true
    startY.current = e.clientY
    startScroll.current = targetScroll.current
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    e.stopPropagation()

    const diffY = startY.current - e.clientY
    const deltaScroll = diffY / (fontSize * 24 * spacing)
    let next = startScroll.current + deltaScroll
    if (!loop) {
      next = Math.max(0, Math.min(items.length - 1, next))
    }
    targetScroll.current = next
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    targetScroll.current = Math.round(targetScroll.current)
    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Ignore if capture was lost
    }
  }

  // Item click handler
  const handleItemClick = (idx: number) => {
    targetScroll.current = idx
  }

  return (
    <div
      ref={containerRef}
      className="option-wheel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <ul className="option-wheel__list">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`option-wheel__item ${idx === selectedIndex ? 'option-wheel__item--selected' : ''}`}
            onClick={() => handleItemClick(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
