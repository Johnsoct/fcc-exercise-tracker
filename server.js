// Packages
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const timeout = require('connect-timeout')
// Helpers
const CRUDOperations = require('./index.js')
const errorHandler = require('./error-handler.js')

const app = express()

// MIDDLEWARE
// MIDDLEWARE
// MIDDLEWARE

app.use(timeout('2s'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// ROUTES
// ROUTES
// ROUTES

app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/views/index.html`)
})

app.post('/api/users', async function (req, res, next) {
        const username = req.body.username

        try {
                const user = await CRUDOperations.createUser(username); //post user
                res.json(user)
        }
        catch (error) {
                next(error)
        }
})

app.get('/api/users', async function (req, res, next) {
        try {
                const users = await CRUDOperations.getUsers() // get user(s)
                res.json(users)
        }
        catch (error) {
                next(error)
        }
})

app.post('/api/users/:_id/exercises', async function (req, res, next) {
        try {
                const {
                        date,
                        description,
                        duration,
                } = req.body
                const { _id } = req.params

                const exercise = await CRUDOperations.postExercise(_id, description, duration, date)
                const user = await CRUDOperations.getUserById(_id)

                res.json({
                        date: new Date(exercise.date).toDateString(),
                        description: exercise.description,
                        duration: exercise.duration,
                        username: user.username,
                        _id: user._id,
                })
        }
        catch (error) {
                next(error)
        }
})

app.get('/api/users/:_id/logs', async function (req, res, next) {
        try {
                const {
                        from,
                        limit,
                        to,
                } = req.query
                const {
                        _id,
                } = req.params

                const user = await CRUDOperations.getUserById(_id, limit, from, to, true)

                res.json({
                        ...user,
                        count: user.log.length,
                })
        }
        catch (error) {
                next(error)
        }
})

// ERROR HANDLERS (must be last)
// ERROR HANDLERS (must be last)
// ERROR HANDLERS (must be last)

app.use(errorHandler)

// END OF FILE
// END OF FILE
// END OF FILE

const listener = app.listen(process.env.PORT || 3000, () => {
        console.log('Your app is listening on port ' + listener.address().port)
})
