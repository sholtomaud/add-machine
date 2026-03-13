import { extractCampaignVariables } from "./llm/extraction.js"
import { validateCampaign } from "./engine/validator.js"
import { calculateRevenue } from "./engine/revenue.js"
import { zTest } from "./engine/stats.js"

async function main() {

  const campaignDescription = `
We plan to spend $5000 on social media ads.

Expected CPM $12.

CTR around 3%.

Conversion rate 2%.

Average order value $80.
`

  const vars =
    await extractCampaignVariables(campaignDescription)

  console.log("Extracted variables:")
  console.log(vars)

  validateCampaign(vars)

  const revenue = calculateRevenue(vars)

  console.log("\nRevenue forecast:")
  console.log(revenue)

  const abTest = zTest({
    conversionsA: 120,
    visitorsA: 4000,
    conversionsB: 150,
    visitorsB: 4100
  })

  console.log("\nA/B test result:")
  console.log(abTest)

}

main()
