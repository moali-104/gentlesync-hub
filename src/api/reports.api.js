import { reportsOverview as reportsSeed, retestOverview as retestSeed } from '../features/dashboard/portalArabicData'

const wait = (value, delay = 250) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay)
  })

export function getReportsOverview() {
  return wait(structuredClone(reportsSeed))
}

export function getRetestOverview() {
  return wait(structuredClone(retestSeed))
}

export function exportReportsPdf() {
  return wait({ success: true, fileName: 'auticare-report.pdf' }, 400)
}
