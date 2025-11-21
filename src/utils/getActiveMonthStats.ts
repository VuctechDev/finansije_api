import { CostItem } from '../types/costs'
import { MainData } from '../types/data'
import { PaymentItem } from '../types/payments'

export const getPercentage = (data: MainData) => {
  const { sallaryStefan, restStefan, sallaryBranka, restBranka } = data

  const percentageStefan = +(
    ((sallaryStefan + restStefan) * 100) /
    (sallaryStefan + restStefan + sallaryBranka + restBranka)
  ).toFixed(1)

  const percentageBranka = +(
    ((sallaryBranka + restBranka) * 100) /
    (sallaryStefan + restStefan + sallaryBranka + restBranka)
  ).toFixed(1)

  return { percentageStefan, percentageBranka }
}

export const getSavings = (
  savings: number,
  totalIncome: number,
  percentage: number
) => {
  const base = totalIncome * (savings / 100)
  return (percentage * base) / 100
}

export const getTotal = (data: CostItem[] | PaymentItem[], type: number) => {
  let total = 0
  data.forEach((item) => {
    if (item.type === type) {
      total += item.value
    }
  })
  return total
}

export const getActiveMonthStats = (
  data: MainData,
  costs: CostItem[],
  payments: PaymentItem[]
) => {
  const {
    savings,
    deptStefan,
    deptBranka,
    sallaryStefan,
    restStefan,
    sallaryBranka,
    restBranka,
  } = data

  const totalIncome = sallaryStefan + restStefan + sallaryBranka + restBranka

  const { percentageStefan, percentageBranka } = getPercentage(data)

  const commonCostsTotal = getTotal(costs, 100)

  const commonCostsS = (commonCostsTotal * percentageStefan) / 100
  const commonCostsB = (commonCostsTotal * percentageBranka) / 100
  const costsS = getTotal(costs, 101)
  const costsB = getTotal(costs, 102)

  const paymentsS = getTotal(payments, 101)
  const paymentsB = getTotal(payments, 102)

  const totalMonthCostsS =
    commonCostsS +
    costsS +
    +getSavings(savings, totalIncome, percentageStefan) -
    paymentsS

  const totalMonthCostsB =
    commonCostsB +
    costsB +
    +getSavings(savings, totalIncome, percentageBranka) -
    paymentsB

  return [
    {
      id: 1,
      label: '%',
      vStefan: percentageStefan,
      vBranka: percentageBranka,
      total: null,
    },
    {
      id: 2,
      label: 'Zajednički',
      vStefan: commonCostsS.toFixed(1),
      vBranka: commonCostsB.toFixed(1),
      total: commonCostsTotal.toFixed(1),
    },
    {
      id: 3,
      label: 'Pojedinačni',
      vStefan: costsS.toFixed(1),
      vBranka: costsB.toFixed(1),
      total: (costsS + costsB).toFixed(1),
    },
    {
      id: 4,
      label: 'Štednja',
      vStefan: getSavings(savings, totalIncome, percentageStefan).toFixed(1),
      vBranka: getSavings(savings, totalIncome, percentageBranka).toFixed(1),
      total: (
        getSavings(savings, totalIncome, percentageBranka) +
        getSavings(savings, totalIncome, percentageStefan)
      ).toFixed(1),
    },
    {
      id: 5,
      label: 'Uplate sa računa',
      vStefan: paymentsS.toFixed(1),
      vBranka: paymentsB.toFixed(1),
      total: (paymentsS + paymentsB).toFixed(1),
    },
    {
      id: 6,
      label: 'Dugovanje za mjesec',
      vStefan: totalMonthCostsS.toFixed(1),
      vBranka: totalMonthCostsB.toFixed(1),
      total: (totalMonthCostsS + totalMonthCostsB).toFixed(1),
    },
    {
      id: 7,
      label: 'Prethodno dugovanje',
      vStefan: deptStefan.toFixed(1),
      vBranka: deptBranka.toFixed(1),
      total: null,
    },
    {
      id: 8,
      label: 'Preostli dug',
      vStefan: (totalMonthCostsS + deptStefan).toFixed(1),
      vBranka: (totalMonthCostsB + deptBranka).toFixed(1),
      total: (
        totalMonthCostsS +
        deptStefan +
        totalMonthCostsB +
        deptBranka
      ).toFixed(1),
    },
  ]
}
