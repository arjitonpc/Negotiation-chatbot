
import { io } from 'socket.io-client'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const socket = io(API_BASE, { autoConnect: true })

export const api = {
  async startNegotiation(payload) {
    const r = await fetch(`${API_BASE}/negotiation/start`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    return r.json()
  },
  async sendMessage(sessionId, message) {
    const r = await fetch(`${API_BASE}/negotiation/message`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, ...message })
    })
    return r.json()
  },
  async fetchLogs(sessionId) {
    const r = await fetch(`${API_BASE}/negotiation/${sessionId}/logs`)
    return r.json()
  },
  subscribeMessages(sessionId, cb) {
    const room = `neg-${sessionId}`
    const handler = (msg) => cb(msg)
    socket.on(room, handler)
    return () => socket.off(room, handler)
  },
  async fetchTerms(sessionId) {
    const r = await fetch(`${API_BASE}/negotiation/${sessionId}/terms`)
    return r.json()
  },
  subscribeTerms(sessionId, cb) {
    const room = `terms-${sessionId}`
    const handler = (terms) => cb(terms)
    socket.on(room, handler)
    // also fetch once
    this.fetchTerms(sessionId).then(cb)
    return () => socket.off(room, handler)
  }
}
