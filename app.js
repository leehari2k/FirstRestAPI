const express = require('express')
const courseRoute = require('./routes/course')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use('/api', courseRoute)


//connect to mongodb  

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Ket noi thanh cong"))
    .catch(() => console.log('Ket noi that bai'))

const port = process.env.PORT || 3000
//const port = app.get('port') || 3000
app.listen(port, () => console.log(`Listen on port: ${port}`))
