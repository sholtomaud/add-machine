import type { CampaignVariables } from "./schema.js"

export function validateCampaign(
  vars: CampaignVariables
): void {

  if (vars.ctr < 0 || vars.ctr > 1)
    throw new Error("CTR must be between 0 and 1")

  if (vars.cvr < 0 || vars.cvr > 1)
    throw new Error("CVR must be between 0 and 1")

  if (vars.spend <= 0)
    throw new Error("Spend must be positive")

  if (vars.cpm <= 0)
    throw new Error("CPM must be positive")

  if (vars.aov <= 0)
    throw new Error("AOV must be positive")

}
