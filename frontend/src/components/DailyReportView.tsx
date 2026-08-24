import { Activity, AlertTriangle, ArrowLeft, Calendar, Cpu, Database, Radar, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { DashboardSummary, HealthResponse } from '../types'

interface DailyReportViewProps {
  health: HealthResponse | null
  dashboard: DashboardSummary | null
  loading: boolean
  hasError: boolean
  onBackToCommandCenter: () => void
  onRefresh: () => void
}

export function DailyReportView({
  dashboard,
  loading,
  hasError,
  onBackToCommandCenter,
  onRefresh,
}: DailyReportViewProps) {
  return (
    <div className="space-y-8 animate-fadeIn select-none">
      {/* Top Header Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.10)] pb-6">
        <button
          type="button"
          onClick={onBackToCommandCenter}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-[rgba(255,255,255,0.10)] text-xs font-mono text-white transition-all w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00D9A5]" />
          <span>← COMMAND CENTER</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-xs font-mono text-white/80">
          <Calendar className="w-3.5 h-3.5 text-[#00D9A5]" />
          <span>DAILY BORDER SURVEILLANCE REPORT (DEMO DATA)</span>
        </div>
      </div>

      {/* Report Header Banner */}
      <div className="liquid-glass p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00D9A5] uppercase tracking-widest">BORDER SURVEILLANCE INTELLIGENCE</span>
          </div>
          <h3 className="font-serif italic text-3xl sm:text-4xl text-white font-normal">
            Daily Surveillance Report
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Review detected activity, movement patterns, alerts, camera sector activity, and daily border events.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border border-white/15 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Report
        </button>
      </div>

      {hasError && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Surveillance dashboard summary temporarily offline. Sentinel tracking engine remains active.</span>
        </div>
      )}

      {dashboard && (
        <>
          {/* Top Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>TOTAL EVENTS</span>
                <Database className="w-4 h-4 text-[#00D9A5]" />
              </div>
              <p className="text-3xl font-serif italic text-white font-normal">{dashboard.total_runs}</p>
              <p className="text-[11px] font-mono text-[#00D9A5]">100% Verified Log Lineage</p>
            </div>

            <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>HIGH-RISK EVENTS</span>
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-serif italic text-amber-400 font-normal">47</p>
              <p className="text-[11px] font-mono text-amber-300/80">Requires Operator Audit</p>
            </div>

            <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>BOUNDARY ALERTS</span>
                <Radar className="w-4 h-4 text-[#00D9A5]" />
              </div>
              <p className="text-3xl font-serif italic text-white font-normal">18</p>
              <p className="text-[11px] font-mono text-[#00D9A5]">Geofence Triggers</p>
            </div>

            <div className="liquid-glass p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>TRACKED SUBJECTS</span>
                <Activity className="w-4 h-4 text-[#00D9A5]" />
              </div>
              <p className="text-3xl font-serif italic text-white font-normal">{dashboard.total_detections}</p>
              <p className="text-[11px] font-mono text-white/50">3,140 Persistent IDs</p>
            </div>
          </div>

          {/* Secondary Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="liquid-glass p-4 rounded-2xl border border-white/10 text-xs font-mono">
              <span className="text-white/40 block">CAMERA SECTORS</span>
              <span className="text-lg font-bold text-white mt-1 block">6 Active Feeds</span>
            </div>

            <div className="liquid-glass p-4 rounded-2xl border border-white/10 text-xs font-mono">
              <span className="text-white/40 block">SURVEILLANCE UPTIME</span>
              <span className="text-lg font-bold text-[#00D9A5] mt-1 block">100.0%</span>
            </div>

            <div className="liquid-glass p-4 rounded-2xl border border-white/10 text-xs font-mono">
              <span className="text-white/40 block">AVG INFERENCE LATENCY</span>
              <span className="text-lg font-bold text-white mt-1 block">
                18.4 ms
              </span>
            </div>

            <div className="liquid-glass p-4 rounded-2xl border border-white/10 text-xs font-mono">
              <span className="text-white/40 block">UNRESOLVED ALERTS</span>
              <span className="text-lg font-bold mt-1 block text-amber-400">
                2 Pending
              </span>
            </div>
          </div>

          {/* 7-Day Activity Movement & Tracked Targets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 7-Day Chart (7 Cols) */}
            <div className="lg:col-span-7 liquid-glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9A5]">7-DAY SURVEILLANCE TRENDS</span>
                  <h4 className="font-serif italic text-2xl text-white font-normal">Daily Detection & Intrusion Volume</h4>
                </div>
                <span className="text-xs font-mono text-white/50">UTC Matrix</span>
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6">
                {dashboard.daily_activity.map((pt) => {
                  const maxRuns = Math.max(1, ...dashboard.daily_activity.map((d) => d.runs))
                  const pct = pt.runs ? Math.max(12, (pt.runs / maxRuns) * 100) : 0
                  const isToday = pt.date === dashboard.daily_activity.at(-1)?.date

                  return (
                    <div key={pt.date} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-mono text-white/60 group-hover:text-white transition-colors">{pt.runs}</span>
                      <div className="w-full bg-white/5 rounded-t-lg overflow-hidden h-36 flex items-end p-1">
                        <div
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            isToday ? 'bg-[#00D9A5] shadow-[0_0_12px_#00D9A5]' : 'bg-emerald-500/40 group-hover:bg-emerald-500/70'
                          }`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/50 uppercase">{pt.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Target Breakdown (5 Cols) */}
            <div className="lg:col-span-5 liquid-glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D9A5]">TARGET BREAKDOWN</span>
                  <h4 className="font-serif italic text-2xl text-white font-normal">Tracked Target Classes</h4>
                </div>
                <span className="text-xs font-mono text-white/50">3,140 Total</span>
              </div>

              <div className="space-y-3">
                {dashboard.material_counts.map((mat) => {
                  const maxCount = Math.max(1, dashboard.material_counts[0].count)
                  const widthPct = Math.max(8, (mat.count / maxCount) * 100)

                  return (
                    <div key={mat.label} className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-white/80">
                        <span>{mat.label}</span>
                        <span className="font-bold text-[#00D9A5]">{mat.count}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#00D9A5] h-full rounded-full transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* System Readiness Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="liquid-glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Cpu className="w-5 h-5 text-[#00D9A5]" />
                <h4 className="font-serif italic text-xl text-white">Surveillance Engine Specs</h4>
              </div>
              <div className="space-y-2 text-xs font-mono text-white/70">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Engine Status</span>
                  <span className="text-[#00D9A5] font-semibold">ONLINE (DEMO PROTOTYPE)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Model Pipeline</span>
                  <span className="text-white font-semibold">Sentinel-Spatial-v4.2</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Compute Device</span>
                  <span className="text-white font-semibold">CUDA TENSOR-CORE</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Resolution Stream</span>
                  <span className="text-white font-semibold">1080p 60FPS</span>
                </div>
              </div>
            </div>

            <div className="liquid-glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5 text-[#00D9A5]" />
                <h4 className="font-serif italic text-xl text-white">Spatial Safeguards</h4>
              </div>
              <div className="space-y-2 text-xs font-mono text-white/70">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Geofence Boundary Gate</span>
                  <span className="text-[#00D9A5] font-semibold">ACTIVE</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Persistent ID Tracking</span>
                  <span className="text-white font-semibold">Kalman-Filtered Vectors</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span>Multi-Camera Handoff</span>
                  <span className="text-white font-semibold">Cross-Sector Sync</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Surveillance Mode</span>
                  <span className="text-white font-semibold">Border Defense Matrix</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-white/40 text-center pt-4">
            Report generated at {new Date(dashboard.generated_at).toLocaleString()} (DEMO SURVEILLANCE REPORT)
          </p>
        </>
      )}
    </div>
  )
}
