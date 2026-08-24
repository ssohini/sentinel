import { useRef, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Cpu,
  Download,
  FileImage,
  Gauge,
  Image as ImageIcon,
  LoaderCircle,
  Play,
  Radar,
  Ruler,
  ScanLine,
  ShieldAlert,
  Trash2,
  Upload,
} from 'lucide-react'
import type { HealthResponse, ImageResult, PredictionRun, QueuedImage } from '../types'
import { AccordionGallery } from './AccordionGallery'

interface LiveFeedViewProps {
  queue: QueuedImage[]
  confidence: number
  pixelAreaCm2: number
  health: HealthResponse | null
  healthError: boolean
  isDragging: boolean
  isRunning: boolean
  result: PredictionRun | null
  activeViews: Record<number, 'input' | 'output'>
  categoryCounts: [string, number][]
  averageConfidence: number | null
  onBackToCommandCenter: () => void
  onAddFiles: (files: FileList | File[]) => void
  onRemoveFile: (id: string) => void
  onClear: () => void
  onAnalyze: () => void
  onConfidenceChange: (value: number) => void
  onPixelAreaChange: (value: number) => void
  onDraggingChange: (value: boolean) => void
  onViewChange: (imageId: number, view: 'input' | 'output') => void
}

export function LiveFeedView({
  queue,
  confidence,
  pixelAreaCm2,
  health,
  isDragging,
  isRunning,
  result,
  activeViews,
  categoryCounts,
  averageConfidence,
  onBackToCommandCenter,
  onAddFiles,
  onRemoveFile,
  onClear,
  onAnalyze,
  onConfidenceChange,
  onPixelAreaChange,
  onDraggingChange,
  onViewChange,
}: LiveFeedViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedCamId, setSelectedCamId] = useState<string>('cam-01')

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Top Header Navigation & Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.10)] pb-6">
        <button
          type="button"
          onClick={onBackToCommandCenter}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-[rgba(255,255,255,0.10)] text-xs font-mono text-white transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00D9A5]" />
          <span>← COMMAND CENTER</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-[#00D9A5]/40 text-xs font-mono text-[#00D9A5]">
          <span className="w-2 h-2 rounded-full bg-[#00D9A5] animate-ping" />
          <span>● CCTV DEMO</span>
        </div>
      </div>

      {/* Page Heading */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#00D9A5] uppercase font-semibold">
          LIVE BORDER SURVEILLANCE
        </span>
        <h2 className="font-serif italic text-4xl sm:text-6xl text-white font-normal">
          SEE WHAT THE SYSTEM SEES.
        </h2>
        <p className="text-sm sm:text-base text-white/70 font-light max-w-xl">
          Simulated CCTV intelligence for tracking movement, monitoring restricted zones and identifying high-risk activity.
        </p>
      </div>

      {/* Accordion Gallery Component */}
      <AccordionGallery
        predictionResult={result}
        activeCameraId={selectedCamId}
        onSelectCamera={setSelectedCamId}
      />

      {/* Live Surveillance Demo Scanner Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Upload Dropzone & Frame Queue (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div
            className={`relative rounded-3xl p-8 sm:p-10 text-center transition-all duration-300 border ${
              isDragging
                ? 'bg-emerald-950/40 border-[#00D9A5] shadow-[0_0_30px_rgba(0,217,165,0.3)]'
                : 'liquid-glass border-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.20)]'
            }`}
            onDragEnter={(e) => {
              e.preventDefault()
              onDraggingChange(true)
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => {
              e.preventDefault()
              if (e.currentTarget === e.target) onDraggingChange(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              onDraggingChange(false)
              onAddFiles(e.dataTransfer.files)
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) onAddFiles(e.target.files)
                e.target.value = ''
              }}
            />

            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-[rgba(255,255,255,0.10)] flex items-center justify-center text-[#00D9A5] mx-auto mb-4">
              <Upload className="w-7 h-7" />
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="text-lg sm:text-xl text-white font-medium">
                Upload Custom Border CCTV Footage / Surveillance Demo Frames
              </h4>
              <p className="text-xs text-white/60 font-light max-w-md mx-auto">
                Test spatial analytics on local CCTV frames (JPG, PNG, WEBP, BMP up to 20 MB per frame)
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-[rgba(255,255,255,0.20)] text-white text-xs font-mono tracking-wider uppercase inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileImage className="w-4 h-4 text-[#00D9A5]" />
              Select Demo Frame Files
            </button>

            <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.10)] flex items-center justify-center gap-2 text-xs text-white/50 font-mono">
              <BadgeCheck className="w-4 h-4 text-[#00D9A5]" />
              <span>Persistent tracking & spatial boundary validation active</span>
            </div>
          </div>

          {/* Queue Header & Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/80">
                Queued Demo CCTV Frames ({queue.length} of 12)
              </h4>
              {queue.length > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-mono cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Queue
                </button>
              )}
            </div>

            {queue.length === 0 ? (
              <div className="liquid-glass p-8 rounded-2xl text-center text-white/40 space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto opacity-50" />
                <p className="text-xs font-mono">NO DEMO FRAMES QUEUED FOR ANALYSIS</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {queue.map((item) => (
                  <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.10)] bg-black/40 aspect-square">
                    <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2 flex flex-col justify-between">
                      <button
                        type="button"
                        onClick={() => onRemoveFile(item.id)}
                        className="self-end p-1 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-red-500/80 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-mono text-white/80 truncate px-1">{item.file.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Tracking Parameters & Spatial AI Trigger (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="liquid-glass-strong p-6 rounded-3xl space-y-6 border border-[rgba(255,255,255,0.12)]">
            <div className="flex items-center gap-2 text-white border-b border-[rgba(255,255,255,0.10)] pb-4">
              <Gauge className="w-5 h-5 text-[#00D9A5]" />
              <h4 className="font-serif italic text-xl">TRACKING PARAMETERS</h4>
            </div>

            {/* Confidence Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/70 uppercase">Detection Sensitivity</span>
                <span className="text-[#00D9A5] font-bold text-sm">{Math.round(confidence * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.90"
                step="0.05"
                value={confidence}
                onChange={(e) => onConfidenceChange(Number(e.target.value))}
                className="w-full accent-[#00D9A5] bg-white/10 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>Higher Recall</span>
                <span>Higher Precision</span>
              </div>
            </div>

            {/* Spatial Scale Calibration */}
            <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.10)]">
              <label htmlFor="pixel-area" className="flex items-center gap-2 text-xs font-mono text-white/70 uppercase">
                <Ruler className="w-4 h-4 text-[#00D9A5]" />
                Perimeter Geofence Scale
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="pixel-area"
                  type="number"
                  min="0.000001"
                  max="100"
                  step="0.001"
                  value={pixelAreaCm2}
                  onChange={(e) => onPixelAreaChange(Number(e.target.value))}
                  className="w-full bg-white/[0.05] border border-[rgba(255,255,255,0.15)] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#00D9A5]"
                />
                <span className="text-xs font-mono text-white/50 whitespace-nowrap">m/px</span>
              </div>
            </div>

            {/* Model Specs */}
            <div className="space-y-2 pt-4 border-t border-[rgba(255,255,255,0.10)] text-xs font-mono text-white/60">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#00D9A5]" /> Model Engine</span>
                <span className="text-white font-semibold">{health?.model_name || 'Sentinel-Spatial-v4.2'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="flex items-center gap-1.5"><ScanLine className="w-3.5 h-3.5 text-[#00D9A5]" /> Target Classes</span>
                <span className="text-white font-semibold">Person / Vehicle / Cargo</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="flex items-center gap-1.5"><Radar className="w-3.5 h-3.5 text-[#00D9A5]" /> Spatial Matrix</span>
                <span className="text-white font-semibold">1080p 60FPS Tensor</span>
              </div>
            </div>

            {/* Execute Analysis Trigger Button */}
            <button
              type="button"
              disabled={!queue.length || isRunning}
              onClick={onAnalyze}
              className="w-full py-4 rounded-2xl bg-[#00D9A5] hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-[#00D9A5] text-black font-semibold uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,217,165,0.3)] cursor-pointer"
            >
              {isRunning ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-black" />}
              {isRunning ? 'RUNNING SPATIAL ANALYSIS...' : 'EXECUTE SPATIAL ANALYSIS'}
            </button>
          </div>
        </div>
      </div>

      {/* Detection Results Section */}
      {result && (
        <div id="results" className="space-y-6 pt-8 border-t border-[rgba(255,255,255,0.10)] animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9A5]">SPATIAL ANALYSIS COMPLETE</span>
              <h3 className="font-serif italic text-3xl text-white">Surveillance Intelligence Findings</h3>
              <p className="text-xs font-mono text-white/50">DEMO INCIDENT ID: {result.run_id} · Latency: {result.duration_ms} ms</p>
            </div>
            <div className="px-4 py-2 rounded-full bg-emerald-950/60 border border-[#00D9A5]/40 text-[#00D9A5] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00D9A5]" /> DEMO PROCESSED
            </div>
          </div>

          {/* Metric Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="liquid-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.10)]">
              <span className="text-[10px] font-mono text-white/50 uppercase">TRACKED SUBJECTS</span>
              <p className="text-2xl font-serif italic text-white mt-1">{result.total_detections}</p>
            </div>
            <div className="liquid-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.10)]">
              <span className="text-[10px] font-mono text-white/50 uppercase">SPATIAL RISK ASSESSMENT</span>
              <p className="text-xl font-mono text-[#00D9A5] mt-1 font-bold">
                HIGH-PRIORITY
              </p>
            </div>
            <div className="liquid-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.10)]">
              <span className="text-[10px] font-mono text-white/50 uppercase">MEAN CONFIDENCE</span>
              <p className="text-2xl font-serif italic text-white mt-1">
                {averageConfidence ? `${Math.round(averageConfidence * 100)}%` : '—'}
              </p>
            </div>
            <div className="liquid-glass p-4 rounded-2xl border border-[rgba(255,255,255,0.10)]">
              <span className="text-[10px] font-mono text-white/50 uppercase">FRAMES ANALYZED</span>
              <p className="text-2xl font-serif italic text-white mt-1">{result.images.length}</p>
            </div>
          </div>

          {/* Target Distribution Bars */}
          {categoryCounts.length > 0 && (
            <div className="liquid-glass p-6 rounded-3xl space-y-3 border border-[rgba(255,255,255,0.10)]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/80">Tracked Target Breakdown</h4>
              <div className="space-y-2">
                {categoryCounts.map(([label, count]) => (
                  <div key={label} className="flex items-center gap-3 text-xs font-mono">
                    <span className="w-44 text-white/70 capitalize truncate">{label}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#00D9A5] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(8, (count / categoryCounts[0][1]) * 100)}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-bold text-[#00D9A5]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Cards */}
          <div className="space-y-6">
            {result.images.map((img, idx) => (
              <ResultCard
                key={img.image_id}
                image={img}
                index={idx}
                activeView={activeViews[img.image_id] ?? 'output'}
                onViewChange={(view) => onViewChange(img.image_id, view)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ResultCard({
  image,
  index,
  activeView,
  onViewChange,
}: {
  image: ImageResult
  index: number
  activeView: 'input' | 'output'
  onViewChange: (view: 'input' | 'output') => void
}) {
  const activeUrl = activeView === 'input' ? image.input_url : image.output_url

  return (
    <div className="liquid-glass-card p-6 rounded-3xl border border-[rgba(255,255,255,0.10)] space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.10)] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#00D9A5]">DEMO CCTV FRAME #{index + 1}</span>
          <h4 className="text-lg text-white font-medium">{image.filename}</h4>
          <p className="text-xs font-mono text-white/50">{image.width} × {image.height} px · 60 FPS Stream</p>
        </div>

        <div className="flex items-center gap-2">
          {image.quality && (
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-[rgba(255,255,255,0.10)] text-xs font-mono text-[#00D9A5]">
              Stream Clarity {Math.round(image.quality.score)}%
            </span>
          )}

          <div className="bg-black/50 p-1 rounded-xl border border-[rgba(255,255,255,0.10)] flex gap-1">
            <button
              type="button"
              disabled={!image.input_url}
              onClick={() => onViewChange('input')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'input' ? 'bg-white/20 text-white font-semibold' : 'text-white/50 hover:text-white'
              }`}
            >
              Raw Feed
            </button>
            <button
              type="button"
              disabled={!image.output_url}
              onClick={() => onViewChange('output')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeView === 'output' ? 'bg-emerald-500/30 text-[#00D9A5] font-semibold' : 'text-white/50 hover:text-white'
              }`}
            >
              Spatial Overlays
            </button>
          </div>

          {image.output_url && (
            <a
              href={image.output_url}
              download
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Download Annotated Frame"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Frame Viewer & Bounding Boxes List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-black/60 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.10)] aspect-video flex items-center justify-center relative">
          {activeUrl ? (
            <img src={activeUrl} alt="" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-white/40 space-y-1">
              <ImageIcon className="w-8 h-8 mx-auto" />
              <p className="text-xs font-mono">FRAME UNAVAILABLE</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div>
              <span className="text-white/40 block">TARGETS TRACKED</span>
              <span className="text-white font-bold text-sm">{image.detection_count} Objects</span>
            </div>
            <div>
              <span className="text-white/40 block">GEOFENCE THREAT</span>
              <span className="text-[#00D9A5] font-bold text-sm flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> HIGH ALERT
              </span>
            </div>
          </div>

          <h5 className="text-xs font-mono uppercase text-white/60 pt-2">Spatial Vector Detections</h5>
          {image.detections.length === 0 ? (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-white/40 text-center">
              No targets detected above confidence threshold
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {image.detections.map((det, detIdx) => (
                <div key={detIdx} className="p-2.5 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.10)] flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white capitalize">{det.label}</span>
                    <span className="block text-[10px] text-white/40">{det.weight_method || 'Spatial Vector'}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-[#00D9A5]">{Math.round(det.confidence * 100)}%</span>
                    <span className="text-[10px] text-white/60">
                      {det.category || 'Restricted Sector'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
