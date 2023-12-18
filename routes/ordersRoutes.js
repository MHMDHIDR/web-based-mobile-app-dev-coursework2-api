import express from 'express'
import { dbConnect } from '../utils/db.js'

const router = express.Router()

// GET /orders
router.get('/', async (_req, res) => {
  try {
    await dbConnect().then(db => {
      db.collection('lesson')
        .find()
        .toArray()
        .then(orders => res.json(orders))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET /orders/:id
router.get('/:id', async (req, res) => {
  const { id: _id } = req.params
  try {
    await dbConnect().then(db => {
      db.collection('lesson')
        .findOne({ _id })
        .then(lesson => res.json(lesson))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// POST /orders
router.post('/', async (req, res) => {
  try {
    await dbConnect().then(db => {
      db.collection('lesson')
        .insertOne(req.body)
        .then(lesson => res.json(lesson))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// PUT /orders/:id
router.put('/:id', async (req, res) => {
  try {
    await dbConnect().then(db => {
      db.collection('lesson')
        .updateOne({ _id: req.params.id }, { $set: req.body })
        .then(lesson => res.json(lesson))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
