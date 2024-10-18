const mongoose = require('mongoose')

const schemaExercise = mongoose.Schema({
        date: {
                default: new Date(),
                type: Date,
        },
        description: {
                required: true,
                type: String,
        },
        duration: {
                required: true,
                type: Number,
        },
        user_id: {
                required: true,
                type: mongoose.ObjectId,
        },
})

const modelExercise = mongoose.model('Exercise', schemaExercise)

module.exports = modelExercise
