import express from 'express'
import db from '../db/services'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await db.getTemplate()
    res.json(data.map((item, i) => ({ ...item, id: i + 1 })))
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    await db.createTemplate(req.body)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/', async (req, res) => {
  try {
    await db.updateTemplate(req.body)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.delete('/', async (req, res) => {
  try {
    await db.deleteTemplate(req.body.label)
    res.json({ update: 'OK' })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
