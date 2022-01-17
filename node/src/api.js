// Structure of app is partly inspired by 'alokpaidalwar' from the repo 'nodejs-demo-api'
// URL: https://github.com/alokpaidalwar/nodejs-demo-api

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import pg from 'pg'
import { PORT, CORS_ORIGIN, DBCONFIG } from './config.js'

const app = express();
// const apicache = require('apicache');
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

import connectionRouter from './routes/connection-router.js'
import studentRouter from './routes/student-router.js'

// Create a new client to interact with the postgres database
export const db = new pg.Client(DBCONFIG);

// Connect to the database
db.connect(err => {
  if (err) throw err
  else console.log("CONNECTED TO DATABASE")
})

app.use(cors({origin: CORS_ORIGIN}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(connectionRouter)
app.use(studentRouter)

app.listen(PORT, console.log(`Server started on port ${PORT}`))