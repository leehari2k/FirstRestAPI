const express = require('express')

const courseController = require('../controllers/course')

const { 
    validateCourse, validateParamCourseId 
} = require('../middleware/router_validator/schema/course')
const { validate } = require('../middleware/router_validator/body')

const router = express.Router()

router.route('/courses')
    .get(courseController.getAllCourses)
    .post(validateCourse(), validate(), courseController.createCourse)
    .delete(courseController.deleteAllCourses)

router.route('/courses/:courseId')
    .get(validateParamCourseId(), validate(), courseController.getCourse)
    .put(validateParamCourseId(), validate(), courseController.replaceCourse)
    .patch(validateParamCourseId(), validate(), courseController.updateCourse)
    .delete(validateParamCourseId(), validate(), courseController.deleteCourse)

module.exports = router

