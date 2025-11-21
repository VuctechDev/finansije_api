import express from 'express'
import db from '../db/services'
import { ReportReq } from '../types/reports'
import { createCostsFromTemplate } from '../utils/createCostsFromTemplate'
import { createReportListData } from '../utils/createReportListData'
import { getReportData } from '../utils/getReportValues'
import { createReportPerYear } from '../utils/createReportPerYear'

const router = express.Router()

router.post('/', async (req: ReportReq, res) => {
  const { reportId } = req.body
  try {
    const data = await db.getData()
    const costs = await db.getReportCosts(reportId)
    const payments = await db.getReportPayments(reportId)
    const reportData = getReportData(req, data, costs, payments)
    await db.createNewReport(reportData)
    await db.updateDept(reportData.restS, reportData.restB)
    await createCostsFromTemplate(+reportId + 1)
    res.json({ ID: +reportId + 1 })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/selectData', async (req, res) => {
  try {
    console.log('OPAA')
    const data = await db.getReportsSelectData()
    let years = []
    data.forEach((data) => {
      if (!years.includes(data.year)) {
        years.push(data.year)
      }
    })
    res.json({ data, years })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/:year', async (req, res) => {
  const { year } = req.params
  try {
    const data = await db.getReportPerYear(+year)
    const parsedData = createReportPerYear(data)
    res.json({ ...parsedData })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/:year/:month', async (req, res) => {
  const { month, year } = req.params
  console.log(req.params)
  try {
    const data = await db.getReportData(month, +year)
    const parsedData = createReportListData(data)
    res.json({ ...parsedData })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// getReportsSelectData

export default router
