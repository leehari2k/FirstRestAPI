const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    age: Number,
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
})

module.exports = Member = mongoose.model('Member', memberSchema)