const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        validate: /^\d{10}$/
    },
    password: {
        type: String,
        minLength: 3,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
})

module.exports = User = mongoose.model('User', userSchema)