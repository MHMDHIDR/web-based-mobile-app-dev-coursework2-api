import express from 'express'
import { dbConnect } from '../utils/db.js'

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
    await dbConnect().then(db => {
      db.collection('lesson')
        .findOne({ _id })
        .then(lesson => res.json(lesson))
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

// PUT /lessons/:id
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
