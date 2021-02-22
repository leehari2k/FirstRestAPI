const handleError = (err, req, res, next) => {
   return  res.status(err.status).json({err: err.message})
}

module.exports = handleError
