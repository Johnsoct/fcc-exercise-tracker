const mongoose = require('mongoose')

const schemaUser = mongoose.Schema({
        log: {
                ref: 'Exercise',
                type: [mongoose.ObjectId],
        },
        username: {
                required: true,
                type: String,
        },
})

const modelUser = mongoose.model('User', schemaUser)

module.exports = modelUser
