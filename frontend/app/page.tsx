import { listAirports, listItinerariesForAirport } from '@/lib/api'
import SearchForm from './_components/SearchForm'

export default async function HomePage() {
  const airports = await listAirports()

  // Mark which airports have at least one itinerary so the search can surface them first
  const withContent = new Set<string>()
  await Promise.all(
    airports.map(async (a) => {
      const its = await listItinerariesForAirport(a.id)
      if (its.length > 0) withContent.add(a.id)
    })
  )

  const sorted = [
    ...airports.filter((a) => withContent.has(a.id)),
    ...airports.filter((a) => !withContent.has(a.id)),
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-64 w-64 rounded-full bg-indigo-500/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-lg">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Plan your city escape
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">
            Make your layover count.
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-slate-300">
            A specific, trustworthy schedule for leaving the airport — with transit
            times, logistics warnings, and a hard leave-by time at every step.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
            {airports.length > 0 ? (
              <SearchForm airports={sorted} airportsWithContent={withContent} />
            ) : (
              <p className="text-slate-400">No airports available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
