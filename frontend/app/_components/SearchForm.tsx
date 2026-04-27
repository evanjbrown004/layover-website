'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Airport } from '@/lib/api'
import CoverageBadge from './CoverageBadge'

const DURATIONS = [3, 5, 8, 12] as const

export default function SearchForm({ airports }: { airports: Airport[] }) {
  const router = useRouter()
  const [code, setCode] = useState(airports[0]?.id ?? '')
  const [duration, setDuration] = useState<number>(5)

  const selected = airports.find((a) => a.id === code)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code || !duration) return
    router.push(`/itinerary/${code}/${duration}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Airport selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-400">Airport</label>
        <div className="flex items-center gap-3">
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 focus:border-sky-500 focus:outline-none"
          >
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {a.city} ({a.id})
              </option>
            ))}
          </select>
          {selected && <CoverageBadge status={selected.coverage_status} />}
        </div>
      </div>

      {/* Duration selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-400">Layover duration</label>
        <div className="grid grid-cols-4 gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`rounded-lg border py-3 text-sm font-medium transition-colors ${
                duration === d
                  ? 'border-sky-500 bg-sky-500/10 text-sky-400'
                  : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-100'
              }`}
            >
              {d === 12 ? '12h+' : `${d}h`}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-400"
      >
        Plan my layover
      </button>
    </form>
  )
}
