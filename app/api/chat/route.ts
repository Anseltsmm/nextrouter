import { PROVIDER_URL, PROVIDER_KEY } from "@/lib/provider"

export async function POST(req: Request) {
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
