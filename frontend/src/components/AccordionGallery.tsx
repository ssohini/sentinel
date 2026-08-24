import { useState } from 'react'
import { Activity, CheckCircle2, Eye } from 'lucide-react'
import type { PredictionRun } from '../types'

export interface AccordionCameraItem {
  id: string
  name: string
  zone: string
  imageUrl: string
  status: string
  tracksCount: number
  alertsCount: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
  movementStatus: string
  lastEvent: string
}

interface AccordionGalleryProps {
  predictionResult: PredictionRun | null
  activeCameraId: string
  onSelectCamera: (id: string) => void
}

const DEMO_BORDER_CAMERAS: AccordionCameraItem[] = [
  {
    id: 'cam-01',
    name: 'CAMERA 01',
    zone: 'NORTH SECTOR — Primary Perimeter Gate',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    status: 'SURVEILLANCE ACTIVE',
    tracksCount: 3,
    alertsCount: 0,
    riskLevel: 'MODERATE',
    movementStatus: 'STATIONARY / BOUNDARY PROXIMITY',
    lastEvent: '23:41:18',
  },
  {
    id: 'cam-02',
    name: 'CAMERA 02',
    zone: 'EAST CHECKPOINT — Vehicle Transit Corridor',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    status: 'SURVEILLANCE ACTIVE',
    tracksCount: 5,
    alertsCount: 1,
    riskLevel: 'MODERATE',
    movementStatus: 'APPROACHING CHECKPOINT',
    lastEvent: '23:38:05',
  },
  {
    id: 'cam-03',
    name: 'CAMERA 03',
    zone: 'PERIMETER ZONE — Fence Line Sector 4',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    status: 'HIGH ALERT',
    tracksCount: 8,
    alertsCount: 3,
    riskLevel: 'CRITICAL',
    movementStatus: 'LOITERING NEAR FENCE',
    lastEvent: '23:40:50',
  },
  {
    id: 'cam-04',
    name: 'CAMERA 04',
    zone: 'RESTRICTED SECTOR — High-Security Zone',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    status: 'INTRUSION DETECTED',
    tracksCount: 4,
    alertsCount: 2,
    riskLevel: 'HIGH',
    movementStatus: 'RESTRICTED ZONE INTRUSION',
    lastEvent: '23:41:18',
  },
  {
    id: 'cam-05',
    name: 'CAMERA 05',
    zone: 'BORDER CROSSING — Transit Gate 12',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    status: 'SURVEILLANCE ACTIVE',
    tracksCount: 2,
    alertsCount: 0,
    riskLevel: 'LOW',
    movementStatus: 'NORMAL TRANSIT VECTOR',
    lastEvent: '23:35:10',
  },
  {
    id: 'cam-06',
    name: 'CAMERA 06',
    zone: 'WATCHTOWER — Elevation Observation Post',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    status: 'SURVEILLANCE ACTIVE',
    tracksCount: 1,
    alertsCount: 0,
    riskLevel: 'LOW',
    movementStatus: 'WIDE-AREA SCANNING',
    lastEvent: '23:30:00',
  },
]

export function AccordionGallery({
  predictionResult,
  activeCameraId,
  onSelectCamera,
}: AccordionGalleryProps) {
  const cameraItems: AccordionCameraItem[] = predictionResult?.images?.length
    ? predictionResult.images.map((img, idx) => ({
        id: `img-${img.image_id}`,
        name: `DEMO CAM 0${idx + 1}`,
        zone: `SECTOR ANALYZED — ${img.filename}`,
        imageUrl: img.output_url || img.input_url || DEMO_BORDER_CAMERAS[idx % DEMO_BORDER_CAMERAS.length].imageUrl,
        status: 'ANALYZING',
        tracksCount: img.detection_count,
        alertsCount: img.detection_count > 2 ? 1 : 0,
        riskLevel: img.detection_count > 5 ? 'CRITICAL' : img.detection_count > 2 ? 'HIGH' : img.detection_count > 0 ? 'MODERATE' : 'LOW',
        movementStatus: 'SPATIAL VECTOR DETECTED',
        lastEvent: `${img.width}x${img.height} px`,
      }))
    : DEMO_BORDER_CAMERAS

  const [expandedId, setExpandedId] = useState<string>(activeCameraId || cameraItems[0].id)

  const handleSelect = (id: string) => {
    setExpandedId(id)
    onSelectCamera(id)
  }

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between text-xs font-mono text-white/60 px-1 font-semibold">
        <span className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00D9A5]" />
          <span>CONNECTED DEMO BORDER CCTV CHANNELS ({cameraItems.length})</span>
        </span>
        <span className="hidden sm:inline">HOVER / CLICK TO EXPAND CCTV CHANNEL</span>
      </div>

      {/* Horizontal Desktop Accordion (GPU Accelerated 150-250ms CSS flex-grow transition) */}
      <div className="flex flex-col md:flex-row gap-3 w-full h-[480px] sm:h-[520px] rounded-3xl overflow-hidden bg-[#050706] p-3 border border-[rgba(255,255,255,0.12)]">
        {cameraItems.map((item) => {
          const isExpanded = item.id === expandedId
          const riskBadge =
            item.riskLevel === 'CRITICAL'
              ? 'bg-red-950/90 border-red-500/60 text-red-300 font-bold'
              : item.riskLevel === 'HIGH'
              ? 'bg-orange-950/90 border-orange-500/60 text-orange-300 font-bold'
              : item.riskLevel === 'MODERATE'
              ? 'bg-amber-950/90 border-amber-500/60 text-amber-300 font-bold'
              : 'bg-emerald-950/90 border-emerald-500/60 text-[#00D9A5] font-bold'

          return (
            <div
              key={item.id}
              onMouseEnter={() => handleSelect(item.id)}
              onClick={() => handleSelect(item.id)}
              style={{
                flexGrow: isExpanded ? 4 : 1,
                transition: 'flex-grow 250ms cubic-bezier(0.16, 1, 0.3, 1), border-color 250ms, opacity 250ms',
                willChange: 'flex-grow',
              }}
              className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer border ${
                isExpanded
                  ? 'border-[#00D9A5] shadow-[0_0_30px_rgba(0,217,165,0.3)] opacity-100'
                  : 'border-[rgba(255,255,255,0.10)] opacity-60 hover:opacity-90'
              }`}
            >
              {/* Background Image Panel */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                  isExpanded ? 'scale-105 filter grayscale-0' : 'scale-100 filter grayscale-[80%] brightness-50'
                }`}
              />

              {/* Gradient Dark Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isExpanded
                    ? 'bg-gradient-to-t from-[#050706] via-[#050706]/40 to-transparent opacity-90'
                    : 'bg-[#050706]/60'
                }`}
              />

              {/* Panel Caption Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                {/* Top Status Strip */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[rgba(255,255,255,0.20)] text-[10px] font-mono font-bold text-white tracking-widest flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#00D9A5]" />
                    {item.name}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono border ${riskBadge}`}>
                    {item.riskLevel}
                  </span>
                </div>

                {/* Bottom Details (Expands when panel active) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D9A5] animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9A5] font-bold">
                      ● CCTV DEMO
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-sans font-bold text-white uppercase tracking-wide leading-tight">
                    {item.zone}
                  </h4>

                  {isExpanded && (
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.18)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-white/90 animate-fadeIn font-medium">
                      <div>
                        <span className="text-[10px] text-white/60 block font-semibold">TRACKS</span>
                        <span className="font-bold text-[#00D9A5] text-sm">{item.tracksCount} Subjects</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/60 block font-semibold">ALERTS</span>
                        <span className={`font-bold text-sm ${item.alertsCount > 0 ? 'text-amber-400' : 'text-white'}`}>
                          {item.alertsCount} Active
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/60 block font-semibold">LAST EVENT</span>
                        <span className="text-white text-xs">{item.lastEvent}</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-[10px] text-white/60 block font-semibold">SPATIAL STATUS</span>
                        <span className="text-white text-[11px] flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-[#00D9A5]" /> Sentinel Active
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
