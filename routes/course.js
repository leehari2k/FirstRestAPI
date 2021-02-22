const express = require('express')


const courseController = require('../controllers/course')
const memberController = require('../controllers/member')

const { create } = require('../middleware/router_validator/schema/course')
const { validateBody } = require('../middleware/router_validator/body')


//CRUD create, read, update, delete

const router = express.Router()

router.route('/courses')
    .get(courseController.getAllCourses)
    .post(validateBody(create),courseController.createCourse)

router.route('/courses/:courseId')
    .get(courseController.getCourse)
    .put(courseController.replaceCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

router.route('/courses/:courseId/members')
    .get(memberController.getAllMembers)
    .post(memberController.createMember)
    
module.exports = router

