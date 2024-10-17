// Packages
require('dotenv').config({ path: '.env.development' })
const mongoose = require('mongoose')
try {
        mongoose.connect(process.env.MONGODB_URI)

        mongoose.connection.on('error', (error) => {
                console.log('Mongoose Connection Error', error)
        })

        mongoose.connection.on('disconnected', () => {
                console.log('Mongoose disconnected!')
        })
}
catch (error) {
        console.log('Mongoose Connection Error', error)
}

const schemaExercise = mongoose.Schema({
        date: Date,
        description: {
                required: true,
                type: String,
        },
        duration: {
                required: true,
                type: Number,
        },
})
const schemaUser = mongoose.Schema({
        username: {
                required: true,
                type: String,
        },
})

const modelExercise = mongoose.model('Exercise', schemaExercise)
const modelUser = mongoose.model('User', schemaUser)

const createUser = async (username) => {
        const document = new modelUser({
                username,
        })

        try {
                return await document.save()
        }
        catch (error) {
                return error
        }
}

module.exports = {
        createUser,
}
