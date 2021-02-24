const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    ownerIdPost: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }],
    title: {
        type: String,
        require: true,
    },
    contentPost: {
        type: String,
        required: true,
    },
    date:{
        datePost: {
            type: String,
            default: `${Date.now}`
        },
        dateModified: [{
            type: String,
            default: `${Date.now}`
        }]
    },
    comment: [{
        ownerIdComment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        contentComment: {
            type: String,
            required: true,
        },
        date: {
            datePost: {
                type: String,
                default: `${Date.now}`
            },
            dateModified: [{
                type: String,
                default: `${Date.now}`
            }]
        },
        reply: [{
            ownerIdReply: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            contentReply: {
                type: String,
                required: true,
            },
        }]
    }]
})

module.exports = Post = mongoose.model('Post', postSchema)
