import { json } from "body-parser";
import dataRoute from "./routes/data";
import templateRoute from "./routes/template";
import costsRoute from "./routes/costs";
import paymentsRoute from "./routes/payments";
import reportRoute from "./routes/report";

import cors from "cors";
import db from "./db/services";
import { createCostsFromTemplate } from "./utils/createCostsFromTemplate";
import { importDump } from "./db/a";
const app = require("express")();

app.use(json());
app.use(cors());
app.use("/api/data", dataRoute);
app.use("/api/template", templateRoute);
app.use("/api/costs", costsRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/report", reportRoute);

// db.create_table()
// db.delete_table()
// createCostsFromTemplate(1000)
// db.updateDept(0,926)

const awaw = {
  month: "Avgust",
  year: 2022,
  sallaryS: 2000,
  sallaryB: 2530,
  restIncomeS: 0,
  restIncomeB: 0,
  percentageS: 44.2,
  percentageB: 55.8,
  commonCostS: 1393.8,
  commonCostB: 1760.1,
  individualCostS: 220,
  individualCostB: 591.3,
  savingsS: 200,
  savingsB: 253,
  comptPaymentS: 1127.8,
  comptPaymentB: 1278,
  monthTotalS: 686,
  monthTotalB: 1325.5,
  prevDeptS: 0,
  prevDeptB: 0,
  payedS: 684,
  payedB: 400,
  restS: 0,
  restB: 925.5,
};

// db.createNewReport(awaw)
//

const PORT = 1111;

app.listen(PORT, () => {
  console.log(`Server ok! and running on ${PORT}`);
  importDump();
});
