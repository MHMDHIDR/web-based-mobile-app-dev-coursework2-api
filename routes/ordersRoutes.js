import express from 'express'
import { ObjectId } from 'mongodb'
import { dbConnect } from '../utils/db.js'

const router = express.Router()

// GET All  /orders
router.get('/', async (_req, res) => {
  try {
    await dbConnect().then(db => {
      db.collection('order')
        .find()
        .toArray()
        .then(orders => res.json(orders))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Add (POST) a new /orders
router.post('/', (req, res) => {
  let { name, phone, orderedLessons } = req.body
  orderedLessons = orderedLessons.map(({ _id, spaces }) => ({
    _id: new ObjectId(_id),
    spaces
  }))

  try {
    dbConnect().then(db => {
      db.collection('order')
        .insertOne({ name, phone, orderedLessons })
        .then(lessons => res.json(lessons))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
