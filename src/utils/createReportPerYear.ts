import { ReportItem } from "../types/reports";

const parsNumber = (value: string | number) => {
  if (!value) {
    return 0;
  }
  if (typeof value === "string") {
    return +value;
  }
  return value;
};

export const createReportPerYear = (data: ReportItem[]) => {
  let mainS = 0;
  let mainB = 0;
  let restStefan = 0;
  let restBranka = 0;
  let months = 0;
  let savingsStefan = 0;
  let savingsBranka = 0;
  let commonStefan = 0;
  let commonBranka = 0;
  let individualStefan = 0;
  let individualBranka = 0;

  data.forEach((item) => {
    const {
      sallaryS,
      sallaryB,
      restIncomeS,
      restIncomeB,
      commonCostS,
      commonCostB,
      individualCostS,
      individualCostB,
      savingsS,
      savingsB,
    } = item;

    mainS += parsNumber(sallaryS);
    mainB += parsNumber(sallaryB);
    restStefan += parsNumber(restIncomeS);
    restBranka += parsNumber(restIncomeB);
    savingsStefan += parsNumber(savingsS);
    savingsBranka += parsNumber(savingsB);
    commonStefan += parsNumber(commonCostS);
    commonBranka += parsNumber(commonCostB);
    individualStefan += parsNumber(individualCostS);
    individualBranka += parsNumber(individualCostB);
    months++;
  });

  const monthAverageTotal =
    (commonStefan + commonBranka + individualStefan + individualBranka) /
    months;

  return {
    "Ukupno plata Stefan": mainS,
    "Ukupno plata Branka": mainB,
    "Ostali prihodi Stefan": restStefan,
    "Ostali prihodi Branka": restBranka,
    "Ukupni prihodi Stefan": mainS + restStefan,
    "Ukupni prihodi Branka": mainB + restBranka,
    "Ukupni prihodi": mainB + restBranka + mainS + restStefan,
    "Prosjecni prihodi": +(
      (mainB + restBranka + mainS + restStefan) /
      months
    ).toFixed(1),
    "Usteda Stefan": savingsStefan,
    "Usteda Branka": savingsBranka,
    commonStefan,
    commonBranka,
    "Licni troskovi Stefan": individualStefan,
    "Licni troskovi Branka": individualBranka,
    "Prosjecna mjesecna potrosnja": +monthAverageTotal.toFixed(1),
    "Broj mjeseci": months,
  };
};
