"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [models, setModels] = useState([])
  const [model, setModel] = useState("")
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState("")

  async function loadModels() {
    const r = await fetch("/api/models")
    const data = await r.json()
    setModels(data.data)
    if (data.data.length > 0) setModel(data.data[0].id)
  }

  async function send() {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: msg }]
      })
    })
    const data = await r.json()
    setRes(JSON.stringify(data))
  }

  useEffect(() => { loadModels() }, [])

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Chat</h1>

      <select value={model} onChange={e => setModel(e.target.value)}>
        {models.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <input
        placeholder="pesan"
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <button onClick={send}>Kirim</button>

      <pre>{res}</pre>
    </main>
  )
}
