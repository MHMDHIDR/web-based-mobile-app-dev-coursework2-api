import express from 'express'
import { dbConnect } from '../utils/db.js'

const router = express.Router()

// GET /search (search) for lessons
router.get('/', async (req, res) => {
  let { query } = req.query

  try {
    await dbConnect().then(async db => {
      const lessons = db.collection('lesson')

      // Creating a regex pattern to perform case-insensitive search
      const regexQuery = new RegExp(query, 'i')

      const searchResult = await lessons
        .find({
          // Search in the following fields for the query
          $or: [
            { subject: regexQuery },
            { location: regexQuery },
            { price: parseInt(query) || 0 },
            { spaces: parseInt(query) || 0 }
          ]
        })
        .toArray()

      // if no lessons are found, return 404 (Not Found)
      searchResult.length === 0
        ? res.status(404).json({ message: 'No lessons found' })
        : res.json(searchResult)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
