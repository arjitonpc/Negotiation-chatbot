
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { config } from './config.js'
import { Store } from './models/store.js'
import { NegotiationAPI } from './api/negotiation.js'

const app = express()
app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: config.corsOrigin } })

const store = new Store(config.dataPath)

app.get('/', (_, res) => res.json({ ok: true, name: 'Digital Fixture Room API' }))
app.use('/negotiation', NegotiationAPI({ store, io }))

httpServer.listen(config.port, () => {
  console.log(`API listening on :${config.port}`)
})
