const express = require('express')

const memberController = require('../controllers/member')

const { createMember } = require('../middleware/router_validator/schema/member')
const { validateBody } = require('../middleware/router_validator/body')

const router = express.Router()

router.route('/courses/:courseId/members')
    .get(memberController.getAllMembers)
    .post(createMember(),validateBody(),memberController.createMember)
    
module.exports = router