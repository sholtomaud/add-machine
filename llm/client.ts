export interface ChatMessage {

  role: "system" | "user" | "assistant"
  content: string

}

const MODEL_URL =
  process.env.MODEL_URL ??
  "http://localhost:8080/v1/chat/completions"

export async function callModel(
  messages: ChatMessage[]
): Promise<string> {

  const res = await fetch(MODEL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "llama",
      messages,
      temperature: 0
    })
  })

  const json = await res.json()

  return json.choices[0].message.content

}
