"use client"

import { useState } from "react"

export default function Home() {
  const [msg, setMsg] = useState("")
  const [res, setRes] = useState("")

  async function send() {
    const r = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt",
        messages: [{ role: "user", content: msg }]
      })
    })
    const data = await r.json()
    setRes(JSON.stringify(data))
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Chat</h1>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Kirim</button>
      <pre>{res}</pre>
    </main>
  )
}
