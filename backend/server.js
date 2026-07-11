const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./helper/logger').createLogger('server.js')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const { router } = require('./routes/index')
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hotel Booking API running')
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    logger.info('Database connected successfully!!!')

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      logger.info(`Server is up on port ${PORT}`)
    })
  } catch (e) {
    logger.error('Failed to start the server:', e)
  }
}

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error.message)
  logger.error('Stack Trace:', error.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise)
  if (reason instanceof Error) {
    logger.error('Stack Trace:', reason.stack)
  } else {
    logger.error('Reason:', reason)
  }
  process.exit(1)
})

process.on('SIGTERM', async () => {
  process.exit(0)
})

start()