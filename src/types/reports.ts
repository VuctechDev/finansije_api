export type PostReportItem = Omit<ReportItem, 'id' | 'creation'>

export interface ReportItem {
  id: number
  month: string
  year: number
  sallaryS: number
  sallaryB: number
  restIncomeS: number
  restIncomeB: number
  percentageS: number
  percentageB: number
  commonCostS: number
  commonCostB: number
  individualCostS: number
  individualCostB: number
  savingsS: number
  savingsB: number
  comptPaymentS: number
  comptPaymentB: number
  monthTotalS: number
  monthTotalB: number
  prevDeptS: number
  prevDeptB: number
  payedS: number
  payedB: number
  restS: number
  restB: number
  creation: string
}

export interface ReportReq {
  body: {
    payedS: number
    payedB: number
    reportId: number
    month: string
    year: number
  }
}
