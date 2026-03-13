import { callModel } from "./client.js"

export interface InterpretationInput {

  campaign: object
  revenue: object
  stats: object

}

export async function interpretResults(
  input: InterpretationInput
): Promise<string> {

  const prompt = `
You are a marketing analytics expert.

Interpret the results of a deterministic ad campaign model.

Campaign variables:
${JSON.stringify(input.campaign, null, 2)}

Revenue forecast:
${JSON.stringify(input.revenue, null, 2)}

A/B test statistics:
${JSON.stringify(input.stats, null, 2)}

Tasks:

1. Explain what these numbers mean.
2. Interpret whether the campaign is profitable.
3. Interpret whether the A/B test is statistically significant.
4. Suggest strategic actions.

Write a concise analysis.
`

  return await callModel([
    { role: "system", content: "You are a marketing analytics expert." },
    { role: "user", content: prompt }
  ])

}
