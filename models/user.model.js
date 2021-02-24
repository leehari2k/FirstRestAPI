const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        match: /^\d{10}$/ // validate: /^\d{10}$/
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
})

module.exports = User = mongoose.model('User', userSchema)