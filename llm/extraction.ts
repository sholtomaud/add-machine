import { callModel } from "./client.js"
import type { CampaignVariables } from "../engine/schema.js"

export async function extractCampaignVariables(
  text: string
): Promise<CampaignVariables> {

  const prompt = `
Extract campaign variables.

Return JSON ONLY.

Fields:
spend
cpm
ctr
cvr
aov

Example output:
{
 "spend":5000,
 "cpm":12,
 "ctr":0.03,
 "cvr":0.02,
 "aov":80
}

Text:
${text}
`

  const response = await callModel([
    { role: "user", content: prompt }
  ])

  return JSON.parse(response)

}
