const { validationResult } = require('express-validator')

exports.validateBody = () => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          return next()
        }
        return res.status(422).json(errors.array())
    }
}