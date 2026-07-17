// app/api/auth/login/route.ts
import { signToken } from "@/lib/jwt"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  // contoh hardcoded (nanti ganti DB)
  if (username === "admin" && password === "admin") {
    const token = signToken({ id: 1, username })
    return Response.json({ token })
  }

  return Response.json({ error: "unauthorized" }, { status: 401 })
}
