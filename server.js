require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// access the routes defined in the other folder routes inside the file workouts.js
// we require it using the path to that file
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// Middleware

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// route handler
// now the workout routes or the request handlers are fired only when we go to the /api/workouts path
// 
app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// mongoose.connect is the promise , and .then and .catch 
// are used to handle the promises. the . then function takes
// the callback function app.listen which is executed only when 
// the promise is successfully completed.

// we can also define the routes here doing
// app.get("/", () => {})
// but defining routes separately is a clean way of doing it.


//  tried understanding the meaning of asynchronous operations again
// File I/O: database queries examples of asyncrohonous operations
// arrow functions and traditional functions , how => have surrounding scope
// how await cannot be used without async
// The await keyword is used inside an async function to wait
//  for the resolution of a Promise. It allows you to pause the
//  execution of the function until the Promise is resolved or rejected.
// instead of using await and async we can also use then and catch instead
// 