const courses = require('../models/course')

const getAllCourses = (req,res) => {
    return res.send(courses)
}

const createCourse = (req, res) => {
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    return res.send(course)
}

const getCourse = (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send(`Not found`)
    return res.send(course)
}

const updateCourse = (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Not found')

    course.name = req.body.name
    return res.send(course)
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
    deleteCourse
}