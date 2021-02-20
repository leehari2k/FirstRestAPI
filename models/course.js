const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    note: String,
})

module.exports = course = mongoose.model('course', courseSchema)
