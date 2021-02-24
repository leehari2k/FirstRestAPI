const express = require('express')

const controller = require('../controllers/user.controller')

const { validateMember } = require('../middleware/router_validator/schema/user.validate')
const { validateParamCourseId  } = require('../middleware/router_validator/schema/post.validate')
const { validate } = require('../middleware/router_validator/validate')

const router = express.Router()

router.route('/courses/:courseId/members')
    .get(validateParamCourseId(), validate(), controller.getAllMembers)
    .post(validateParamCourseId(), validateMember(), validate(), controller.createMember)
    
module.exports = router