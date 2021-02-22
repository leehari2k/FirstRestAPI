const { check } = require('express-validator')

module.exports.create = () => {
    return [
        check('name','name is require').not().isEmpty(),
        check('name','name must be Alphabet').isAlpha(),
        check('name','name must be maximum 10 digits').isLength(
            {
                max: 10,
            }
        ),
    ]
}

