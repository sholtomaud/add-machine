import { interpretRevenue } from "./llm/interpretation.js"
import { verifyLLMNumbers } from "./engine/verify.js"

const deterministic = {
  impressions: 416666,
  clicks: 12500,
  conversions: 250,
  revenue: 20000
}

const interpretation = await interpretRevenue(
  deterministic,
  vars
)

const valid = verifyLLMNumbers(
  deterministic,
  interpretation
)

if (!valid) {

  throw new Error(
    "LLM failed numeric grounding check"
  )

}

console.log("Verified interpretation:")
console.log(interpretation)
