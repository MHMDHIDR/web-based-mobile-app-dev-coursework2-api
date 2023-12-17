import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import 'dotenv/config'
import lessonsRouter from './routes/lessonsRoutes.js'

const app = express()
const PORT = process.env.PORT

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    // Allowed origin array to make requests
    origin: [`http://localhost:8080`]
  })
)
app.use(logger('short'))

app.use('/lessons', lessonsRouter)

// Start the server
app.listen(PORT, () => console.log(`✔ API Running http://localhost:${PORT}`))

export default app
