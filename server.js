// Packages
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const timeout = require('connect-timeout')
// Helpers
const CRUDOperations = require('./index.js')

const app = express()

app.use(timeout('2s'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// START OF ROUTES
// START OF ROUTES
// START OF ROUTES

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.post('/api/users', async function (req, res) {
  const username = req.body.username

  try {
    const user = await CRUDOperations.createUser(username); //post user
    res.json(user)
  }
  catch (error) {
    res
      .status(400)
      .json({ error })
  }
})

// app.get('/api/users', async function (req, res) {
//   const users = await null; // get user(s)
//
//   res.json([
//     {
//       _id: '',
//       username: '',
//     }
//   ])
// })
//
// app.post('/api/users/:id/exercises', async function (req, res) {
//   const {
//     date,
//     description,
//     duration,
//   } = req.params
//
//   if (date) {}
//
//   const user = await null; // get user
//   const exercise = await null; // post exercise
//
//   res.json({
//     ...user,
//     ...exercise,
//   })
// })
//
// app.get('/api/users/:_id/logs', function (req, res) {
//   const dateFrom = req.params.from
//   const dateTo = req.params.to
//
//   const user = await null; // get user
//   const exercise = await null; // get user's exercise logs
//
//   res.json({
//     ...user,
//     log: exercise,
//   })
// })


// END OF ROUTES
// END OF ROUTES
// END OF ROUTES

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
