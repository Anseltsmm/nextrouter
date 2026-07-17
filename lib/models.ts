export type AIModel = {
  id: string
  name: string
}

export const MODELS: AIModel[] = [
  { id: "tencent-hy3", name: "Tencent-hy3" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-3-opus", name: "Claude 3 Opus" }
]
