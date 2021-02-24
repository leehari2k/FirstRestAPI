const { check, param } = require('express-validator')


exports.validateCourse = () => {
    return [
        check('name', 'name is require').not().isEmpty(),
        check('name', 'name must be Alphabet').isAlpha(),
        check('name', 'name must be maximum 10 digits').isLength({ max: 10,}),        
    ]
}
exports.validateParamCourseId = () => {
    return [
        param('courseId', 'courseId is invalid').custom(str => /^[a-zA-Z0-9]{24}$/.test(str))
    ]
}