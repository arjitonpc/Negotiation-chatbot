
import { Router } from 'express'
import { createNegotiation, addMessage, getLogs, getTerms, finalizeRecap } from '../services/negotiationService.js'

export const NegotiationAPI = ({ store, io }) => {
  const r = Router()

  r.post('/start', (req, res) => {
    const session = createNegotiation(store, req.body?.title)
    res.json(session)
  })

  r.post('/message', (req, res) => {
    const { sessionId, ...message } = req.body || {}
    try {
      const entry = addMessage(store, sessionId, message)
      io.emit(`neg-${sessionId}`, entry)
      io.emit(`terms-${sessionId}`, getTerms(store, sessionId))
      res.json({ ok: true, entry })
    } catch (e) {
      res.status(404).json({ error: e.message })
    }
  })

  r.get('/:id/logs', (req, res) => {
    try { res.json(getLogs(store, req.params.id)) }
    catch (e) { res.status(404).json({ error: e.message }) }
  })

  r.get('/:id/terms', (req, res) => {
    try { res.json(getTerms(store, req.params.id)) }
    catch (e) { res.status(404).json({ error: e.message }) }
  })

  r.post('/:id/finalize', (req, res) => {
    try { res.json(finalizeRecap(store, req.params.id)) }
    catch (e) { res.status(404).json({ error: e.message }) }
  })

  return r
}
