const Courses = require('../models/course')
const { json } = require('express')

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Courses.find({})
        return res.status(200).json({courses})
    } catch (err) {
        next(err)
    }
}

const createCourse = async (req, res, next) => { 
    try {
        const newCourse = new Courses(req.body)
        await newCourse.save()
        return res.status(201).json({course: newCourse})
    } catch (err) {
        next(err)
    }  
}

const getCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = await Courses.findById(courseId)
        if (!course) throw new Error('Not found')
        return res.status(200).json(course)
    } catch (err) {
        next(err)
    }
}

const replaceCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = Courses.findById(courseId)
        if (!course) throw new Error('Not found')

        const newCourse = req.body
        await Courses.findByIdAndUpdate(courseId, newCourse)
        return res.status(200).json({success: true})
    } catch (err) {
        next(err)
    } 
}

const updateCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const course = Courses.findById(courseId)
        if (!course) throw new Error('Not found')

        const newCourse = req.body
        await Courses.findByIdAndUpdate(courseId, newCourse)
        return res.status(200).json({success: true})
    } catch (err) {
        next(err)
    } 
}
const deleteCourse = (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Not found')

    const index = courses.indexOf(course)
    courses.splice(index,1)
    return res.send(course)
}


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    replaceCourse,
    deleteCourse
}