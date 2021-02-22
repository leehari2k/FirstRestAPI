const bodyParser = require('body-parser')
const express = require('express')
const handleError = require('./middleware/handle_error/index')
const mongoose = require('mongoose')
const routes = require('./routes/course')
const routesMember = require('./routes/member')

const app = express()

app.use(bodyParser.json())
app.use(express.json())   
app.use('/', routes)
app.use('/', routesMember)

//connect to mongodb  
mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Ket noi thanh cong"))
    .catch((error) => console.error('Ket noi that bai: ', error))

//handle error
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = error.status || 500

    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})   

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listen on port: ${port}`))