import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ApiError,
  getDashboardSummary,
  getHealth,
  getHistoryRun,
  getHistoryRuns,
  rerunHistory,
  runPrediction,
} from './api'
import type {
  ApiProblem,
  DashboardSummary,
  HealthResponse,
  HistoryRun,
  HistoryRunDetail,
  PredictionRun,
  QueuedImage,
} from './types'

import { LandingPage } from './components/LandingPage'
import { Navbar } from './components/Navbar'
import { OrbCommandCenter } from './components/OrbCommandCenter'
import { LiveFeedView } from './components/LiveFeedView'
import { DailyReportView } from './components/DailyReportView'
import { IncidentLogView } from './components/IncidentLogView'
import { AlertCircle, X } from 'lucide-react'

const MAX_FILES = 12
const DEFAULT_CONFIDENCE = 0.25
const DEFAULT_PIXEL_AREA_CM2 = 0.05
const APP_TITLE = 'SENTINEL — Spatial Video Intelligence for Border Surveillance'

type PageName = 'landing' | 'command' | 'live'
type CommandSubView = 'orbit' | 'history' | 'system'

function App() {
  const queueRef = useRef<QueuedImage[]>([])
  const [currentPage, setCurrentPage] = useState<PageName>('landing')
  const [commandView, setCommandView] = useState<CommandSubView>('orbit')
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [healthError, setHealthError] = useState(false)
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState(false)
  const [queue, setQueue] = useState<QueuedImage[]>([])
  const [confidence, setConfidence] = useState(DEFAULT_CONFIDENCE)
  const [pixelAreaCm2, setPixelAreaCm2] = useState(DEFAULT_PIXEL_AREA_CM2)
  const [isDragging, setIsDragging] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [problem, setProblem] = useState<ApiProblem | null>(null)
  const [result, setResult] = useState<PredictionRun | null>(null)
  const [activeViews, setActiveViews] = useState<Record<number, 'input' | 'output'>>({})
  const [historyRuns, setHistoryRuns] = useState<HistoryRun[]>([])
  const [historyDetail, setHistoryDetail] = useState<HistoryRunDetail | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [historySearch, setHistorySearch] = useState('')

  useEffect(() => {
    getHealth()
      .then((payload) => {
        setHealth(payload)
        setHealthError(false)
      })
      .catch(() => setHealthError(true))

    getDashboardSummary()
      .then((payload) => {
        setDashboard(payload)
        setDashboardError(false)
      })
      .catch(() => setDashboardError(true))
      .finally(() => setDashboardLoading(false))
  }, [])

  useEffect(() => {
    queueRef.current = queue
  }, [queue])

  useEffect(
    () => () => {
      queueRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    },
    [],
  )

  useEffect(() => {
    document.title = APP_TITLE
  }, [])

  const categoryCounts = useMemo(() => detectionCounts(result?.images ?? []), [result])
  const averageConfidence = useMemo(
    () => calculateAverageConfidence(result?.images ?? []),
    [result],
  )
  const filteredHistory = useMemo(() => {
    const term = historySearch.trim().toLowerCase()
    if (!term) return historyRuns
    return historyRuns.filter((run) =>
      [
        run.run_id,
        run.preview_filename ?? '',
        run.status,
        new Date(run.created_at).toLocaleString(),
      ].some((val) => val.toLowerCase().includes(term)),
    )
  }, [historyRuns, historySearch])

  function navigateToCommand(subView: CommandSubView = 'orbit') {
    setCurrentPage('command')
    setCommandView(subView)
    if (subView === 'history' && historyRuns.length === 0) {
      void loadHistory()
    }
    if (subView === 'system') {
      void refreshDashboard()
    }
  }

  function navigateToLive() {
    setCurrentPage('live')
  }

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    if (!incoming.length) {
      setProblem({ message: 'Choose JPG, PNG, WEBP, BMP, or another valid image format.' })
      return
    }
    setQueue((current) => {
      const remaining = MAX_FILES - current.length
      const additions = incoming.slice(0, remaining).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      if (incoming.length > remaining) {
        setProblem({ message: `A maximum of ${MAX_FILES} demo frames can be processed in one run.` })
      }
      return [...current, ...additions]
    })
    setResult(null)
  }

  function removeFile(id: string) {
    setQueue((current) => {
      const item = current.find((candidate) => candidate.id === id)
      if (item) URL.revokeObjectURL(item.previewUrl)
      return current.filter((candidate) => candidate.id !== id)
    })
  }

  function clearWorkspace() {
    queue.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    setQueue([])
    setResult(null)
    setActiveViews({})
  }

  async function analyze() {
    if (!queue.length || isRunning) return
    setIsRunning(true)
    setProblem(null)
    setResult(null)
    try {
      const payload = await runPrediction(
        queue.map((item) => item.file),
        confidence,
        50,
        pixelAreaCm2,
      )
      displayPrediction(payload)
      setHistoryRuns([])
      void refreshDashboard()
    } catch (requestError) {
      showRequestError(requestError)
    } finally {
      setIsRunning(false)
    }
  }

  function displayPrediction(payload: PredictionRun) {
    setResult(payload)
    setActiveViews(
      Object.fromEntries(payload.images.map((image) => [image.image_id, 'output'])),
    )
    setCurrentPage('live')
    window.setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  async function loadHistory(selectedId?: string) {
    setHistoryLoading(true)
    try {
      const runs = await getHistoryRuns()
      setHistoryRuns(runs)
      const target = selectedId ?? historyDetail?.run_id ?? runs[0]?.run_id
      if (target) await loadHistoryDetail(target)
      if (!target) setHistoryDetail(null)
    } catch (requestError) {
      showRequestError(requestError)
    } finally {
      setHistoryLoading(false)
    }
  }

  async function loadHistoryDetail(runId: string) {
    setDetailLoading(true)
    try {
      const detail = await getHistoryRun(runId)
      setHistoryDetail(detail)
      setActiveViews(
        Object.fromEntries(
          detail.images.map((image) => [image.image_id, image.output_url ? 'output' : 'input']),
        ),
      )
    } catch (requestError) {
      showRequestError(requestError)
    } finally {
      setDetailLoading(false)
    }
  }

  async function refreshDashboard() {
    setDashboardLoading(true)
    try {
      const payload = await getDashboardSummary()
      setDashboard(payload)
      setDashboardError(false)
    } catch {
      setDashboardError(true)
    } finally {
      setDashboardLoading(false)
    }
  }

  async function rerunSelected() {
    if (!historyDetail || isRunning) return
    setIsRunning(true)
    try {
      const payload = await rerunHistory(
        historyDetail.run_id,
        confidence,
        50,
        pixelAreaCm2,
      )
      displayPrediction(payload)
      setHistoryRuns([])
      void refreshDashboard()
    } catch (requestError) {
      showRequestError(requestError)
    } finally {
      setIsRunning(false)
    }
  }

  function showRequestError(error: unknown) {
    if (error instanceof ApiError) {
      setProblem(error.problem)
      return
    }
    setProblem({
      message: error instanceof Error ? error.message : 'The demo request could not be completed.',
    })
  }

  // PAGE 1: CINEMATIC LANDING & LOGIN WITH REALISTIC ROTATING EARTH
  if (currentPage === 'landing') {
    return <LandingPage onLoginSuccess={() => navigateToCommand('orbit')} />
  }

  return (
    <div className={`bg-[#050605] text-white font-sans antialiased selection:bg-[#00D9A5] selection:text-black ${
      currentPage === 'command' && commandView === 'orbit' ? 'h-screen max-h-screen overflow-hidden' : 'min-h-screen'
    }`}>
      {/* Floating Navbar */}
      <Navbar
        activeTab={
          currentPage === 'live'
            ? 'inspect'
            : commandView === 'orbit'
            ? 'inspect'
            : commandView
        }
        onSelectTab={(tab) => {
          if (tab === 'inspect') {
            navigateToLive()
          } else {
            navigateToCommand(tab)
          }
        }}
        onScrollToCommandCenter={() => {
          if (currentPage !== 'command') {
            navigateToCommand('orbit')
          }
        }}
        isOnline={Boolean(health?.model_ready && !healthError)}
      />

      {/* Main Pages Navigation Switcher */}
      {currentPage === 'command' && commandView === 'orbit' && (
        <main className="h-screen max-h-screen overflow-hidden">
          <OrbCommandCenter
            onSelectOption={(option) => {
              if (option === 'inspect') {
                navigateToLive()
              } else {
                navigateToCommand(option)
              }
            }}
          />
        </main>
      )}

      {currentPage === 'command' && commandView !== 'orbit' && (
        <div className="min-h-screen bg-[#050605] pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {commandView === 'system' && (
            <DailyReportView
              health={health}
              dashboard={dashboard}
              loading={dashboardLoading}
              hasError={dashboardError}
              onBackToCommandCenter={() => navigateToCommand('orbit')}
              onRefresh={() => void refreshDashboard()}
            />
          )}

          {commandView === 'history' && (
            <IncidentLogView
              runs={filteredHistory}
              detail={historyDetail}
              search={historySearch}
              loading={historyLoading}
              detailLoading={detailLoading}
              rerunning={isRunning}
              activeViews={activeViews}
              onBackToCommandCenter={() => navigateToCommand('orbit')}
              onSearch={setHistorySearch}
              onRefresh={() => void loadHistory()}
              onSelect={(runId) => void loadHistoryDetail(runId)}
              onRerun={() => void rerunSelected()}
              onViewChange={(imageId, next) =>
                setActiveViews((current) => ({ ...current, [imageId]: next }))
              }
            />
          )}
        </div>
      )}

      {currentPage === 'live' && (
        <div className="min-h-screen bg-[#050605] pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <LiveFeedView
            queue={queue}
            confidence={confidence}
            pixelAreaCm2={pixelAreaCm2}
            health={health}
            healthError={healthError}
            isDragging={isDragging}
            isRunning={isRunning}
            result={result}
            activeViews={activeViews}
            categoryCounts={categoryCounts}
            averageConfidence={averageConfidence}
            onBackToCommandCenter={() => navigateToCommand('orbit')}
            onAddFiles={addFiles}
            onRemoveFile={removeFile}
            onClear={clearWorkspace}
            onAnalyze={analyze}
            onConfidenceChange={setConfidence}
            onPixelAreaChange={setPixelAreaCm2}
            onDraggingChange={setIsDragging}
            onViewChange={(imageId, next) =>
              setActiveViews((current) => ({ ...current, [imageId]: next }))
            }
          />
        </div>
      )}

      {/* Error Problem Dialog */}
      {problem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="liquid-glass-strong max-w-md w-full p-6 rounded-3xl border border-white/20 space-y-4 animate-fadeIn relative">
            <button
              type="button"
              onClick={() => setProblem(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif italic text-2xl text-white">Surveillance Notice</h4>
              <p className="text-xs text-white/70 font-mono leading-relaxed">{problem.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setProblem(null)}
              className="w-full py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function detectionCounts(images: PredictionRun['images']): [string, number][] {
  const counts = new Map<string, number>()
  images.forEach((image) =>
    image.detections.forEach((detection) => {
      counts.set(detection.label, (counts.get(detection.label) ?? 0) + 1)
    }),
  )
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

function calculateAverageConfidence(images: PredictionRun['images']) {
  const scores = images.flatMap((image) => image.detections.map((item) => item.confidence))
  return scores.length ? scores.reduce((sum, val) => sum + val, 0) / scores.length : null
}

export default App
