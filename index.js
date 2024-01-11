import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import logger from './middleware/logger.js'
import lessonsRouter from './routes/lessonsRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'
import searchRoutes from './routes/searchRoutes.js'

const app = express()
const PORT = process.env.PORT

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    // Allowed origins array to make requests to the API
    origin: [
      `http://localhost:8080`,
      `http://127.0.0.1:8080`,
      `https://mhmdhidr.github.io`
    ]
  })
)
app.use(express.json())
app.use(logger('full'))

// Serve static images from public directory (Images for the lessons)
app.use(express.static('public'))

// Routes
app.use('/lessons', lessonsRouter)
app.use('/orders', ordersRoutes)
app.use('/search', searchRoutes)

// Start the server
app.listen(PORT, () => console.log(`✔ API Running http://localhost:${PORT}`))

export default app
