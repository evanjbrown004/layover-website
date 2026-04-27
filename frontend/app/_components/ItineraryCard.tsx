import type { Itinerary, ItineraryStep } from '@/lib/api'
import { nullStr } from '@/lib/api'

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function Step({ step, elapsed }: { step: ItineraryStep; elapsed: number }) {
  const transitMethod = nullStr(step.transit_method)
  const cost = nullStr(step.cost)

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-400">
          {step.step_order}
        </div>
        <div className="mt-1 w-px flex-1 bg-slate-800" />
      </div>

      <div className="pb-8">
        <div className="flex items-baseline gap-3">
          <h3 className="font-medium text-slate-100">{step.title}</h3>
          <span className="text-xs text-sky-400">+{formatMinutes(elapsed)}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.description}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
          <span>{formatMinutes(step.duration_minutes)} here</span>
          {transitMethod && (
            <span>
              {transitMethod}
              {step.transit_minutes > 0 && ` · ${formatMinutes(step.transit_minutes)}`}
              {cost && ` · $${cost}`}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ItineraryCard({
  itinerary,
  customsMinutes,
}: {
  itinerary: Itinerary
  customsMinutes: number
}) {
  let elapsed = 0
  const leaveByMinutes = itinerary.duration_hours * 60 - customsMinutes

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{itinerary.title}</h2>
        <p className="mt-1 text-sm text-slate-400">{itinerary.summary}</p>
      </div>

      <div className="mb-2">
        {itinerary.Steps?.map((step) => {
          const stepElapsed = elapsed + step.transit_minutes
          elapsed += step.transit_minutes + step.duration_minutes
          return <Step key={step.id} step={step} elapsed={stepElapsed} />
        })}
      </div>

      <div className="rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3">
        <p className="text-sm font-semibold text-red-400">
          Leave for the airport by{' '}
          <span className="text-red-300">+{formatMinutes(leaveByMinutes)}</span>{' '}
          after landing
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          Allows {formatMinutes(customsMinutes)} for customs re-entry and security
        </p>
      </div>
    </div>
  )
}
