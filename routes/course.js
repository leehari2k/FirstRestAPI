const express = require('express')
const router = express.Router()

const courseController = require('../controllers/course')

module.exports = router


router.route('/courses')
    .get(courseController.getAllCourses)
    .post(courseController.createCourse)

router.route('/courses/:courseId')
    .get(courseController.getCourse)
    .put(courseController.replaceCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)
    


