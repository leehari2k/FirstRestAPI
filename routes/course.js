const express = require('express')

const courseController = require('../controllers/course')

const { createCourse } = require('../middleware/router_validator/schema/course')
const { validateBody } = require('../middleware/router_validator/body')

const router = express.Router()

router.route('/courses')
    .get(courseController.getAllCourses)
    .post(createCourse(),validateBody(),courseController.createCourse)
    .delete(courseController.deleteAllCourses)

router.route('/courses/:courseId')
    .get(courseController.getCourse)
    .put(courseController.replaceCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports = router

