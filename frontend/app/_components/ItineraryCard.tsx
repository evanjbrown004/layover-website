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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400 ring-1 ring-sky-500/30">
          {step.step_order}
        </div>
        <div className="mt-1 w-px flex-1 bg-white/10" />
      </div>

      <div className="pb-8">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="font-semibold text-white">{step.title}</h3>
          <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400">
            +{formatMinutes(elapsed)}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.description}</p>
        {(transitMethod || step.duration_minutes) && (
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
              {formatMinutes(step.duration_minutes)} here
            </span>
            {transitMethod && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                {transitMethod}
                {step.transit_minutes > 0 && ` · ${formatMinutes(step.transit_minutes)}`}
                {cost && ` · $${cost}`}
              </span>
            )}
          </div>
        )}
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{itinerary.title}</h2>
        <p className="mt-1 text-sm text-slate-300">{itinerary.summary}</p>
      </div>

      <div className="mb-4">
        {itinerary.Steps?.map((step) => {
          const stepElapsed = elapsed + step.transit_minutes
          elapsed += step.transit_minutes + step.duration_minutes
          return <Step key={step.id} step={step} elapsed={stepElapsed} />
        })}
      </div>

      <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-red-400">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-semibold text-red-300">
            Leave for the airport by{' '}
            <span className="text-white">+{formatMinutes(leaveByMinutes)}</span>{' '}
            after landing
          </p>
        </div>
        <p className="mt-1 pl-6 text-xs text-slate-400">
          Allows {formatMinutes(customsMinutes)} for customs re-entry and security
        </p>
      </div>
    </div>
  )
}
