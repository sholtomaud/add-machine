import type { InterpretedRevenue } from "../llm/interpretation-schema.js"

export function verifyLLMNumbers(
  deterministic: any,
  llm: InterpretedRevenue
): boolean {

  return (
    deterministic.impressions === llm.impressions &&
    deterministic.clicks === llm.clicks &&
    deterministic.conversions === llm.conversions &&
    deterministic.revenue === llm.revenue
  )

}
