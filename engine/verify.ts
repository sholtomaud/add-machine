import type { InterpretedRevenue } from "../llm/interpretation-schema.js"

export function computeChecksum(det: any): number {

  return (
    det.impressions +
    det.clicks +
    det.conversions +
    det.revenue
  )

}

export function verifyLLMNumbers(
  deterministic: any,
  llm: InterpretedRevenue
): boolean {

  const numbersMatch =
    deterministic.impressions === llm.impressions &&
    deterministic.clicks === llm.clicks &&
    deterministic.conversions === llm.conversions &&
    deterministic.revenue === llm.revenue

  const expectedChecksum =
    computeChecksum(deterministic)

  const checksumValid =
    llm.checksum === expectedChecksum

  return numbersMatch && checksumValid

}
