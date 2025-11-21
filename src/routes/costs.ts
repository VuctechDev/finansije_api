import express from 'express'
import db from '../db/services'

const router = express.Router()

router.get('/:reportId', async (req, res) => {
  try {
    const data = await db.getReportCosts(+req.params.reportId)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    await db.createCost(req.body)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/', async (req, res) => {
  try {
    await db.updateCost(req.body)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.deleteCost(+req.params.id)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
