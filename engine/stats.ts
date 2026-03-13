export interface ABTestInput {

  conversionsA: number
  visitorsA: number

  conversionsB: number
  visitorsB: number

}

export interface ABTestResult {

  z: number
  pValue: number

}

export function zTest(input: ABTestInput): ABTestResult {

  const p1 = input.conversionsA / input.visitorsA
  const p2 = input.conversionsB / input.visitorsB

  const p =
    (input.conversionsA + input.conversionsB) /
    (input.visitorsA + input.visitorsB)

  const se = Math.sqrt(
    p * (1 - p) *
    (1 / input.visitorsA + 1 / input.visitorsB)
  )

  const z = (p1 - p2) / se

  const pValue =
    2 * (1 - normalCDF(Math.abs(z)))

  return { z, pValue }

}

function normalCDF(x: number): number {

  return (1 + erf(x / Math.sqrt(2))) / 2

}

function erf(x: number): number {

  const sign = x >= 0 ? 1 : -1
  x = Math.abs(x)

  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const t = 1 / (1 + p * x)

  const y =
    1 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-x * x)

  return sign * y

}
