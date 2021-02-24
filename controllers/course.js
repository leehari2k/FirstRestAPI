const Course = require('../models/course')
const {
    HTTP_STATUS_CODE
} = require('../constant')

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({})
        return res.status(HTTP_STATUS_CODE.OK).json({courses})
    } catch (err) {
        next(err)
    }
}

const createCourse = async (req, res, next) => { 
    try {
        const newCourse = new Course({
            name: req.body.name,
            des: req.body.des,
            members: req.body.members
        })
        await newCourse.save()
        return res.status(HTTP_STATUS_CODE.CREATE).json({course: newCourse})
    } catch (err) {
        next(err)
    }
}

const getCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
        if (!course) throw new Error('Not found')
        return res.status(HTTP_STATUS_CODE.OK).json(course)
    } catch (err) {
        next(err)
    }
}

const replaceCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = Course.findById(courseId)
        if (!course) throw new Error('Not found')

        const newCourse = req.body
        await Course.findByIdAndUpdate(courseId, newCourse)
        return res.status(HTTP_STATUS_CODE.OK).json({success: true})
    } catch (err) {
        next(err)
    } 
}

const updateCourse = async (req, res, next) => {
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

const deleteCourse = async (req, res, next) => {
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

const deleteAllCourses = async (req, res, next) => {
    try {
        await Course.deleteMany()
        return res.status(HTTP_STATUS_CODE.OK).json({ success: true })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    replaceCourse,
    deleteCourse,
    deleteAllCourses,
}