import express from 'express'
import 'express-async-errors'
import { config } from 'dotenv'
import { routes } from './routes'
import { internalErrorsHandler } from '@errors/internalErrorsHandler'

config()
const app = express()

app.use(express.json())
app.use(routes)
app.use(internalErrorsHandler)

export { app }
