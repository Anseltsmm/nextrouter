export const metadata = {
  title: "AI Platform",
  description: "Vercel + OpenAI-compatible proxy"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
