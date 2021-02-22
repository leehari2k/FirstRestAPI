const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        require: true,
        match: /^[a-zA-Z]{10}$/,
    },
    des: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Member',
    }],
})

module.exports = Course = mongoose.model('Course', courseSchema)
