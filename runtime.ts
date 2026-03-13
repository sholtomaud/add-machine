import { extractCampaignVariables } from "./llm/extraction.js"
import { validateCampaign } from "./engine/validator.js"
import { calculateRevenue } from "./engine/revenue.js"
import { zTest } from "./engine/stats.js"
import { interpretResults } from "./llm/interpretation.js"

async function main() {

  const campaignDescription = `
We plan to spend $5000 on social media ads.
Expected CPM $12.
CTR around 3%.
Conversion rate 2%.
Average order value $80.
`

  const vars = await extractCampaignVariables(campaignDescription)

  validateCampaign(vars)

  const revenue = calculateRevenue(vars)

  const abTest = zTest({
    conversionsA: 120,
    visitorsA: 4000,
    conversionsB: 150,
    visitorsB: 4100
  })

  console.log("Extracted variables")
  console.log(vars)

  console.log("\nRevenue forecast")
  console.log(revenue)

  console.log("\nA/B test result")
  console.log(abTest)

  const interpretation =
    await interpretResults({
      campaign: vars,
      revenue,
      stats: abTest
    })

  console.log("\nLLM Interpretation\n")
  console.log(interpretation)

}

main()
