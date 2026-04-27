import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAirport, getItinerary, getLogistics, listAirports, listItinerariesForAirport } from '@/lib/api'

export async function generateStaticParams() {
  const airports = await listAirports()
  const params: { code: string; duration: string }[] = []
  for (const airport of airports) {
    if (airport.coverage_status === 'unsupported') continue
    const itineraries = await listItinerariesForAirport(airport.id)
    for (const itinerary of itineraries) {
      params.push({ code: airport.id.toLowerCase(), duration: String(itinerary.duration_hours) })
    }
  }
  return params
}
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
      {/* Back */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
      >
        ← New search
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-white">
            {airport.city}
          </h1>
          <span className="text-2xl text-slate-500">·</span>
          <span className="text-2xl font-semibold text-sky-400">{duration}h layover</span>
          <CoverageBadge status={airport.coverage_status} />
        </div>
        <p className="mt-2 text-sm text-slate-400">{airport.name}</p>
      </div>

      <div className="flex flex-col gap-5">
        {logistics && <LogisticsBlock logistics={logistics} />}

        {itinerary ? (
          <ItineraryCard
            itinerary={itinerary}
            customsMinutes={airport.customs_reentry_minutes}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
            <p className="text-slate-300">
              No itinerary available for a {duration}h layover in {airport.city}.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-400 transition-all hover:bg-sky-500/20 hover:scale-105"
            >
              Try a different duration →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
