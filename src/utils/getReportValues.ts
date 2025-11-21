import { CostItem } from '../types/costs'
import { MainData } from '../types/data'
import { PostReportItem, ReportReq } from '../types/reports'
import { PaymentItem } from '../types/payments'
import { getPercentage, getSavings, getTotal } from './getActiveMonthStats'

export const getReportData = (
  req: ReportReq,
  data: MainData,
  costs: CostItem[],
  payments: PaymentItem[]
): PostReportItem => {
  const { payedS, payedB, month, year } = req.body
  const {
    savings,
    deptStefan,
    deptBranka,
    sallaryStefan,
    sallaryBranka,
    restStefan,
    restBranka,
  } = data

  const totalIncome = sallaryStefan + restStefan + sallaryBranka + restBranka

  const { percentageStefan, percentageBranka } = getPercentage(data)
  const commonCostsTotal = getTotal(costs, 100)

  const commonCostS = (commonCostsTotal * percentageStefan) / 100
  const commonCostB = (commonCostsTotal * percentageBranka) / 100
  const individualCostS = getTotal(costs, 101)
  const individualCostB = getTotal(costs, 102)
  const savingsS = +getSavings(savings, totalIncome, percentageStefan)
  const savingsB = +getSavings(savings, totalIncome, percentageBranka)
  const comptPaymentS = getTotal(payments, 101)
  const comptPaymentB = getTotal(payments, 102)
  const monthTotalS = commonCostS + individualCostS + savingsS - comptPaymentS
  const monthTotalB = commonCostB + individualCostB + savingsB - comptPaymentB

  const restS = monthTotalS + deptStefan - payedS
  const restB = monthTotalB + deptBranka - payedB

  return {
    month,
    year,
    sallaryS: sallaryStefan,
    sallaryB: sallaryBranka,
    restIncomeS: restStefan,
    restIncomeB: restBranka,
    percentageS: percentageStefan,
    percentageB: percentageBranka,
    commonCostS,
    commonCostB,
    individualCostS,
    individualCostB,
    savingsS,
    savingsB,
    comptPaymentS,
    comptPaymentB,
    monthTotalS,
    monthTotalB,
    prevDeptS: deptStefan,
    prevDeptB: deptBranka,
    payedS,
    payedB,
    restS,
    restB,
  }
}
