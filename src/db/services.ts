import mySql from "mysql2";
import { PostReportItem, ReportItem } from "../types/reports";
import { MainData, Template } from "../types/data";
import { handleReportData } from "../utils/handleReportData";
import { CostItem, PostCostItem } from "../types/costs";
import { PostPaymentItem, PaymentItem } from "../types/payments";
require("dotenv/config");

export const pool = mySql.createPool({
  connectionLimit: 100,
  host: "188.34.198.128",
  user: "myuser",
  password: "mypass",
  database: "mydatabase",
  port: 3306,
  multipleStatements: true,
});

const create_table_reports = `CREATE TABLE reports ( 
  id INT AUTO_INCREMENT PRIMARY KEY, 
  month VARCHAR(30),
  year INT,
  sallaryS INT, 
  sallaryB INT,
  restIncomeS INT,
  restIncomeB INT,
  percentageS DECIMAL(3,1),
  percentageB DECIMAL(3,1),
  commonCostS DECIMAL(5,1),
  commonCostB DECIMAL(5,1),
  individualCostS DECIMAL(5,1),
  individualCostB DECIMAL(5,1),
  savingsS DECIMAL(5,1),
  savingsB DECIMAL(5,1),
  comptPaymentS DECIMAL(5,1),
  comptPaymentB DECIMAL(5,1),
  monthTotalS DECIMAL(5,1),
  monthTotalB DECIMAL(5,1),
  prevDeptS DECIMAL(5,1),
  prevDeptB DECIMAL(5,1),
  payedS DECIMAL(5,1),
  payedB DECIMAL(5,1),
  restS DECIMAL(5,1),
  restB DECIMAL(5,1),
  creation DATETIME DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_costs = `CREATE TABLE costs ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    reportId INT,
    label VARCHAR(50),
    value DECIMAL(5,1),
    type INT) ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_payments = `CREATE TABLE payments ( 
      id INT AUTO_INCREMENT PRIMARY KEY, 
      reportId INT,
      label VARCHAR(50),
      value DECIMAL(5,1),
      type INT) ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_data = `CREATE TABLE data ( 
  id INT AUTO_INCREMENT PRIMARY KEY, 
  savings int, 
  sallaryStefan INT, 
  sallaryBranka INT, 
  restStefan INT, 
  restBranka INT, 
  deptStefan INT, 
  deptBranka INT) ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_template =
  "CREATE TABLE template (label VARCHAR(50) PRIMARY KEY, value INT, type INT)";

const delete_table = "DROP TABLE costs";
const crete_table = create_table_reports;

type DB = {
  create_table?: () => Promise<unknown>;
  delete_table?: () => Promise<unknown>;
  insertData?: () => Promise<unknown>;
  updateSavings?: (savings: number) => Promise<void>;
  updateDept?: (deptStefan: number, deptBranka: number) => Promise<void>;
  getData?: () => Promise<MainData>;
  updateIncome?: (key: string, value: string) => Promise<void>;
  createPlayerInStats?: () => Promise<void>;
  createTemplate?: (data: Template) => Promise<void>;
  updateTemplate?: (data: Template) => Promise<unknown>;
  getTemplate?: () => Promise<Template[]>;
  deleteTemplate?: (label: string) => Promise<Template[]>;
  createNewReport?: (data: PostReportItem) => Promise<void>;
  getReportData?: (month: string, year: number) => Promise<ReportItem>;
  getReportsSelectData?: () => Promise<{ month: string; year: number }[]>;
  getActiveReportId?: () => Promise<{ id: number }[]>;
  getReportCosts?: (reportId: number) => Promise<CostItem[]>;
  createCost?: (data: PostCostItem) => Promise<void>;
  createCostsFromTemplate?: (data: (string | number)[][]) => Promise<void>;
  updateCost?: (data: CostItem) => Promise<void>;
  deleteCost?: (id: number) => Promise<void>;
  getReportPayments?: (reportId: number) => Promise<PaymentItem[]>;
  createPayment?: (data: PostPaymentItem) => Promise<void>;
  updatePayment?: (data: PaymentItem) => Promise<void>;
  deletePayment?: (id: number) => Promise<void>;
  getReportPerYear?: (year: number) => Promise<any>;
};

const INSERT_ANALYTIC = `INSERT INTO analytics (eventGroup, eventName, newVisitor) VALUES?`;

const INSERT_DATA = `INSERT INTO data (savings, sallaryStefan, sallaryBranka, restStefan, restBranka, deptStefan, deptBranka) VALUES?`;

const GET_ANALYTIC = `SELECT * FROM analytics`;

const db: DB = {};

db.create_table = () => {
  return new Promise((resolve, reject) => {
    pool.query(crete_table, (err, res) => {
      if (err) return reject(err);
      console.log("kreirano");
      return resolve(res as any);
    });
  });
};

db.delete_table = () => {
  return new Promise((resolve, reject) => {
    pool.query(delete_table, (err, res) => {
      if (err) return reject(err);
      console.log("obrisano");
      return resolve(res as any);
    });
  });
};

db.updateDept = async (deptStefan: number, deptBranka: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE data 
    SET deptStefan = ?,
    deptBranka = ?,
    restStefan = 0,
    restBranka = 0
    WHERE id= 1000`,
      [deptStefan, deptBranka],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.updateSavings = async (savings: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE data 
    SET savings = ?
    WHERE id= 1000`,
      [savings],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

const aa =
  "savings, sallaryStefan, sallaryBranka, restStefan, restBranka, deptStefan, deptBranka";

db.createPlayerInStats = () => {
  const values = [[0, 0, 0, 0, 0, 0, 0]];
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO data (savings, sallaryStefan, sallaryBranka, restStefan, restBranka, deptStefan, deptBranka) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        console.log("OPAA");
        return resolve(res as any);
      }
    );
  });
};

db.updateIncome = async (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE data 
    SET ${key} = ?
    WHERE id= 1000`,
      [value],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.getTemplate = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM template`, async (err, res) => {
      if (err) return reject(err);
      return resolve(res as any);
    });
  });
};

db.createTemplate = (data: Template) => {
  const { label, value, type } = data;
  const values = [[label, value, type]];
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO template (label, value, type) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.updateTemplate = async (data: Template) => {
  const { label, value, type } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE template
    SET value = ?,
    type = ?
    WHERE label = ?`,
      [value, type, label],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.deleteTemplate = async (label: string) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM template 
      WHERE label = ?`,
      [label],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.getData = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM data`, async (err, res) => {
      if (err) return reject(err);
      return resolve(res[0]);
    });
  });
};

db.getActiveReportId = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT id FROM reports`, async (err, res) => {
      if (err) return reject(err);
      return resolve(res as any);
    });
  });
};

db.createNewReport = (data: PostReportItem) => {
  const values = handleReportData(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO reports (
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
        restB
      ) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        console.log("OPAA");
        return resolve(res as any);
      }
    );
  });
};

db.getReportData = (month: string, year: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM reports 
    WHERE month =? AND 
    year =?`,
      [month, year],
      (err, res) => {
        if (err) return reject(err);
        console.log("OPAA");
        return resolve(res[0]);
      }
    );
  });
};

db.getReportPerYear = (year) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM reports 
    WHERE year =?`,
      [year],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.getReportsSelectData = () => {
  return new Promise((resolve, reject) => {
    console.log("OPAA2");

    pool.query(`SELECT month, year FROM reports`, (err, res) => {
      if (err) return reject(err);
      console.log("OPAA");
      return resolve(res as any);
    });
  });
};

db.getReportCosts = async (reportId: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM costs WHERE reportId = ${reportId}`,
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.createCost = (data: PostCostItem) => {
  const { reportId, label, value, type } = data;
  const values = [[reportId, label, value, type]];
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO costs (reportId, label, value, type) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.updateCost = async (data: CostItem) => {
  const { id, value, type } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE costs
    SET value = ?,
    type = ?
    WHERE id = ?`,
      [value, type, id],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.deleteCost = async (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM costs 
      WHERE id = ?`,
      [id],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.getReportPayments = async (reportId: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM payments WHERE reportId = ${reportId}`,
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.createPayment = (data: PostPaymentItem) => {
  const { reportId, label, value, type } = data;
  const values = [[reportId, label, value, type]];
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO payments (reportId, label, value, type) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.updatePayment = async (data: PaymentItem) => {
  const { value, type, id } = data;
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE payments
    SET value = ?,
    type = ?
    WHERE id = ?`,
      [value, type, id],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.deletePayment = async (id: number) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM payments 
      WHERE id = ?`,
      [id],
      async (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

db.createCostsFromTemplate = (values: (string | number)[][]) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO costs (reportId, label, value, type) VALUES?`,
      [values],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res as any);
      }
    );
  });
};

export default db;
