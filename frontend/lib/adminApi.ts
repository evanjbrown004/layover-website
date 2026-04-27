import type { Airport, Itinerary, ItineraryWithSteps, ItineraryStep, Logistics } from './api'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export type { Airport, Itinerary, ItineraryWithSteps, ItineraryStep, Logistics }

function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

async function req<T>(
  token: string,
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(token),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (res.status === 204) return undefined as T
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? 'Request failed')
  return data
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? 'Invalid credentials')
  return data.token
}

// Airports
export const createAirport = (token: string, body: Omit<Airport, never>) =>
  req<Airport>(token, 'POST', '/admin/airports', body)

export const updateAirport = (token: string, code: string, body: Omit<Airport, 'id'>) =>
  req<Airport>(token, 'PUT', `/admin/airports/${code}`, body)

export const deleteAirport = (token: string, code: string) =>
  req<void>(token, 'DELETE', `/admin/airports/${code}`)

// Itineraries
export const createItinerary = (
  token: string,
  code: string,
  body: Omit<Itinerary, 'id' | 'airport_id'>
) => req<ItineraryWithSteps>(token, 'POST', `/admin/airports/${code}/itineraries`, body)

export const updateItinerary = (
  token: string,
  code: string,
  id: string,
  body: Omit<Itinerary, 'id' | 'airport_id'>
) => req<ItineraryWithSteps>(token, 'PUT', `/admin/airports/${code}/itineraries/${id}`, body)

export const deleteItinerary = (token: string, code: string, id: string) =>
  req<void>(token, 'DELETE', `/admin/airports/${code}/itineraries/${id}`)

// Steps
export const createStep = (
  token: string,
  code: string,
  itineraryId: string,
  body: Omit<ItineraryStep, 'id' | 'itinerary_id'>
) => req<ItineraryWithSteps>(token, 'POST', `/admin/airports/${code}/itineraries/${itineraryId}/steps`, body)

export const updateStep = (
  token: string,
  code: string,
  itineraryId: string,
  stepId: string,
  body: Omit<ItineraryStep, 'id' | 'itinerary_id'>
) =>
  req<ItineraryWithSteps>(
    token, 'PUT',
    `/admin/airports/${code}/itineraries/${itineraryId}/steps/${stepId}`,
    body
  )

export const deleteStep = (token: string, code: string, itineraryId: string, stepId: string) =>
  req<void>(token, 'DELETE', `/admin/airports/${code}/itineraries/${itineraryId}/steps/${stepId}`)

// Logistics
export const upsertLogistics = (
  token: string,
  code: string,
  body: { visa_notes?: string; bag_storage_notes?: string; reentry_notes?: string }
) => req<Logistics>(token, 'PUT', `/admin/airports/${code}/logistics`, body)
