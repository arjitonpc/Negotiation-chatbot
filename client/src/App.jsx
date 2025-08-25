
import React, { useEffect, useState } from 'react'
import ChatWindow from './components/ChatWindow.jsx'
import OfferForm from './components/OfferForm.jsx'
import TermsTable from './components/TermsTable.jsx'
import { api } from './services/api.js'

export default function App() {
  const [session, setSession] = useState(null)
  const [terms, setTerms] = useState([])

  useEffect(() => {
    async function boot() {
      const s = await api.startNegotiation({ title: 'Fixture Room Demo' })
      setSession(s)
    }
    boot()
  }, [])

  useEffect(() => {
    if (!session) return
    const unsub = api.subscribeTerms(session.id, (t) => setTerms(t))
    return () => unsub && unsub()
  }, [session])

  if (!session) return <div className="p-6">Starting…</div>

  return (
    <div className="h-full grid grid-rows-[auto,1fr]">
      <header className="p-4 bg-white shadow flex items-center justify-between">
        <h1 className="text-xl font-semibold">Digital Fixture Room</h1>
        <div className="text-sm text-gray-600">Session: {session.id}</div>
      </header>

      <main className="grid grid-cols-3 gap-4 p-4">
        <section className="col-span-2">
          <ChatWindow sessionId={session.id} />
          <OfferForm sessionId={session.id} />
        </section>
        <aside className="col-span-1">
          <TermsTable terms={terms} />
        </aside>
      </main>
    </div>
  )
}
