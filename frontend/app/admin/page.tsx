'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as adminApi from '@/lib/adminApi'
import type { Airport, Itinerary, ItineraryStep, ItineraryWithSteps, Logistics } from '@/lib/adminApi'
import { listAirports, getLogistics, listItinerariesForAirport, nullStr } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

// ── Form field helpers ────────────────────────────────────────────

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function StyledSelect({
  value, onChange, options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-background">
          {o.label}
        </option>
      ))}
    </select>
  )
}

function StyledTextarea({
  value, onChange, rows = 3, placeholder,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none resize-none"
    />
  )
}

// ── Login ──────────────────────────────────────────────────────────

function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginMutation = useMutation({
    mutationFn: () => adminApi.login(username, password),
    onSuccess: (token) => {
      sessionStorage.setItem('admin_token', token)
      onLogin(token)
    },
    onError: (err: Error) => setError(err.message),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    loginMutation.mutate()
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Layover Admin</h1>
        <Card>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Username">
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </Field>
              <Field label="Password">
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Field>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ── Airport form ───────────────────────────────────────────────────

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
      {!initial && (
        <Field label="IATA Code (e.g. YVR)">
          <Input value={f.id} onChange={(e) => set('id')(e.target.value)} placeholder="YVR" />
        </Field>
      )}
      <Field label="Airport Name">
        <Input value={f.name} onChange={(e) => set('name')(e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="City">
          <Input value={f.city} onChange={(e) => set('city')(e.target.value)} />
        </Field>
        <Field label="Country">
          <Input value={f.country} onChange={(e) => set('country')(e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Coverage">
          <StyledSelect
            value={f.coverage_status}
            onChange={set('coverage_status')}
            options={[
              { value: 'full', label: 'Full Coverage' },
              { value: 'limited', label: 'Limited Data' },
              { value: 'unsupported', label: 'Not Supported' },
            ]}
          />
        </Field>
        <Field label="Customs re-entry (min)">
          <Input
            type="number"
            value={f.customs_reentry_minutes}
            onChange={(e) => set('customs_reentry_minutes')(e.target.value)}
          />
        </Field>
      </div>
      <Field label="Timezone (e.g. America/Vancouver)">
        <Input value={f.timezone} onChange={(e) => set('timezone')(e.target.value)} />
      </Field>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
      </div>
    </form>
  )
}

// ── Itinerary form ─────────────────────────────────────────────────

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
      <Field label="Title">
        <Input value={f.title} onChange={(e) => setF((p) => ({ ...p, title: e.target.value }))} />
      </Field>
      <Field label="Summary">
        <StyledTextarea
          value={f.summary}
          onChange={(v) => setF((p) => ({ ...p, summary: v }))}
          rows={3}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Duration (hours)">
          <Input
            type="number"
            value={f.duration_hours}
            onChange={(e) => setF((p) => ({ ...p, duration_hours: Number(e.target.value) }))}
          />
        </Field>
        <Field label="Min duration (hours)">
          <Input
            type="number"
            value={f.min_duration_hours}
            onChange={(e) => setF((p) => ({ ...p, min_duration_hours: Number(e.target.value) }))}
          />
        </Field>
      </div>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
      </div>
    </form>
  )
}

// ── Step form ──────────────────────────────────────────────────────

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
        <Field label="Step #">
          <Input
            type="number"
            value={f.step_order}
            onChange={(e) => setF((p) => ({ ...p, step_order: Number(e.target.value) }))}
          />
        </Field>
        <Field label="Duration at location (min)">
          <Input
            type="number"
            value={f.duration_minutes}
            onChange={(e) => setF((p) => ({ ...p, duration_minutes: Number(e.target.value) }))}
          />
        </Field>
      </div>
      <Field label="Title">
        <Input value={f.title} onChange={(e) => setF((p) => ({ ...p, title: e.target.value }))} />
      </Field>
      <Field label="Description">
        <StyledTextarea
          value={f.description}
          onChange={(v) => setF((p) => ({ ...p, description: v }))}
          rows={3}
        />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Transit (min)">
          <Input
            type="number"
            value={f.transit_minutes}
            onChange={(e) => setF((p) => ({ ...p, transit_minutes: Number(e.target.value) }))}
          />
        </Field>
        <Field label="Transit method">
          <Input
            value={f.transit_method}
            onChange={(e) => setF((p) => ({ ...p, transit_method: e.target.value }))}
            placeholder="e.g. Metro"
          />
        </Field>
        <Field label="Cost ($)">
          <Input
            value={f.cost}
            onChange={(e) => setF((p) => ({ ...p, cost: e.target.value }))}
            placeholder="e.g. $3"
          />
        </Field>
      </div>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
      </div>
    </form>
  )
}

// ── Logistics form ─────────────────────────────────────────────────

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
      <Field label="Visa & Entry notes">
        <StyledTextarea value={f.visa_notes} onChange={(v) => setF((p) => ({ ...p, visa_notes: v }))} rows={3} />
      </Field>
      <Field label="Bag storage notes">
        <StyledTextarea value={f.bag_storage_notes} onChange={(v) => setF((p) => ({ ...p, bag_storage_notes: v }))} rows={3} />
      </Field>
      <Field label="Re-entry notes">
        <StyledTextarea value={f.reentry_notes} onChange={(v) => setF((p) => ({ ...p, reentry_notes: v }))} rows={3} />
      </Field>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <div className="mt-1 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
      </div>
    </form>
  )
}

// ── Coverage badge ─────────────────────────────────────────────────

function CoverageBadgeAdmin({ status }: { status: string }) {
  const config = {
    full: { label: 'Full', variant: 'default' as const },
    limited: { label: 'Limited', variant: 'secondary' as const },
    unsupported: { label: 'None', variant: 'outline' as const },
  }
  const { label, variant } = config[status as keyof typeof config] ?? config.unsupported
  return <Badge variant={variant}>{label}</Badge>
}

// ── Modal state type ───────────────────────────────────────────────

type ModalState =
  | { type: 'createAirport' }
  | { type: 'editAirport'; airport: Airport }
  | { type: 'createItinerary'; code: string }
  | { type: 'editItinerary'; code: string; itinerary: Itinerary }
  | { type: 'createStep'; code: string; itineraryId: string; nextOrder: number }
  | { type: 'editStep'; code: string; itineraryId: string; step: ItineraryStep }
  | { type: 'editLogistics'; code: string; logistics: Logistics | null }

// ── Admin shell ────────────────────────────────────────────────────

function AdminShell({ token, onLogout }: { token: string; onLogout: () => void }) {
  const qc = useQueryClient()
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [activeTab, setActiveTab] = useState<'itineraries' | 'logistics'>('itineraries')

  // ── Queries ────────────────────────────────────────────────────

  const { data: airports = [], isLoading: airportsLoading, error: airportsError } = useQuery({
    queryKey: ['airports'],
    queryFn: () => listAirports(),
  })

  const selectedAirport = airports.find((a) => a.id === selectedCode) ?? null

  const { data: itineraries = [], isLoading: itinerariesLoading } = useQuery({
    queryKey: ['airport-itineraries', selectedCode],
    queryFn: async () => {
      if (!selectedCode) return []
      const list = await listItinerariesForAirport(selectedCode)
      return Promise.all(
        list.map(async (it) => {
          const res = await fetch(`${API_URL}/airports/${selectedCode}/itineraries/${it.id}`)
          if (!res.ok) return { ...it, steps: [] as ItineraryStep[] }
          return res.json() as Promise<ItineraryWithSteps>
        })
      )
    },
    enabled: !!selectedCode,
  })

  const { data: logistics = null, isLoading: logisticsLoading } = useQuery({
    queryKey: ['airport-logistics', selectedCode],
    queryFn: () => (selectedCode ? getLogistics(selectedCode).catch(() => null) : null),
    enabled: !!selectedCode,
  })

  // ── Mutations ──────────────────────────────────────────────────

  const invalidateAirports = () => qc.invalidateQueries({ queryKey: ['airports'] })
  const invalidateDetail = () => {
    qc.invalidateQueries({ queryKey: ['airport-itineraries', selectedCode] })
    qc.invalidateQueries({ queryKey: ['airport-logistics', selectedCode] })
  }

  const deleteAirportMutation = useMutation({
    mutationFn: (code: string) => adminApi.deleteAirport(token, code),
    onSuccess: (_, code) => {
      if (selectedCode === code) setSelectedCode(null)
      invalidateAirports()
    },
  })

  const deleteItineraryMutation = useMutation({
    mutationFn: ({ code, id }: { code: string; id: string }) =>
      adminApi.deleteItinerary(token, code, id),
    onSuccess: () => invalidateDetail(),
  })

  const deleteStepMutation = useMutation({
    mutationFn: ({ code, itineraryId, stepId }: { code: string; itineraryId: string; stepId: string }) =>
      adminApi.deleteStep(token, code, itineraryId, stepId),
    onSuccess: () => invalidateDetail(),
  })

  function closeModal() { setModal(null) }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {selectedCode && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCode(null)}>
                ← Airports
              </Button>
            )}
            <h1 className="text-sm font-semibold">
              {selectedCode ? (
                <span>
                  <span className="text-muted-foreground">Airports /</span>{' '}
                  {selectedAirport?.city ?? selectedCode} ({selectedCode})
                </span>
              ) : (
                'Layover Admin'
              )}
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>Log out</Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Airport list ─────────────────────────────────────────── */}
        {!selectedCode && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Airports</h2>
              <Button size="sm" onClick={() => setModal({ type: 'createAirport' })}>
                + Add airport
              </Button>
            </div>

            {airportsLoading ? (
              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : airportsError ? (
              <p className="text-sm text-destructive">Failed to load airports.</p>
            ) : airports.length === 0 ? (
              <p className="text-sm text-muted-foreground">No airports yet.</p>
            ) : (
              <Card className="p-0 overflow-hidden gap-0 py-0">
                {airports.map((a, i) => (
                  <div
                    key={a.id}
                    className={`flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors ${i !== 0 ? 'border-t border-border' : ''}`}
                  >
                    <button
                      className="flex items-center gap-3 text-left"
                      onClick={() => setSelectedCode(a.id)}
                    >
                      <span className="rounded-lg bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary">
                        {a.id}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.city}, {a.country}</p>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <CoverageBadgeAdmin status={a.coverage_status} />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setModal({ type: 'editAirport', airport: a })}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deleteAirportMutation.isPending}
                        onClick={() => {
                          if (confirm(`Delete airport ${a.id}? This cannot be undone.`)) {
                            deleteAirportMutation.mutate(a.id)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        )}

        {/* Airport detail ───────────────────────────────────────── */}
        {selectedCode && (
          <div>
            {/* Tabs */}
            <div className="mb-6 flex gap-1 border-b border-border pb-1">
              {(['itineraries', 'logistics'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
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
                  <h2 className="text-base font-semibold">Itineraries</h2>
                  <Button
                    size="sm"
                    onClick={() => setModal({ type: 'createItinerary', code: selectedCode })}
                  >
                    + Add itinerary
                  </Button>
                </div>

                {itinerariesLoading ? (
                  <div className="flex flex-col gap-3">
                    {[...Array(2)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
                  </div>
                ) : itineraries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No itineraries yet.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {itineraries.map((it) => (
                      <Card key={it.id} className="py-0 gap-0">
                        <CardHeader className="border-b border-border py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <CardTitle>{it.title}</CardTitle>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {it.duration_hours}h · min {it.min_duration_hours}h
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">{it.summary}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  setModal({ type: 'editItinerary', code: selectedCode, itinerary: it })
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={deleteItineraryMutation.isPending}
                                onClick={() => {
                                  if (confirm('Delete this itinerary and all its steps?')) {
                                    deleteItineraryMutation.mutate({ code: selectedCode, id: it.id })
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="py-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Steps ({it.steps?.length ?? 0})
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setModal({
                                  type: 'createStep',
                                  code: selectedCode,
                                  itineraryId: it.id,
                                  nextOrder: (it.steps?.length ?? 0) + 1,
                                })
                              }
                            >
                              + Step
                            </Button>
                          </div>
                          {it.steps?.length > 0 && (
                            <div className="flex flex-col gap-2">
                              {it.steps.map((step) => (
                                <div
                                  key={step.id}
                                  className="flex items-start justify-between gap-3 rounded-lg bg-muted/30 px-3 py-2.5"
                                >
                                  <div className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                                      {step.step_order}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium">{step.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {step.duration_minutes}min
                                        {step.transit_minutes > 0 && ` · ${step.transit_minutes}min transit`}
                                        {nullStr(step.transit_method) && ` · ${nullStr(step.transit_method)}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex shrink-0 gap-1.5">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        setModal({
                                          type: 'editStep',
                                          code: selectedCode,
                                          itineraryId: it.id,
                                          step,
                                        })
                                      }
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      disabled={deleteStepMutation.isPending}
                                      onClick={() => {
                                        if (confirm('Delete this step?')) {
                                          deleteStepMutation.mutate({
                                            code: selectedCode,
                                            itineraryId: it.id,
                                            stepId: step.id,
                                          })
                                        }
                                      }}
                                    >
                                      ✕
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
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
                  <h2 className="text-base font-semibold">Logistics</h2>
                  <Button
                    size="sm"
                    onClick={() =>
                      setModal({ type: 'editLogistics', code: selectedCode, logistics: logistics ?? null })
                    }
                  >
                    {logistics ? 'Edit' : '+ Add logistics'}
                  </Button>
                </div>

                {logisticsLoading ? (
                  <Skeleton className="h-40 w-full rounded-xl" />
                ) : logistics ? (
                  <Card>
                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {[
                          { label: 'Visa & Entry', val: nullStr(logistics.visa_notes) },
                          { label: 'Bag Storage', val: nullStr(logistics.bag_storage_notes) },
                          { label: 'Re-entry', val: nullStr(logistics.reentry_notes) },
                        ].map((s) => (
                          <div key={s.label}>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {s.label}
                            </p>
                            <p className="text-sm">
                              {s.val || <em className="text-muted-foreground">Not set</em>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <p className="text-sm text-muted-foreground">No logistics data yet.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals ─────────────────────────────────────────────────── */}

      <Dialog open={modal?.type === 'createAirport'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Add Airport</DialogTitle></DialogHeader>
          <AirportForm
            onSave={async (data) => {
              await adminApi.createAirport(token, data)
              await qc.invalidateQueries({ queryKey: ['airports'] })
            }}
            onClose={closeModal}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'editAirport'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Airport</DialogTitle></DialogHeader>
          {modal?.type === 'editAirport' && (
            <AirportForm
              initial={modal.airport}
              onSave={async (data) => {
                await adminApi.updateAirport(token, modal.airport.id, data)
                await qc.invalidateQueries({ queryKey: ['airports'] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'createItinerary'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Add Itinerary</DialogTitle></DialogHeader>
          {modal?.type === 'createItinerary' && (
            <ItineraryForm
              onSave={async (data) => {
                await adminApi.createItinerary(token, modal.code, data)
                await qc.invalidateQueries({ queryKey: ['airport-itineraries', selectedCode] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'editItinerary'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Itinerary</DialogTitle></DialogHeader>
          {modal?.type === 'editItinerary' && (
            <ItineraryForm
              initial={modal.itinerary}
              onSave={async (data) => {
                await adminApi.updateItinerary(token, modal.code, modal.itinerary.id, data)
                await qc.invalidateQueries({ queryKey: ['airport-itineraries', selectedCode] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'createStep'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Add Step</DialogTitle></DialogHeader>
          {modal?.type === 'createStep' && (
            <StepForm
              stepOrder={modal.nextOrder}
              onSave={async (data) => {
                await adminApi.createStep(token, modal.code, modal.itineraryId, data)
                await qc.invalidateQueries({ queryKey: ['airport-itineraries', selectedCode] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'editStep'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Step</DialogTitle></DialogHeader>
          {modal?.type === 'editStep' && (
            <StepForm
              initial={modal.step}
              stepOrder={modal.step.step_order}
              onSave={async (data) => {
                await adminApi.updateStep(token, modal.code, modal.itineraryId, modal.step.id, data)
                await qc.invalidateQueries({ queryKey: ['airport-itineraries', selectedCode] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modal?.type === 'editLogistics'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Logistics</DialogTitle></DialogHeader>
          {modal?.type === 'editLogistics' && (
            <LogisticsForm
              initial={modal.logistics}
              onSave={async (data) => {
                await adminApi.upsertLogistics(token, modal.code, data)
                await qc.invalidateQueries({ queryKey: ['airport-logistics', selectedCode] })
              }}
              onClose={closeModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── Page entry point ───────────────────────────────────────────────

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
