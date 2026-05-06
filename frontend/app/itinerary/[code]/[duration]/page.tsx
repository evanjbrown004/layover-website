import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAirport, getItinerary, getLogistics, listAirports } from '@/lib/api'

const DURATIONS = ['3', '5', '8', '12']

export async function generateStaticParams() {
  const airports = await listAirports()
  const params: { code: string; duration: string }[] = []
  for (const airport of airports) {
    if (airport.coverage_status === 'unsupported') continue
    for (const duration of DURATIONS) {
      params.push({ code: airport.id, duration })
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
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="text-base font-semibold text-white">No itinerary written yet</p>
            <p className="mt-1.5 text-sm text-slate-400">
              We haven&apos;t built a guide for {airport.city} yet. Try Vancouver (YVR) to see a full example.
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <Link
                href="/itinerary/YVR/5"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-400 transition-all hover:bg-sky-500/20 hover:scale-105"
              >
                See Vancouver example →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:scale-105"
              >
                ← New search
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
