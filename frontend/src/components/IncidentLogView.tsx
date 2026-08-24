import { useState } from 'react'
import {
  ArrowLeft,
  Database,
  Eye,
  FileWarning,
  Image as ImageIcon,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react'
import type { HistoryRun, HistoryRunDetail } from '../types'

interface IncidentLogViewProps {
  runs: HistoryRun[]
  detail: HistoryRunDetail | null
  search: string
  loading: boolean
  detailLoading: boolean
  rerunning: boolean
  activeViews: Record<number, 'input' | 'output'>
  onBackToCommandCenter: () => void
  onSearch: (value: string) => void
  onRefresh: () => void
  onSelect: (runId: string) => void
  onRerun: () => void
  onViewChange: (imageId: number, view: 'input' | 'output') => void
}

export function IncidentLogView({
  runs,
  detail,
  search,
  loading,
  detailLoading,
  rerunning,
  activeViews,
  onBackToCommandCenter,
  onSearch,
  onRefresh,
  onSelect,
  onRerun,
  onViewChange,
}: IncidentLogViewProps) {
  const [selectedModalOpen, setSelectedModalOpen] = useState(false)

  const handleSelectRun = (runId: string) => {
    onSelect(runId)
    setSelectedModalOpen(true)
  }

  return (
    <div className="space-y-8 animate-fadeIn select-none">
      {/* Top Header Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.12)] pb-6">
        <button
          type="button"
          onClick={onBackToCommandCenter}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-[rgba(255,255,255,0.15)] text-xs font-mono font-bold text-white transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00D9A5]" />
          <span>← COMMAND CENTER</span>
        </button>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono font-bold text-amber-300 shadow-md">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>BORDER SURVEILLANCE INCIDENT AUDIT (DEMO DATA)</span>
        </div>
      </div>

      {/* Incident Log Header */}
      <div className="liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/15 bg-black/40">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileWarning className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">EVIDENCE-BASED BORDER INCIDENTS</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-sans font-black text-amber-300 uppercase tracking-wide drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            Major Incident Log
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-sans font-normal">
            Review high-priority border events, alerts, persistent target tracks and recorded CCTV evidence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              placeholder="Search Incident ID / Sector..."
              onChange={(e) => onSearch(e.target.value)}
              className="bg-black/60 border border-white/20 rounded-full pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-white/50 focus:outline-none focus:border-[#00D9A5] w-48 sm:w-64"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all border border-white/20 cursor-pointer"
            title="Refresh Incidents"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Incident Table & Timeline View */}
      <div className="liquid-glass-strong rounded-3xl border border-white/20 overflow-hidden bg-black/60 shadow-2xl">
        {loading && runs.length === 0 ? (
          <div className="p-12 text-center text-white/70 font-mono text-xs flex items-center justify-center gap-3 font-semibold">
            <LoaderCircle className="w-5 h-5 animate-spin text-[#00D9A5]" />
            <span>LOADING SURVEILLANCE RECORDS...</span>
          </div>
        ) : runs.length === 0 ? (
          <div className="p-12 text-center text-white/50 font-mono text-xs space-y-2">
            <Database className="w-8 h-8 mx-auto opacity-50" />
            <p>NO INCIDENTS MATCHING SEARCH CRITERIA</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/[0.06] text-white/70 border-b border-white/15 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-4 px-6">INCIDENT ID</th>
                  <th className="py-4 px-6">TIMESTAMP</th>
                  <th className="py-4 px-6">CAMERA / SECTOR</th>
                  <th className="py-4 px-6 text-center">TRACK ID</th>
                  <th className="py-4 px-6 text-right">EVENT TYPE</th>
                  <th className="py-4 px-6 text-center">RISK LEVEL</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {runs.map((run) => {
                  const incidentId = run.run_id
                  const isCritical = run.total_detections >= 5
                  const isHigh = run.total_detections >= 3
                  const riskLabel = isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : run.total_detections > 0 ? 'MODERATE' : 'LOW'
                  const riskColor = isCritical
                    ? 'bg-red-950/90 border-red-500/60 text-red-300 font-bold'
                    : isHigh
                    ? 'bg-orange-950/90 border-orange-500/60 text-orange-300 font-bold'
                    : run.total_detections > 0
                    ? 'bg-amber-950/90 border-amber-500/60 text-amber-300 font-bold'
                    : 'bg-emerald-950/90 border-emerald-500/60 text-[#00D9A5] font-bold'

                  const eventType =
                    incidentId === 'BRS-2026-0047'
                      ? 'RESTRICTED ZONE INTRUSION'
                      : incidentId === 'BRS-2026-0042'
                      ? 'BOUNDARY CROSSING'
                      : incidentId === 'BRS-2026-0038'
                      ? 'LOITERING NEAR FENCE'
                      : incidentId === 'BRS-2026-0031'
                      ? 'ABNORMAL APPROACH'
                      : 'WRONG-DIRECTION MOVEMENT'

                  const trackId =
                    incidentId === 'BRS-2026-0047'
                      ? 'TRK-0182'
                      : incidentId === 'BRS-2026-0042'
                      ? 'TRK-0145'
                      : incidentId === 'BRS-2026-0038'
                      ? 'TRK-0098'
                      : incidentId === 'BRS-2026-0031'
                      ? 'TRK-0072'
                      : 'TRK-0051'

                  return (
                    <tr
                      key={run.run_id}
                      onClick={() => handleSelectRun(run.run_id)}
                      className="hover:bg-white/[0.08] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 font-extrabold text-amber-300 group-hover:text-white transition-colors">
                        {incidentId}
                      </td>
                      <td className="py-4 px-6 text-white/80 font-medium">
                        {new Date(run.created_at).toLocaleTimeString()}
                      </td>
                      <td className="py-4 px-6 text-white max-w-xs truncate font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-black/60 overflow-hidden shrink-0 border border-white/20">
                            {run.preview_output_url || run.preview_input_url ? (
                              <img src={run.preview_output_url || run.preview_input_url || ''} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 m-2 text-white/40" />
                            )}
                          </div>
                          <span className="truncate">{run.preview_filename || `Sector ${run.run_id.slice(0, 8)}`}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-[#00D9A5]">
                        {trackId}
                      </td>
                      <td className="py-4 px-6 text-right text-white font-bold">
                        {eventType}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] border ${riskColor}`}>
                          {riskLabel}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectRun(run.run_id)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all inline-flex items-center gap-1.5 text-[11px] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Incident Detail Glass Drawer Modal */}
      {selectedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="liquid-glass-strong w-full max-w-4xl rounded-3xl border border-white/20 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn relative bg-black/90 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#00D9A5] font-bold">BORDER SURVEILLANCE INCIDENT DOSSIER</span>
                <h3 className="text-2xl sm:text-4xl font-sans font-black text-amber-300 uppercase tracking-wide">
                  {detail ? detail.run_id : 'Loading Incident...'}
                </h3>
                {detail && (
                  <p className="text-xs font-mono text-white/70 font-medium">
                    Recorded: {new Date(detail.created_at).toLocaleString()} · Latency: {detail.duration_ms} ms (DEMO RECORD)
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {detail && (
                  <button
                    type="button"
                    onClick={onRerun}
                    disabled={rerunning}
                    className="px-4 py-2 rounded-full bg-[#00D9A5] hover:bg-emerald-400 disabled:opacity-40 text-black text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                  >
                    {rerunning ? <LoaderCircle className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                    Rerun Spatial Analysis
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedModalOpen(false)}
                  className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {detailLoading ? (
              <div className="py-16 text-center text-white/70 font-mono text-xs font-semibold flex items-center justify-center gap-2">
                <LoaderCircle className="w-5 h-5 animate-spin text-[#00D9A5]" />
                <span>RETRIEVING SURVEILLANCE EVIDENCE...</span>
              </div>
            ) : detail ? (
              <div className="space-y-6">
                {/* Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="liquid-glass p-3 rounded-xl border border-white/15 bg-black/40">
                    <span className="text-white/50 block text-[10px] font-semibold">DETECTION THRESHOLD</span>
                    <span className="text-white font-bold">{Math.round(detail.confidence_threshold * 100)}%</span>
                  </div>
                  <div className="liquid-glass p-3 rounded-xl border border-white/15 bg-black/40">
                    <span className="text-white/50 block text-[10px] font-semibold">GEOFENCE SCALE</span>
                    <span className="text-white font-bold">0.050 m/px</span>
                  </div>
                  <div className="liquid-glass p-3 rounded-xl border border-white/15 bg-black/40">
                    <span className="text-white/50 block text-[10px] font-semibold">STATUS</span>
                    <span className="text-[#00D9A5] font-bold">
                      {detail.status}
                    </span>
                  </div>
                  <div className="liquid-glass p-3 rounded-xl border border-white/15 bg-black/40">
                    <span className="text-white/50 block text-[10px] font-semibold">MODEL PIPELINE</span>
                    <span className="text-white font-bold">Sentinel-v4.2</span>
                  </div>
                </div>

                {/* Evidence Frames */}
                <div className="space-y-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 font-bold">Audit Frame Evidence ({detail.images.length})</h4>
                  {detail.images.map((img, idx) => (
                    <div key={img.image_id} className="liquid-glass p-6 rounded-2xl border border-white/15 bg-black/40 space-y-4">
                      <div className="flex justify-between items-center text-xs font-mono border-b border-white/10 pb-3">
                        <span className="text-white font-bold">CCTV Frame #{idx + 1}: {img.filename}</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => onViewChange(img.image_id, 'input')}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                              (activeViews[img.image_id] || 'output') === 'input'
                                ? 'bg-white/20 text-white font-bold'
                                : 'text-white/50'
                            }`}
                          >
                            Raw CCTV Feed
                          </button>
                          <button
                            type="button"
                            onClick={() => onViewChange(img.image_id, 'output')}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                              (activeViews[img.image_id] || 'output') === 'output'
                                ? 'bg-emerald-500/30 text-[#00D9A5] font-bold'
                                : 'text-white/50'
                            }`}
                          >
                            Spatial Annotations
                          </button>
                        </div>
                      </div>

                      <div className="bg-black/70 rounded-xl overflow-hidden aspect-video border border-white/15 flex items-center justify-center">
                        {((activeViews[img.image_id] || 'output') === 'input' ? img.input_url : img.output_url) ? (
                          <img
                            src={((activeViews[img.image_id] || 'output') === 'input' ? img.input_url : img.output_url) || ''}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-white/50 text-xs font-mono">FRAME NOT STORED</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
