import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

async function dbConnect() {
  try {
    await client.connect()
    console.log('✅ MongoDB CONNECTED')
    return client.db('after_school_booking_system')
  } catch (error) {
    throw new Error('Error connecting to MongoDB')
  }
}

async function dbDisconnect() {
  try {
    await client.close()
    console.log('🚫 MongoDB DISCONNECTED')
  } catch (error) {
    throw new Error('Error disconnecting from MongoDB')
  }
}

export { dbConnect, dbDisconnect }
