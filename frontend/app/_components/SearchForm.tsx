'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Airport } from '@/lib/api'
import CoverageBadge from './CoverageBadge'

const DURATIONS = [3, 5, 8, 12] as const

export default function SearchForm({
  airports,
  airportsWithContent,
}: {
  airports: Airport[]
  airportsWithContent: Set<string>
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Airport | null>(null)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const [duration, setDuration] = useState<number>(5)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim().length === 0 ? [] : airports.filter((a) => {
    const q = query.toLowerCase()
    return (
      a.id.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
    )
  }).slice(0, 8)

  function handleSelect(airport: Airport) {
    setSelected(airport)
    setQuery(`${airport.city} (${airport.id})`)
    setOpen(false)
    setHighlighted(0)
    inputRef.current?.blur()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleSelect(results[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selected || !duration) return
    router.push(`/itinerary/${selected.id}/${duration}`)
  }

  const hasContent = selected ? airportsWithContent.has(selected.id) : false

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Airport search */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-300">Airport</label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(null)
              setOpen(true)
              setHighlighted(0)
            }}
            onFocus={() => { if (query.trim()) setOpen(true) }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={handleKeyDown}
            placeholder="Search by city or airport code…"
            autoComplete="off"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />

          {open && results.length > 0 && (
            <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-white/10 bg-[#0d1424] shadow-2xl">
              {results.map((a, i) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onMouseDown={() => handleSelect(a)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                      i === highlighted ? 'bg-sky-500/10' : 'hover:bg-white/5'
                    } ${i !== 0 ? 'border-t border-white/5' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 shrink-0 rounded-lg bg-sky-500/10 px-1.5 py-1 text-center font-mono text-xs font-bold text-sky-400">
                        {a.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{a.city}</p>
                          {airportsWithContent.has(a.id) && (
                            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                              itinerary ready
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate max-w-48">{a.name}</p>
                      </div>
                    </div>
                    <CoverageBadge status={a.coverage_status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected airport info */}
        {selected && !hasContent && (
          <p className="text-xs text-amber-400/80">
            No itinerary written for {selected.city} yet — you&apos;ll see a placeholder page.
          </p>
        )}
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
        disabled={!selected}
        className="mt-1 rounded-full bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-200 hover:bg-sky-400 hover:shadow-sky-400/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
      >
        Plan my layover →
      </button>
    </form>
  )
}
