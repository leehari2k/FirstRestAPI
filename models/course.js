const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    }
})

module.exports = course = mongoose.model('course', courseSchema)
