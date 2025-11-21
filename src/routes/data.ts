import express from 'express'
import db from '../db/services'
import {
  getPercentage,
  getActiveMonthStats,
} from '../utils/getActiveMonthStats'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.json({ radi: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/savings', async (req, res) => {
  try {
    const data = await db.getData()
    res.json({ savings: data.savings })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/savings', async (req, res) => {
  try {
    await db.updateSavings(req.body.savings)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/income', async (req, res) => {
  try {
    const data = await db.getData()
    const { percentageStefan, percentageBranka } = getPercentage(data)
    res.json({
      sallaryStefan: data.sallaryStefan,
      sallaryBranka: data.sallaryBranka,
      restStefan: data.restStefan,
      restBranka: data.restBranka,
      percentageStefan,
      percentageBranka,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/income', async (req, res) => {
  try {
    await db.updateIncome(req.body.key, req.body.value)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/activeMonthStats/:reportId', async (req, res) => {
  try {
    const data = await db.getData()
    const costs = await db.getReportCosts(+req.params.reportId)
    const payments = await db.getReportPayments(+req.params.reportId)
    res.json(getActiveMonthStats(data, costs, payments))
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/activeReportId', async (req, res) => {
  try {
    const data = await db.getActiveReportId()
    if (!data.length) {
      return res.json({ ID: 1000 })
    }
    const lastID = data[data.length - 1].id
    res.json({ ID: +lastID + 1 })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
