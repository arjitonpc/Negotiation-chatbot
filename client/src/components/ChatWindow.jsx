
import React, { useEffect, useRef, useState } from 'react'
import { api } from '../services/api.js'

export default function ChatWindow({ sessionId }) {
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    api.fetchLogs(sessionId).then(setMessages)
    const unsub = api.subscribeMessages(sessionId, (msg) => {
      setMessages((m) => [...m, msg])
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    })
    return () => unsub && unsub()
  }, [sessionId])

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-[60vh] overflow-y-auto space-y-2 mb-4">
      {messages.map((m, idx) => (
        <div key={idx} className="text-sm">
          <span className="font-semibold">{m.party}:</span> {m.text}
          {m.offer && <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">offer</span>}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
