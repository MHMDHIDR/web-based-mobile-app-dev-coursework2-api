import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import logger from './middleware/logger.js'
import lessonsRouter from './routes/lessonsRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'

const app = express()
const PORT = process.env.PORT

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    // Allowed origin array to make requests
    origin: [`http://localhost:8080`]
  })
)
app.use(express.json())
app.use(logger('full'))

// Routes
app.use('/lessons', lessonsRouter)
app.use('/orders', ordersRoutes)

// Start the server
app.listen(PORT, () => console.log(`✔ API Running http://localhost:${PORT}`))

export default app
