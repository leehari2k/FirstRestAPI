const { check } = require('express-validator')

exports.validateMember = () => {
    return [
        check('name', 'name is require').not().isEmpty(),
        check('name', 'name is maximum 10 digits').isLength({ max: 10 }),
        check('name', 'name is alphabet').isAlpha(),
        check('email', 'email is format of email').isEmail(),
        check('age', 'age must more than 17').isInt({ min: 18 }),
        check('phone', 'Phone is require').not().isEmpty(),
        check('phone', 'Invalid does not phoneNumber').custom(str => /^0\d{9}$/.test(str)),
    ]
}