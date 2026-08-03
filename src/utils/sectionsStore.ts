import api from '@/services/ApiService'

const MEM_TTL_MS = 5 * 60 * 1000    // 5 min in-memory
const LOC_TTL_MS = 60 * 60 * 1000   // 1 hour localStorage (survives browser restarts)
const LOC_KEY = 'mg_sections_v2'

// ── localStorage helpers ──────────────────────────────────────────────────────

const readLocal = (): unknown[] | null => {
  try {
    const raw = localStorage.getItem(LOC_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: unknown[]; ts: number }
    if (Date.now() - parsed.ts > LOC_TTL_MS) {
      localStorage.removeItem(LOC_KEY)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

const writeLocal = (data: unknown[]): void => {
  try {
    localStorage.setItem(LOC_KEY, JSON.stringify({ data, ts: Date.now() }))
  } catch {
    // Quota exceeded or private browsing — silently skip
  }
}

// ── in-memory state ───────────────────────────────────────────────────────────

let memCache: { data: unknown[]; ts: number } | null = null
let inFlight: Promise<unknown[]> | null = null

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Returns all home sections.
 * Priority: memory cache → sessionStorage → network (deduplicated in-flight).
 */
export const getSections = (): Promise<unknown[]> => {
  // 1. Memory cache (fastest — same-tab navigation)
  if (memCache && Date.now() - memCache.ts < MEM_TTL_MS) {
    return Promise.resolve(memCache.data)
  }

  // 2. localStorage (survives browser restarts within 1 hour)
  const local = readLocal()
  if (local) {
    memCache = { data: local, ts: Date.now() }
    return Promise.resolve(local)
  }

  // 3. Deduplicate: if a request is already in-flight, share it
  if (inFlight) return inFlight

  // 4. Fetch from network
  inFlight = api
    .getHomeSections()
    .then((response) => {
      const data: unknown[] = Array.isArray(response.data?.data) ? response.data.data : []
      memCache = { data, ts: Date.now() }
      writeLocal(data)
      inFlight = null
      return data
    })
    .catch((err) => {
      inFlight = null
      throw err
    })

  return inFlight
}

export const invalidateSections = (): void => {
  memCache = null
  inFlight = null
  try { localStorage.removeItem(LOC_KEY) } catch { /* ignore */ }
}
