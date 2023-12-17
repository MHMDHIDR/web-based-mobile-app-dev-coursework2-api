import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

async function db() {
  try {
    await client.connect()
    console.log('✅ MongoDB CONNECTED')
    return client.db('lessons_booking_system')
  } catch (error) {
    throw new Error('Error connecting to MongoDB')
  }
}

export default db
