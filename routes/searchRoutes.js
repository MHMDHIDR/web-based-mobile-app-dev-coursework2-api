import express from 'express'
import { dbConnect } from '../utils/db.js'

const router = express.Router()

// GET /search (search) for lessons by subject, location, price, or spaces
router.get('/', async (req, res) => {
  const { query } = req.query

  try {
    await dbConnect().then(async db => {
      const lessons = await db
        .collection('lesson')
        .find({
          $or: [
            { subject: { $regex: new RegExp(query, 'i') } },
            { location: { $regex: new RegExp(query, 'i') } },
            { price: { $regex: new RegExp(query, 'i') } },
            { spaces: { $regex: new RegExp(query, 'i') } }
          ]
        })
        .toArray()

      if (!lessons) res.status(404).json({ error: 'Lesson not found' })
      res.json(lessons)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
