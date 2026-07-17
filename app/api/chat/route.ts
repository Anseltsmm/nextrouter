// app/api/chat/route.ts
import { PROVIDER_URL, PROVIDER_KEY } from "@/lib/provider"
import { verifyToken } from "@/lib/jwt"

export async function POST(req: Request) {
  const auth = req.headers.get("authorization")
  const token = auth?.split(" ")[1]

  if (!verifyToken(token)) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const res = await fetch(`${PROVIDER_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PROVIDER_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  })
}
