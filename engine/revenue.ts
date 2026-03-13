export function calculateRevenue({
  spend,
  cpm,
  ctr,
  cvr,
  aov
}) {

  if (ctr < 0 || ctr > 1) throw new Error("CTR must be 0-1")
  if (cvr < 0 || cvr > 1) throw new Error("CVR must be 0-1")

  const impressions = (spend / cpm) * 1000
  const clicks = impressions * ctr
  const conversions = clicks * cvr

  const revenue = conversions * aov

  return {
    impressions,
    clicks,
    conversions,
    revenue
  }
}
