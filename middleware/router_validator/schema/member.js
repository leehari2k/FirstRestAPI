const { check } = require('express-validator')

module.exports.createMember = () => {
    return [
        check('name','name is require').not().isEmpty(),
        check('name','name is maximum 10 digits').isLength({ max: 10 }),
        check('name','name is alphabet').isAlpha(),
        check('email','email is format of email').isEmail(),
        check('age','age must more than 17').isNumeric({ min: 18 })
    ]
}