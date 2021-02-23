const express = require('express')

const memberController = require('../controllers/member')

const { validateMember } = require('../middleware/router_validator/schema/member')
const { validateParamCourseId  } = require('../middleware/router_validator/schema/course')
const { validate } = require('../middleware/router_validator/body')

const router = express.Router()

router.route('/courses/:courseId/members')
    .get(validateParamCourseId(), validate(), memberController.getAllMembers)
    .post(validateParamCourseId(), validateMember(), validate(), memberController.createMember)
    
module.exports = router