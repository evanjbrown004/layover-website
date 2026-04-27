import { listAirports } from '@/lib/api'
import SearchForm from './_components/SearchForm'

export default async function HomePage() {
  const airports = await listAirports()

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Make your layover count.
        </h1>
        <p className="mb-10 text-lg text-slate-400">
          A specific, trustworthy schedule for leaving the airport — with transit
          times, logistics warnings, and a hard leave-by time at every step.
        </p>
        {airports.length > 0 ? (
          <SearchForm airports={airports} />
        ) : (
          <p className="text-slate-500">No airports available yet.</p>
        )}
      </div>
    </div>
  )
}
