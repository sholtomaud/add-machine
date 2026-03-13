import { interpretRevenue } from "./llm/interpretation.js"
import { verifyLLMNumbers } from "./engine/verify.js"

async function interpretWithRetry(
  deterministic: any,
  vars: any,
  maxRetries = 3
) {

  for (let attempt = 1; attempt <= maxRetries; attempt++) {

    const result =
      await interpretRevenue(deterministic, vars)

    const valid =
      verifyLLMNumbers(deterministic, result)

    if (valid) {

      console.log(
        `LLM interpretation validated (attempt ${attempt})`
      )

      return result

    }

    console.warn(
      `Validation failed (attempt ${attempt})`
    )

  }

  throw new Error(
    "LLM failed numeric grounding after retries"
  )

}
