"use client"

import { useEffect, useState } from "react"
import type { AIModel } from "@/lib/models"

export default function Home() {
  const [models, setModels] = useState<AIModel[]>([])
  const [model, setModel] = useState("")
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState("")
  const [loading, setLoading] = useState(false)

  async function loadModels() {
    try {
      const r = await fetch("/api/models")
      const data = await r.json()
      const list: AIModel[] = Array.isArray(data?.data) ? data.data : []
      setModels(list)
      if (list.length > 0) setModel(list[0].id)
    } catch (e) {
      console.error("loadModels error", e)
    }
  }

  async function send() {
    setLoading(true)
    setRes("")
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: msg }]
        })
      })
      const text = await r.text()
      setRes(text)
    } catch (e) {
      console.error("send error", e)
      setRes("Error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Chat</h1>

      <select
        value={model}
        onChange={e => setModel(e.target.value)}
      >
        {models.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
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
