import { callModel } from "./client.js"
import type { InterpretedRevenue } from "./interpretation-schema.js"

export async function interpretRevenue(
  deterministic: object,
  campaignVars: object
): Promise<InterpretedRevenue> {

  const systemPrompt = `
You are a marketing analytics assistant.

STRICT RULES:

1. You MUST reproduce the numeric values exactly.
2. Do NOT recompute or approximate numbers.
3. Copy the numbers verbatim.
4. Compute the checksum:

checksum = impressions + clicks + conversions + revenue

5. Output VALID JSON ONLY.

Schema:

{
  "impressions": number,
  "clicks": number,
  "conversions": number,
  "revenue": number,
  "checksum": number,
  "interpretation": string
}

If any number differs from the deterministic input,
the response will be rejected.
`

  const userPrompt = `
Campaign variables:

${JSON.stringify(campaignVars, null, 2)}

Deterministic model output:

${JSON.stringify(deterministic, null, 2)}

Explain these results.
`

  const response = await callModel([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ])

  return JSON.parse(response)

}
