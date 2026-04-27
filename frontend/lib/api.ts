const API_URL = process.env.API_URL ?? 'http://localhost:8080'

export type Airport = {
  id: string
  name: string
  city: string
  country: string
  coverage_status: 'full' | 'limited' | 'unsupported'
  customs_reentry_minutes: number
  timezone: string
}

type NullString = { String: string; Valid: boolean } | null

export type ItineraryStep = {
  id: string
  itinerary_id: string
  step_order: number
  title: string
  description: string
  duration_minutes: number
  transit_minutes: number
  transit_method: NullString
  cost: NullString
}

export type Itinerary = {
  id: string
  airport_id: string
  duration_hours: number
  title: string
  summary: string
  min_duration_hours: number
  Steps: ItineraryStep[]
}

export type Logistics = {
  id: string
  airport_id: string
  visa_notes: NullString
  bag_storage_notes: NullString
  reentry_notes: NullString
  last_updated: string
}

export async function listAirports(): Promise<Airport[]> {
  const res = await fetch(`${API_URL}/airports`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export async function getAirport(code: string): Promise<Airport | null> {
  const res = await fetch(`${API_URL}/airports/${code}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export async function getItinerary(code: string, duration: string): Promise<Itinerary | null> {
  const res = await fetch(
    `${API_URL}/airports/${code}/itineraries?duration=${duration}`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  const itineraries: Itinerary[] = data.itineraries ?? []
  if (itineraries.length === 0) return null

  const full = await fetch(
    `${API_URL}/airports/${code}/itineraries/${itineraries[0].id}`,
    { cache: 'no-store' }
  )
  if (!full.ok) return null
  return full.json()
}

export async function getLogistics(code: string): Promise<Logistics | null> {
  const res = await fetch(`${API_URL}/airports/${code}/logistics`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export function nullStr(n: NullString): string {
  return n?.Valid ? n.String : ''
}
