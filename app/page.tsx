"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [models, setModels] = useState<any[]>([])
  const [model, setModel] = useState("")
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadModels() {
    try {
      const r = await fetch("/api/models")
      const data = await r.json()
      const list = Array.isArray(data?.data) ? data.data : []
      setModels(list)
      if (list.length > 0) setModel(list[0].id)
    } catch (e) {
      console.error(e)
    }
  }

  async function send() {
    setLoading(true)
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: msg }]
        })
      })
      setRes(await r.text())
    } catch (e) {
      console.error(e)
      setRes("Error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadModels() }, [])

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Chat</h1>

      <select value={model} onChange={e => setModel(e.target.value)}>
        {models.map((m, i) => (
          <option key={i} value={m.id}>{m.name}</option>
        ))}
      </select>

      <input
        placeholder="pesan"
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <button onClick={send} disabled={loading}>
        {loading ? "Loading..." : "Kirim"}
      </button>

      <pre>{res}</pre>
    </main>
  )
}
