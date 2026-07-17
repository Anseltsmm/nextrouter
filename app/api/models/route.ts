// app/api/models/route.ts
import { PROVIDER_URL, PROVIDER_KEY } from "@/lib/provider"

export async function GET() {
  const res = await fetch(`${PROVIDER_URL}/models`, {
    headers: {
      Authorization: `Bearer ${PROVIDER_KEY}`
    }
  })

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" }
  })
}
