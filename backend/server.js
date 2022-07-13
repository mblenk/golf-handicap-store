require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const handicapRoutes = require('./routes/handicapRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

//middleware
app.use(express.json())
app.use(cors({
     origin: true, 
     credentials: true 
}))
app.use(cookieParser())

//routes
app.use('/user', authRoutes)
app.use('/api/handicap', handicapRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on selected port')
            console.log('Connected to db')
        })
    })
    .catch((error) => {
        console.log(error)
    })


