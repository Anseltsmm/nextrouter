"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [models, setModels] = useState([])
  const [model, setModel] = useState("")
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState("")

  useEffect(() => {
    fetch("/api/models")
      .then(r => r.json())
      .then(d => {
        const list = d.data || []
        setModels(list)
        if (list.length) setModel(list[0].id)
      })
      .catch(e => console.error(e))
  }, [])

  async function send() {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: msg }]
      })
    })
    setRes(await r.text())
  }

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
      <button onClick={send}>Kirim</button>

      <pre>{res}</pre>
    </main>
  )
}
