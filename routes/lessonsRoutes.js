import express from 'express'
import connectDB from '../utils/db.js'

const router = express.Router()

router.get('/', (_req, res) => {
  try {
    connectDB().then(db => {
      db.collection('lesson')
        .find()
        .toArray()
        .then(lessons => res.json(lessons))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
