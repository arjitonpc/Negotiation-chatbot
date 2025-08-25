
import React from 'react'

export default function TermsTable({ terms }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-2">Agreed Terms</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-1">Clause</th>
            <th className="py-1">Value</th>
            <th className="py-1">Updated</th>
          </tr>
        </thead>
        <tbody>
          {terms.length === 0 && (
            <tr><td colSpan="3" className="text-gray-400 py-2">No terms agreed yet.</td></tr>
          )}
          {terms.map((t, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-1">{t.key}</td>
              <td className="py-1">{t.value}</td>
              <td className="py-1">{new Date(t.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
