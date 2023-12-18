import { ObjectId } from 'mongodb'
import { dbConnect } from '../utils/db.js'

export const updateLessonsSpaces = async (req, res, next) => {
  const { orderedLessons } = req.body

  try {
    orderedLessons.map(async ({ _id, spaces }) => {
      await dbConnect().then(db => {
        db.collection('lesson')
          .updateOne({ _id: new ObjectId(_id) }, { $inc: { spaces: -spaces } })
          .then(({ modifiedCount }) => {
            if (modifiedCount === 0) {
              throw new Error('Lesson not found')
            }
            next()
          })
      })
    })
  } catch (err) {
    console.error(err)
  }
}
