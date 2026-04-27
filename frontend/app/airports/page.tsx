import { listAirports } from '@/lib/api'
import CoverageBadge from '@/app/_components/CoverageBadge'
import Link from 'next/link'

export default async function AirportsPage() {
  const airports = await listAirports()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">Airport Coverage</h1>
      <p className="mb-8 text-slate-300">
        Airports we currently have itineraries for, and their coverage status.
      </p>

      {airports.length === 0 ? (
        <p className="text-slate-400">No airports available yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {airports.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center justify-between px-6 py-5 transition-colors hover:bg-white/5 ${
                i !== 0 ? 'border-t border-white/5' : ''
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-sky-500/10 px-2.5 py-1 font-mono text-sm font-bold text-sky-400">
                    {a.id}
                  </span>
                  <span className="font-semibold text-white">{a.name}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {a.city}, {a.country}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CoverageBadge status={a.coverage_status} />
                {a.coverage_status !== 'unsupported' && (
                  <Link
                    href={`/itinerary/${a.id}/5`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
                  >
                    View →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
