
import { v4 as uuid } from 'uuid'

export function createNegotiation(store, title='Negotiation') {
  const id = uuid()
  const db = store.read()
  db.sessions[id] = { id, title, logs: [], terms: [] }
  store.write(db)
  return db.sessions[id]
}

export function addMessage(store, sessionId, message) {
  const db = store.read()
  const s = db.sessions[sessionId]
  if (!s) throw new Error('Session not found')
  const entry = {
    ts: Date.now(),
    party: message.party || 'Unknown',
    text: message.text || '',
    offer: message.offer || null
  }
  s.logs.push(entry)

  // Very naive term extraction / update for demo: if offer contains price/laycan, record as terms
  const now = new Date().toISOString()
  if (message.offer?.price) upsertTerm(s, 'Price', message.offer.price, now)
  if (message.offer?.laycan) upsertTerm(s, 'Laycan', message.offer.laycan, now)

  store.write(db)
  return entry
}

export function getLogs(store, sessionId) {
  const db = store.read()
  const s = db.sessions[sessionId]
  if (!s) throw new Error('Session not found')
  return s.logs
}

export function getTerms(store, sessionId) {
  const db = store.read()
  const s = db.sessions[sessionId]
  if (!s) throw new Error('Session not found')
  return s.terms
}

export function finalizeRecap(store, sessionId) {
  const db = store.read()
  const s = db.sessions[sessionId]
  if (!s) throw new Error('Session not found')
  const recap = {
    id: sessionId,
    title: s.title,
    finalizedAt: new Date().toISOString(),
    terms: s.terms,
    logsCount: s.logs.length
  }
  return recap
}

function upsertTerm(session, key, value, now) {
  const idx = session.terms.findIndex(t => t.key === key)
  if (idx >= 0) { session.terms[idx] = { key, value, updatedAt: now } }
  else { session.terms.push({ key, value, updatedAt: now }) }
}
