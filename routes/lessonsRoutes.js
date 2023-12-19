import express from 'express'
import { dbConnect } from '../utils/db.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

// GET /lessons
router.get('/', (_req, res) => {
  try {
    dbConnect()
      .then(db => {
        db.collection('lesson')
          .find()
          .toArray()
          .then(lessons => res.json(lessons))
      })
      .catch(err => console.log(err))
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// GET /lessons/:id
router.get('/:id', async (req, res) => {
  const { id: _id } = req.params

  try {
    await dbConnect().then(async db => {
      const lesson = await db.collection('lesson').findOne({ _id: new ObjectId(_id) })
      if (!lesson) res.status(404).json({ error: 'Lesson not found' })
      res.json(lesson)
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// POST /lessons
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

// PUT /lessons (update spaces)
router.put('/', async (req, res) => {
  const { orderedLessons } = req.body

  try {
    for (const { _id, spaces } of orderedLessons) {
      const db = await dbConnect()
      const result = await db
        .collection('lesson')
        .updateOne({ _id: new ObjectId(_id) }, { $inc: { spaces: -spaces } })
      if (result.modifiedCount === 0) {
        res.status(404).json({ error: 'Lesson not found' })
        return
      }
    }
    res.json({ message: 'Lessons updated' })
  } catch (err) {
    console.error(err)
  }
})

// PUT /lessons/:id
router.put('/:id', async (req, res) => {
  const { id: _id } = req.params

  try {
    await dbConnect().then(db => {
      db.collection('lesson')
        .updateOne({ _id: new ObjectId(_id) }, { $set: req.body })
        .then(lesson => res.json(lesson))
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
