// Packages
require('dotenv').config({ path: '.env.development' })
const mongoose = require('mongoose')
// Models
const { 
        modelExercise, 
        modelUser 
} = require('./models')

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

const createUser = async (username) => {
        try {
                const doc = new modelUser({ username })
                return await doc.save()
        }
        catch (error) {
                throw new Error(error)
        }
}

const getUsers = async () => {
        try {
                const doc = await modelUser.find().exec()
                return doc
        }
        catch (error) {
                throw new Error(error)
        }
}

const getUserById = async (
        id, 
        limit = undefined, 
        from = undefined, 
        to = undefined, 
        populateLog = false
) => {
        try {
                const doc = await modelUser
                        .findById(id)
                        .exec()

                if (populateLog) {
                        await doc.populate([{ 
                                path: 'log',
                                match: {
                                        date: {
                                                $gte: from
                                                        ? new Date(from).toISOString()
                                                        : new Date('1582-10-15').toISOString(),
                                                $lte: to
                                                        ? new Date(to).toISOString()
                                                        : new Date('9999-12-31').toISOString(),
                                        }
                                },
                                perDocumentLimit: limit,
                                transform: (log, id) => {
                                        if (!log) return

                                        // Cannot access log.date below without converting out of Mongoose.document
                                        const logPOJO = log.toObject()
                                        return {
                                                ...logPOJO,
                                                date: new Date(logPOJO.date).toDateString(),
                                        }
                                }
                        }])
                }

                const docJSON = doc.toJSON()

                // Strip null values from populated log(s)
                docJSON.log = docJSON.log.filter((log) => log)

                return docJSON
        }
        catch (error) {
                throw new Error(error)
        }
}

const postExercise = async (id, description, duration, date = new Date()) => {
        try {
                const standardizedDate = new Date(date).toISOString()
                const docExercise = new modelExercise({
                        date: standardizedDate,
                        description,
                        duration,
                        user_id: id,
                })
                await docExercise.save()

                const docUser = await modelUser.findOneAndUpdate(
                        { _id: id },
                        { $push: { log: docExercise._id } },
                        { new: true }
                ).exec()

                return docExercise
        }
        catch (error) {
                throw new Error(error)
        }
}

module.exports = {
        createUser,
        getUsers,
        getUserById,
        postExercise,
}
