const {
    HTTP_STATUS_CODE
} = require('../constant')

const Post = require('../models/post.model')
const User = require('../models/user.model')

const create = async (req, res, next) => { 
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        if (!user) throw new Object({
            message: 'User not found',
            status: HTTP_STATUS_CODE.NOT_FOUND,
        })

        const {} = req.body.value
        const obj = {}
        const newPost = new Post({obj})
        newPost.ownerIdPost = userID        
        const result = await newPost.save()

        if (!result) throw new Object({
            message: 'Create failed',
            status: HTTP_STATUS_CODE.BAD_REQUEST,
        })
        return res.status(HTTP_STATUS_CODE.CREATE).json({post: newPost})
    } catch (err) {
        next(err)
    }
}

const getAll = async (req, res, next) => {
    try {
        const posts = await Post.findById({})
        return res.status(HTTP_STATUS_CODE.OK).json({posts})
    } catch (err) {
        next(err)
    }
}

const getAllOfAnUser = async (req, res, next) => {
    try {
        const { userID } = req.params
        const user = await User.findById(userID)
        if (!user) throw new Object({
            message: 'User not found',
            status: HTTP_STATUS_CODE.NOT_FOUND,
        })

        const posts = await Post.find(userID => {
           return ownerIdPost == userID
        })
    } catch (err) {
        next(err)
    }
}
const getOne = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
        if (!course) throw new Error('Not found')
        return res.status(HTTP_STATUS_CODE.OK).json(course)
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = Course.findById(courseId)
        if (!course) throw new Error('Not found')

        await Course.findByIdAndRemove(courseId)
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    }
}

const removeAll = async (req, res, next) => {
    try {
        await Course.deleteMany()
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = Course.findById(courseId)
        if (!course) throw new Error('Not found')

        const newCourse = req.body
        await Course.findByIdAndUpdate(courseId, newCourse)
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    } 
}

module.exports = {
    getAll,
    getAllOfAnUser,
    getOne,
    create,
    update,
    remove,
    removeAll,
}