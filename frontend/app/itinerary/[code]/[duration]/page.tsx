import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAirport, getItinerary, getLogistics } from '@/lib/api'
import LogisticsBlock from '@/app/_components/LogisticsBlock'
import ItineraryCard from '@/app/_components/ItineraryCard'
import CoverageBadge from '@/app/_components/CoverageBadge'

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ code: string; duration: string }>
}) {
  const { code, duration } = await params
  const upperCode = code.toUpperCase()

  const [airport, itinerary, logistics] = await Promise.all([
    getAirport(upperCode),
    getItinerary(upperCode, duration),
    getLogistics(upperCode),
  ])

  if (!airport) notFound()

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-block text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← New search
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">
            {airport.city} · {duration}h layover
          </h1>
          <CoverageBadge status={airport.coverage_status} />
        </div>
        <p className="mt-1 text-sm text-slate-500">{airport.name}</p>
      </div>

      <div className="flex flex-col gap-6">
        {logistics && <LogisticsBlock logistics={logistics} />}

        {itinerary ? (
          <ItineraryCard
            itinerary={itinerary}
            customsMinutes={airport.customs_reentry_minutes}
          />
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-10 text-center">
            <p className="text-slate-400">
              No itinerary available for a {duration}h layover in {airport.city}.
            </p>
            <Link href="/" className="mt-4 inline-block text-sm text-sky-400 hover:text-sky-300">
              Try a different duration
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
