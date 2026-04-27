import { listAirports } from '@/lib/api'
import CoverageBadge from '@/app/_components/CoverageBadge'
import Link from 'next/link'

export default async function AirportsPage() {
  const airports = await listAirports()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">Airport Coverage</h1>
      <p className="mb-8 text-slate-400">
        Airports we currently have itineraries for, and their coverage status.
      </p>

      {airports.length === 0 ? (
        <p className="text-slate-500">No airports available yet.</p>
      ) : (
        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800">
          {airports.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-sky-400">{a.id}</span>
                  <span className="font-medium text-slate-100">{a.name}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">
                  {a.city}, {a.country}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <CoverageBadge status={a.coverage_status} />
                {a.coverage_status !== 'unsupported' && (
                  <Link
                    href={`/itinerary/${a.id}/5`}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    View itineraries →
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
