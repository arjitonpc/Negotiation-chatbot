
import React, { useState } from 'react'
import { api } from '../services/api.js'

export default function OfferForm({ sessionId }) {
  const [party, setParty] = useState('Charterer')
  const [text, setText] = useState('')
  const [price, setPrice] = useState('')
  const [laycan, setLaycan] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await api.sendMessage(sessionId, {
      party, text, offer: { price, laycan }
    })
    setText(''); setPrice(''); setLaycan('')
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-4 flex gap-3 items-end">
      <div>
        <label className="text-xs text-gray-600">Party</label>
        <select className="border rounded px-2 py-1" value={party} onChange={e=>setParty(e.target.value)}>
          <option>Charterer</option>
          <option>Owner</option>
          <option>Broker</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="text-xs text-gray-600">Message</label>
        <input className="border rounded px-3 py-2 w-full" value={text} onChange={e=>setText(e.target.value)} placeholder="Firm / counter terms…" />
      </div>
      <div>
        <label className="text-xs text-gray-600">Price (USD)</label>
        <input className="border rounded px-2 py-2 w-36" value={price} onChange={e=>setPrice(e.target.value)} />
      </div>
      <div>
        <label className="text-xs text-gray-600">Laycan</label>
        <input className="border rounded px-2 py-2 w-36" value={laycan} onChange={e=>setLaycan(e.target.value)} placeholder="YYYY-MM-DD" />
      </div>
      <button className="bg-black text-white rounded-xl px-4 py-2" type="submit">Send</button>
    </form>
  )
}
