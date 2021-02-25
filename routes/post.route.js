const express = require('express')

const controller = require('../controllers/post.controller')

const { validateParamUserID } = require('../middleware/router_validator/schema/user.validate')
const { 
    validateParamPostId, validatePost
} = require('../middleware/router_validator/schema/post.validate')
const { getValidationResult } = require('../middleware/router_validator/validate')

const router = express.Router()

router.route('/posts')
    .get(controller.getAll)
    .delete(controller.removeAll)

router.route('/:userID/posts/')
    .get(validateParamUserID(), getValidationResult(), controller.getAllOfAnUser)
    .post(validateParamUserID(), validatePost(), getValidationResult(), controller.create)

router.route('/:userID/posts/:postID')
    .post(validateParamUserID(), validateParamPostId(), validatePost(), getValidationResult(), controller.update)
    .delete(validateParamUserID(), validateParamPostId(), getValidationResult(), controller.remove)
    
router.route('/posts/:postID')
    .get(validateParamPostId(), getValidationResult(), controller.getOne)

router.route('/posts/:postID/comments') //get all comments of a post  
router.route('/posts/:postID/:commentID') //get the comment with id 

module.exports = router

