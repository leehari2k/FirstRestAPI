const express = require('express')
const courseRoute = require('./routes/course')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

//app.use(bodyParser(''))
app.use(express.json())
app.use(bodyParser.json())
app.use('/', courseRoute)


//connect to mongodb  
mongoose.connect('mongodb://localhost:27017/courses', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Ket noi thanh cong"))
    .catch((error) => console.error('Ket noi that bai: ', error))


//error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    //response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listen on port: ${port}`))