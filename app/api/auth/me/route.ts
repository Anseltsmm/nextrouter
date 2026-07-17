// app/api/auth/me/route.ts
import { verifyToken } from "@/lib/jwt"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  const token = auth?.split(" ")[1]
  const user = verifyToken(token)

  if (!user) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  return Response.json({ user })
}
