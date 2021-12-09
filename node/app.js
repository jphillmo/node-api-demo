const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const { Client } = require('pg');
const { dbConfig } = require('config');
const { restart } = require("nodemon");
const url = require('url')
// const apicache = require('apicache');
// let cache = apicache.middleware
// app.use(cache('5 minutes'))

const PORT = process.env.PORT || 8080;
const HOST = 'http://localhost:' + PORT;

// Create a new client to interact with the postgres database
const db = new Client(dbConfig);

// Connect to the database
db.connect(err => {
  if (err) throw err
  else console.log("CONNECTED TO DATABASE")
})

// If testing in local environment and you get the error "No 'Access-Control-Allow-Origin' header is present", use the function below.  It should fix the problem.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Enable bodyParser so app can read POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

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


// GET - retrieve students from database
app.get("/students", (req, res) => {
  console.log("GET - client wants to retrieve student data using students")
  //console.log(req.url.substring(9))
  let searchParams = new URLSearchParams(req.url.substring(9))
  //console.log("searchParams: " + searchParams.toString())
  let query = ''
  // if (   searchParams.has('id') || searchParams.has('fname') || 
  //       searchParams.has('lname') || searchParams.has('email')) {
  if (searchParams.toString().length > 0) {
    let id = searchParams.get('id')
    let fname = searchParams.get('fname')
    let lname = searchParams.get('lname')
    let email = searchParams.get('email')
    //console.log(`id: ${id}, fname: ${fname}, lname: ${lname}, email: ${email}`)
    if (id) {
      query = `SELECT getStudentById(${id}) AS student`
      console.log("Getting student that has id " + id + "...")
    }
    else if (email) {
      query = `SELECT getStudentByEmail('${email}') AS student`
      console.log("Getting student that has email " + email + "...")
    }
    else if (fname && lname) {
      query = `SELECT getStudentByFullName('${fname}', '${lname}') AS student`
      console.log("Getting students that have fname " + fname + " and lname " + lname + "...")
    }
    else if (lname) {
      query = `SELECT getStudentByLastName('${lname}') AS student`
      console.log("Getting students that have lname " + lname + "...")
    }
    else if (fname) {
      query = `SELECT getStudentByFirstName('${fname}') AS student`
      console.log("Getting students that have fname " + fname + "...")
    }
  }
  else {
    query = `SELECT getStudents() AS student`
    console.log("Getting all students...")
  }

  db
    .query(query)
    .then(results => {
      console.log("Sending response back to client...")
      let students = []
      for (let i = 0; i < results.rowCount; i++) {
        let student = {
          id: results.rows[i]["student"]["id"],
          fname: results.rows[i]["student"]["first_name"],
          lname: results.rows[i]["student"]["last_name"],
          email: results.rows[i]["student"]["email"],
          links: [
            {
              href: `students/${results.rows[i]["student"]["id"]}`,
              rel: 'students',
              type: 'GET'
            }
          ]
        }
        students.push(student)
      }
      return res.status(200).send(students)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send("Error. Could not get students from database.")
    })
})

// GET - get students using URI of id
app.get("/students/:id", (req, res) => {
  console.log("GET - client wants to retrieve student data using students/:id")
  let query = `SELECT getStudentById(${req.params.id}) AS student`
  db
    .query(query)
    .then(results => {
      console.log("Sending response back to client...")
      if (results.rowCount == 0) {
        res.status(404).send(`Student with id ${req.params.id} does not exist.`)
      } 
      else {
        console.log("Sending response back to client...")
        let student = {
          id: results.rows[0]["student"]["id"],
          fname: results.rows[0]["student"]["first_name"],
          lname: results.rows[0]["student"]["last_name"],
          email: results.rows[0]["student"]["email"],
          links: [
            {
              href: `students/${results.rows[0]["student"]["id"]}`,
              rel: 'students',
              type: 'GET'
            }
          ]
        }
        return res.status(200).send(student)
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send("Error occurred on server.")
    })
})

// POST - insert a student into the database
app.post("/students", (req, res) => {
  console.log("POST - client wants to add a student...")
  let fname = req.body.params.fname
  let lname = req.body.params.lname
  let email = req.body.params.email
  if (fname == '' || lname == '' || email == '') {
    console.log("One or more input fields are empty. Cannot process request...")
    return res.status(400).send('One or more input fields are empty. Cannot process request.')
  }
  console.log("Adding student to database...")
  let query = `SELECT addStudent('${fname}', '${lname}', '${email}') AS student`
  db
    .query(query)
    .then(results => {
      console.log("Sending response back to client...")
      let student = results.rows[0]["student"]
      if (student["id"] == null) {
        return res.status(400).send('Cannot add student. Student already exists in database.')
      }
      return res.status(200).json({
        id: student["id"],
        fname: student["first_name"],
        lname: student["last_name"],
        email: student["email"]
      })
    })
    .catch(err => {
      console.log(err)
      if (err.code == 23505)
        return res.status(400).send('Cannot add student. Email is already registered.')
      else
        return res.status(500).send("Error occurred on server.")
    })
})

// PUT - update student information
app.put("/students", (req, res) => {

})

// DELETE - remove a student from the database
app.delete("/students/:email", (req, res) => {
  console.log("DELETE - client wants to remove a student...")
  //let requestUrl = new URL(`${HOST}` + req.url)
  let email = req.params.email
  if (email == '')
    return res.status(400).send('Email field is empty. Cannot process request.')
  console.log("Removing student from database...")
  let query = `SELECT removeStudentByEmail('${email}') AS student`
  db
    .query(query)
    .then(results => {
      console.log("Sending response back to client...")
      let student = results.rows[0]["student"]
      if (student["email"] == null) {
        return res.status(400).send('Cannot remove student. No students are registered with that email.')
      }
      return res.status(200).json({
        id: student["id"],
        fname: student["first_name"],
        lname: student["last_name"],
        email: student["email"]
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send("Error occurred on server.")
    })
})



// Listen on specified port
app.listen(PORT, console.log(`Server started on port ${PORT}`))