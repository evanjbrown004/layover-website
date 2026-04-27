'use client'

import { useState, useEffect, useCallback } from 'react'
import * as api from '@/lib/adminApi'
import type { Airport, Itinerary, ItineraryStep, ItineraryWithSteps, Logistics } from '@/lib/adminApi'
import { listAirports, getLogistics, listItinerariesForAirport } from '@/lib/api'
import { nullStr } from '@/lib/api'

// ---- Helpers ----

function Input({
  label, value, onChange, type = 'text', rows,
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
  rows?: number
}) {
  const cls =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20'
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      {rows ? (
        <textarea
          className={cls}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function Select({
  label, value, onChange, options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-3 py-2 text-sm text-white focus:border-sky-500/50 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function Btn({
  children, onClick, variant = 'primary', size = 'md', disabled,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
}) {
  const base = 'rounded-full font-medium transition-all disabled:opacity-40'
  const sizes = { sm: 'px-3 py-1 text-xs', md: 'px-4 py-2 text-sm' }
  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-400',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30',
    ghost: 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${className}`}>
      {children}
    </div>
  )
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1424] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg leading-none">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ---- Login ----

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = await api.login(username, password)
      sessionStorage.setItem('admin_token', token)
      onLogin(token)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">Layover Admin</h1>
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Username" value={username} onChange={setUsername} />
            <Input label="Password" value={password} onChange={setPassword} type="password" />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <Btn disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Btn>
          </form>
        </Card>
      </div>
    </div>
  )
}

// ---- Airport form ----

function AirportForm({
  initial, onSave, onClose,
}: {
  initial?: Airport
  onSave: (data: Airport) => Promise<void>
  onClose: () => void
}) {
  const [f, setF] = useState<Airport>(
    initial ?? {
      id: '', name: '', city: '', country: '',
      coverage_status: 'full', customs_reentry_minutes: 45, timezone: '',
    }
  )
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr('')
    try {
      await onSave(f)
      onClose()
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  const set = (k: keyof Airport) => (v: string) =>
    setF((prev) => ({ ...prev, [k]: k === 'customs_reentry_minutes' ? Number(v) : v }))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {!initial && <Input label="IATA Code (e.g. YVR)" value={f.id} onChange={set('id')} />}
      <Input label="Airport Name" value={f.name} onChange={set('name')} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="City" value={f.city} onChange={set('city')} />
        <Input label="Country" value={f.country} onChange={set('country')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Coverage"
          value={f.coverage_status}
          onChange={set('coverage_status')}
          options={[
            { value: 'full', label: 'Full Coverage' },
            { value: 'limited', label: 'Limited Data' },
            { value: 'unsupported', label: 'Not Supported' },
          ]}
        />
        <Input
          label="Customs re-entry (min)"
          value={f.customs_reentry_minutes}
          onChange={set('customs_reentry_minutes')}
          type="number"
        />
      </div>
      <Input label="Timezone (e.g. America/Vancouver)" value={f.timezone} onChange={set('timezone')} />
      {err && <p className="text-xs text-red-400">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
      </div>
    </form>
  )
}

// ---- Itinerary form ----

function ItineraryForm({
  initial, onSave, onClose,
}: {
  initial?: Itinerary
  onSave: (data: Omit<Itinerary, 'id' | 'airport_id'>) => Promise<void>
  onClose: () => void
}) {
  const [f, setF] = useState({
    title: initial?.title ?? '',
    summary: initial?.summary ?? '',
    duration_hours: initial?.duration_hours ?? 5,
    min_duration_hours: initial?.min_duration_hours ?? 4,
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr('')
    try {
      await onSave(f)
      onClose()
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input label="Title" value={f.title} onChange={(v) => setF((p) => ({ ...p, title: v }))} />
      <Input label="Summary" value={f.summary} onChange={(v) => setF((p) => ({ ...p, summary: v }))} rows={3} />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Duration (hours)"
          value={f.duration_hours}
          onChange={(v) => setF((p) => ({ ...p, duration_hours: Number(v) }))}
          type="number"
        />
        <Input
          label="Min duration (hours)"
          value={f.min_duration_hours}
          onChange={(v) => setF((p) => ({ ...p, min_duration_hours: Number(v) }))}
          type="number"
        />
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
      </div>
    </form>
  )
}

// ---- Step form ----

function StepForm({
  initial, stepOrder, onSave, onClose,
}: {
  initial?: ItineraryStep
  stepOrder: number
  onSave: (data: Omit<ItineraryStep, 'id' | 'itinerary_id'>) => Promise<void>
  onClose: () => void
}) {
  const [f, setF] = useState({
    step_order: initial?.step_order ?? stepOrder,
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    duration_minutes: initial?.duration_minutes ?? 30,
    transit_minutes: initial?.transit_minutes ?? 0,
    transit_method: nullStr(initial?.transit_method ?? null),
    cost: nullStr(initial?.cost ?? null),
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr('')
    try {
      await onSave({
        ...f,
        transit_method: f.transit_method ? { String: f.transit_method, Valid: true } : { String: '', Valid: false },
        cost: f.cost ? { String: f.cost, Valid: true } : { String: '', Valid: false },
      })
      onClose()
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Step #" value={f.step_order} onChange={(v) => setF((p) => ({ ...p, step_order: Number(v) }))} type="number" />
        <Input label="Duration at location (min)" value={f.duration_minutes} onChange={(v) => setF((p) => ({ ...p, duration_minutes: Number(v) }))} type="number" />
      </div>
      <Input label="Title" value={f.title} onChange={(v) => setF((p) => ({ ...p, title: v }))} />
      <Input label="Description" value={f.description} onChange={(v) => setF((p) => ({ ...p, description: v }))} rows={3} />
      <div className="grid grid-cols-3 gap-3">
        <Input label="Transit (min)" value={f.transit_minutes} onChange={(v) => setF((p) => ({ ...p, transit_minutes: Number(v) }))} type="number" />
        <Input label="Transit method" value={f.transit_method} onChange={(v) => setF((p) => ({ ...p, transit_method: v }))} />
        <Input label="Cost ($)" value={f.cost} onChange={(v) => setF((p) => ({ ...p, cost: v }))} />
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
      </div>
    </form>
  )
}

// ---- Logistics form ----

function LogisticsForm({
  initial, onSave, onClose,
}: {
  initial?: Logistics | null
  onSave: (data: { visa_notes: string; bag_storage_notes: string; reentry_notes: string }) => Promise<void>
  onClose: () => void
}) {
  const [f, setF] = useState({
    visa_notes: nullStr(initial?.visa_notes ?? null),
    bag_storage_notes: nullStr(initial?.bag_storage_notes ?? null),
    reentry_notes: nullStr(initial?.reentry_notes ?? null),
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr('')
    try {
      await onSave(f)
      onClose()
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input label="Visa & Entry notes" value={f.visa_notes} onChange={(v) => setF((p) => ({ ...p, visa_notes: v }))} rows={3} />
      <Input label="Bag storage notes" value={f.bag_storage_notes} onChange={(v) => setF((p) => ({ ...p, bag_storage_notes: v }))} rows={3} />
      <Input label="Re-entry notes" value={f.reentry_notes} onChange={(v) => setF((p) => ({ ...p, reentry_notes: v }))} rows={3} />
      {err && <p className="text-xs text-red-400">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
      </div>
    </form>
  )
}

// ---- Main admin shell ----

type ModalState =
  | { type: 'createAirport' }
  | { type: 'editAirport'; airport: Airport }
  | { type: 'createItinerary'; code: string }
  | { type: 'editItinerary'; code: string; itinerary: Itinerary }
  | { type: 'createStep'; code: string; itineraryId: string; nextOrder: number }
  | { type: 'editStep'; code: string; itineraryId: string; step: ItineraryStep }
  | { type: 'editLogistics'; code: string; logistics: Logistics | null }

function AdminShell({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [airports, setAirports] = useState<Airport[]>([])
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null)
  const [itineraries, setItineraries] = useState<ItineraryWithSteps[]>([])
  const [logistics, setLogistics] = useState<Logistics | null>(null)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [activeTab, setActiveTab] = useState<'itineraries' | 'logistics'>('itineraries')
  const [loading, setLoading] = useState(true)

  const loadAirports = useCallback(async () => {
    const data = await listAirports()
    setAirports(data)
    setLoading(false)
  }, [])

  useEffect(() => { loadAirports() }, [loadAirports])

  async function selectAirport(a: Airport) {
    setSelectedAirport(a)
    setItineraries([])
    setLogistics(null)
    const [its, lg] = await Promise.all([
      listItinerariesForAirport(a.id),
      getLogistics(a.id).catch(() => null),
    ])
    // Fetch steps for each itinerary
    const withSteps = await Promise.all(
      its.map(async (it) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/airports/${a.id}/itineraries/${it.id}`
        )
        if (!res.ok) return { ...it, steps: [] }
        const d: ItineraryWithSteps = await res.json()
        return d
      })
    )
    setItineraries(withSteps)
    setLogistics(lg)
  }

  async function handleDeleteAirport(code: string) {
    if (!confirm(`Delete airport ${code}? This cannot be undone.`)) return
    await api.deleteAirport(token, code)
    if (selectedAirport?.id === code) setSelectedAirport(null)
    await loadAirports()
  }

  async function handleDeleteItinerary(code: string, id: string) {
    if (!confirm('Delete this itinerary and all its steps?')) return
    await api.deleteItinerary(token, code, id)
    if (selectedAirport) await selectAirport(selectedAirport)
  }

  async function handleDeleteStep(code: string, itineraryId: string, stepId: string) {
    if (!confirm('Delete this step?')) return
    await api.deleteStep(token, code, itineraryId, stepId)
    if (selectedAirport) await selectAirport(selectedAirport)
  }

  function closeModal() { setModal(null) }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {selectedAirport && (
              <button
                onClick={() => setSelectedAirport(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ← Airports
              </button>
            )}
            <h1 className="text-sm font-semibold text-white">
              {selectedAirport ? (
                <span>
                  <span className="text-slate-400">Airports /</span> {selectedAirport.city} ({selectedAirport.id})
                </span>
              ) : (
                'Layover Admin'
              )}
            </h1>
          </div>
          <Btn variant="ghost" size="sm" onClick={onLogout}>Log out</Btn>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Airport list */}
        {!selectedAirport && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Airports</h2>
              <Btn onClick={() => setModal({ type: 'createAirport' })}>+ Add airport</Btn>
            </div>
            {loading ? (
              <p className="text-slate-400 text-sm">Loading…</p>
            ) : airports.length === 0 ? (
              <p className="text-slate-400 text-sm">No airports yet.</p>
            ) : (
              <Card className="p-0 overflow-hidden">
                {airports.map((a, i) => (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between px-5 py-4 hover:bg-white/5 ${i !== 0 ? 'border-t border-white/5' : ''}`}
                  >
                    <button
                      className="flex items-center gap-3 text-left"
                      onClick={() => selectAirport(a)}
                    >
                      <span className="rounded-lg bg-sky-500/10 px-2 py-1 font-mono text-xs font-bold text-sky-400">
                        {a.id}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{a.name}</p>
                        <p className="text-xs text-slate-400">{a.city}, {a.country}</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <Btn size="sm" variant="ghost" onClick={() => setModal({ type: 'editAirport', airport: a })}>
                        Edit
                      </Btn>
                      <Btn size="sm" variant="danger" onClick={() => handleDeleteAirport(a.id)}>
                        Delete
                      </Btn>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        )}

        {/* Airport detail */}
        {selectedAirport && (
          <div>
            {/* Tabs */}
            <div className="mb-6 flex gap-1 border-b border-white/10 pb-1">
              {(['itineraries', 'logistics'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-sky-500/10 text-sky-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Itineraries tab */}
            {activeTab === 'itineraries' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-white">Itineraries</h2>
                  <Btn
                    size="sm"
                    onClick={() => setModal({ type: 'createItinerary', code: selectedAirport.id })}
                  >
                    + Add itinerary
                  </Btn>
                </div>
                {itineraries.length === 0 ? (
                  <p className="text-sm text-slate-400">No itineraries yet.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {itineraries.map((it) => (
                      <Card key={it.id}>
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{it.title}</p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              {it.duration_hours}h · min {it.min_duration_hours}h
                            </p>
                            <p className="mt-1 text-sm text-slate-300">{it.summary}</p>
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <Btn
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setModal({ type: 'editItinerary', code: selectedAirport.id, itinerary: it })
                              }
                            >
                              Edit
                            </Btn>
                            <Btn
                              size="sm"
                              variant="danger"
                              onClick={() => handleDeleteItinerary(selectedAirport.id, it.id)}
                            >
                              Delete
                            </Btn>
                          </div>
                        </div>

                        {/* Steps */}
                        <div className="mt-3 border-t border-white/5 pt-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Steps ({it.steps?.length ?? 0})
                            </p>
                            <Btn
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setModal({
                                  type: 'createStep',
                                  code: selectedAirport.id,
                                  itineraryId: it.id,
                                  nextOrder: (it.steps?.length ?? 0) + 1,
                                })
                              }
                            >
                              + Step
                            </Btn>
                          </div>
                          {it.steps?.length > 0 && (
                            <div className="flex flex-col gap-2">
                              {it.steps.map((step) => (
                                <div
                                  key={step.id}
                                  className="flex items-start justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5"
                                >
                                  <div className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400">
                                      {step.step_order}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-white">{step.title}</p>
                                      <p className="text-xs text-slate-400">{step.duration_minutes}min here
                                        {step.transit_minutes > 0 && ` · ${step.transit_minutes}min transit`}
                                        {nullStr(step.transit_method) && ` · ${nullStr(step.transit_method)}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex shrink-0 gap-1.5">
                                    <Btn
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        setModal({
                                          type: 'editStep',
                                          code: selectedAirport.id,
                                          itineraryId: it.id,
                                          step,
                                        })
                                      }
                                    >
                                      Edit
                                    </Btn>
                                    <Btn
                                      size="sm"
                                      variant="danger"
                                      onClick={() =>
                                        handleDeleteStep(selectedAirport.id, it.id, step.id)
                                      }
                                    >
                                      ✕
                                    </Btn>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Logistics tab */}
            {activeTab === 'logistics' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-white">Logistics</h2>
                  <Btn
                    size="sm"
                    onClick={() =>
                      setModal({ type: 'editLogistics', code: selectedAirport.id, logistics })
                    }
                  >
                    {logistics ? 'Edit' : '+ Add logistics'}
                  </Btn>
                </div>
                {logistics ? (
                  <Card>
                    <div className="flex flex-col gap-4">
                      {[
                        { label: 'Visa & Entry', val: nullStr(logistics.visa_notes) },
                        { label: 'Bag Storage', val: nullStr(logistics.bag_storage_notes) },
                        { label: 'Re-entry', val: nullStr(logistics.reentry_notes) },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {s.label}
                          </p>
                          <p className="text-sm text-slate-300">{s.val || <em className="text-slate-500">Not set</em>}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ) : (
                  <p className="text-sm text-slate-400">No logistics data yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'createAirport' && (
        <Modal title="Add Airport" onClose={closeModal}>
          <AirportForm
            onSave={async (data) => { await api.createAirport(token, data); await loadAirports() }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'editAirport' && (
        <Modal title="Edit Airport" onClose={closeModal}>
          <AirportForm
            initial={modal.airport}
            onSave={async (data) => { await api.updateAirport(token, modal.airport.id, data); await loadAirports() }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'createItinerary' && (
        <Modal title="Add Itinerary" onClose={closeModal}>
          <ItineraryForm
            onSave={async (data) => { await api.createItinerary(token, modal.code, data); if (selectedAirport) await selectAirport(selectedAirport) }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'editItinerary' && (
        <Modal title="Edit Itinerary" onClose={closeModal}>
          <ItineraryForm
            initial={modal.itinerary}
            onSave={async (data) => { await api.updateItinerary(token, modal.code, modal.itinerary.id, data); if (selectedAirport) await selectAirport(selectedAirport) }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'createStep' && (
        <Modal title="Add Step" onClose={closeModal}>
          <StepForm
            stepOrder={modal.nextOrder}
            onSave={async (data) => { await api.createStep(token, modal.code, modal.itineraryId, data); if (selectedAirport) await selectAirport(selectedAirport) }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'editStep' && (
        <Modal title="Edit Step" onClose={closeModal}>
          <StepForm
            initial={modal.step}
            stepOrder={modal.step.step_order}
            onSave={async (data) => { await api.updateStep(token, modal.code, modal.itineraryId, modal.step.id, data); if (selectedAirport) await selectAirport(selectedAirport) }}
            onClose={closeModal}
          />
        </Modal>
      )}
      {modal?.type === 'editLogistics' && (
        <Modal title="Edit Logistics" onClose={closeModal}>
          <LogisticsForm
            initial={modal.logistics}
            onSave={async (data) => {
              await api.upsertLogistics(token, modal.code, data)
              const updated = await getLogistics(modal.code).catch(() => null)
              setLogistics(updated)
            }}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  )
}

// ---- Page entry point ----

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setToken(sessionStorage.getItem('admin_token'))
    setHydrated(true)
  }, [])

  function handleLogout() {
    sessionStorage.removeItem('admin_token')
    setToken(null)
  }

  if (!hydrated) return null

  if (!token) return <LoginView onLogin={setToken} />
  return <AdminShell token={token} onLogout={handleLogout} />
}
