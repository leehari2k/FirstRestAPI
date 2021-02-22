const { validationResult } = require('express-validator')

module.exports.validateBody = schema => {
    schema()
    return (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next()
        }   
        return res.status(errors.status).json({ errors: errors.message })
    }
}