// Structure of app is partly inspired by 'alokpaidalwar' from the repo 'nodejs-demo-api'
// URL: https://github.com/alokpaidalwar/nodejs-demo-api

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import pg from 'pg'
import { dbConfig } from './config.js'
import restart from 'nodemon'
import url from 'url'
const app = express();
// const apicache = require('apicache');
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

import studentRouter from './routes/student-router.js'

const PORT = process.env.PORT || 8080;
const HOST = 'http://localhost:' + PORT;

// Create a new client to interact with the postgres database
export const db = new pg.Client(dbConfig);

// Connect to the database
db.connect(err => {
  if (err) throw err
  else console.log("CONNECTED TO DATABASE")
})

app.use(cors({origin: ['http://localhost:3000']}))

// Enable bodyParser so app can read POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(studentRouter)
// Test API Functions
// GET- Home page for app with greeting
app.get("/", (req, res) => {
  return res.status(200).json({Connected: "Connected to NodeJS"})
})

// POST - Test if React is connected to NodeJS
app.get("/connected", (req, res) => {
  console.log("Connected to React!")
  return res.redirect("/")
})






// Listen on specified port
app.listen(PORT, console.log(`Server started on port ${PORT}`))