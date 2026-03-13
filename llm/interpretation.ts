import { callModel } from "./client.js"
import type { InterpretedRevenue } from "./interpretation-schema.js"

export async function interpretRevenue(
  deterministic: object,
  campaignVars: object
): Promise<InterpretedRevenue> {

  const systemPrompt = `
You are a marketing analytics assistant.

You MUST follow these rules:

1. Reproduce ALL numeric values exactly as provided.
2. Do NOT recompute numbers.
3. Do NOT round numbers.
4. Copy the numbers verbatim into the JSON output.

Your response MUST be valid JSON.

Output schema:

{
  "impressions": number,
  "clicks": number,
  "conversions": number,
  "revenue": number,
  "interpretation": string
}

If the numbers you produce differ from the provided values,
your answer will be rejected.

The purpose of this system is to ensure the language explanation
is grounded in the deterministic results.
`

  const userPrompt = `
Campaign variables:

${JSON.stringify(campaignVars, null, 2)}

Deterministic revenue model output:

${JSON.stringify(deterministic, null, 2)}

Explain the meaning of these results.
`

  const response = await callModel([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ])

  return JSON.parse(response)

}
