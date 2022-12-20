const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const port = process.env.PORT

connectDB() 


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`server started on port ${port}`))
