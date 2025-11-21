import { ReportItem } from '../types/reports'

export const createReportListData = (data: ReportItem) => {
  const {
    id,
    month,
    year,
    sallaryS,
    sallaryB,
    restIncomeS,
    restIncomeB,
    percentageS,
    percentageB,
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
    prevDeptS,
    prevDeptB,
    payedS,
    payedB,
    restS,
    restB,
  } = data

  return {
    id,
    month,
    year,
    data: [
      {
        id: 1,
        label: 'Plata',
        value1: sallaryS.toString(),
        value2: sallaryB.toString(),
      },
      {
        id: 2,
        label: 'Ostali prihodi',
        value1: restIncomeS.toString(),
        value2: restIncomeB.toString(),
      },
      {
        id: 3,
        label: 'Učešće (%)',
        value1: percentageS.toString(),
        value2: percentageB.toString(),
      },
      {
        id: 4,
        label: 'Zajednički troškovi',
        value1: commonCostS.toString(),
        value2: commonCostB.toString(),
      },
      {
        id: 5,
        label: 'Pojedinačni troškovi',
        value1: individualCostS.toString(),
        value2: individualCostB.toString(),
      },
      {
        id: 6,
        label: 'Štednja',
        value1: savingsS.toString(),
        value2: savingsB.toString(),
      },
      {
        id: 7,
        label: 'Sa računa',
        value1: comptPaymentS.toString(),
        value2: comptPaymentB.toString(),
      },
      {
        id: 8,
        label: 'Dugovanje za mjesec',
        value1: monthTotalS.toString(),
        value2: monthTotalB.toString(),
      },
      {
        id: 9,
        label: 'Prethodno dugovanje',
        value1: prevDeptS.toString(),
        value2: prevDeptB.toString(),
      },
      {
        id: 10,
        label: 'Uplata',
        value1: payedS.toString(),
        value2: payedB.toString(),
      },
      {
        id: 11,
        label: 'Preostalo dugovanje',
        value1: restS.toString(),
        value2: restB.toString(),
      },
    ],
  }
}
