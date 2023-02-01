
import { createChartImage } from './services/chart.service'
import { sendDailyDigest } from './services/email.service'

async function main(): Promise<void> {
  await createChartImage()
  sendDailyDigest()
}

main()
