import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "secret_dev"

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token?: string) {
  if (!token) return null
  try {
    return jwt.verify(token, SECRET) as any
  } catch {
    return null
  }
}
