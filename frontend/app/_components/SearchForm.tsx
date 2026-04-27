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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Airport selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Airport</label>
        <div className="flex items-center gap-3">
          <select
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            {airports.map((a) => (
              <option key={a.id} value={a.id} className="bg-slate-900 text-white">
                {a.city} ({a.id})
              </option>
            ))}
          </select>
          {selected && <CoverageBadge status={selected.coverage_status} />}
        </div>
      </div>

      {/* Duration selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Layover duration</label>
        <div className="grid grid-cols-4 gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`rounded-full border py-2.5 text-sm font-semibold transition-all duration-200 ${
                duration === d
                  ? 'border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/40 scale-105'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-white hover:scale-105'
              }`}
            >
              {d === 12 ? '12h+' : `${d}h`}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-1 rounded-full bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-200 hover:bg-sky-400 hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        Plan my layover →
      </button>
    </form>
  )
}
