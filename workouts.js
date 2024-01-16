
const express = require('express')

const {
    createWorkout,
    getWorkouts,
    getsingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// Now, we use the Workout model in our application, for example, in our route handling code:
// const Workout = require('../models/workoutModel')
// the .. notation is used to traverse up one directory level in the file system

// further in the videos we do only keep the defining routes part here for clarity
// and what to do in each routes we do that in a separate file named workoutController

const router = express.Router()

router.get('/', getWorkouts)

router.get('/:id', getsingleWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

// we want to use these routes defined here on the server.js 
//  so we export it from here and then require it in our file server.js
module.exports = router

// add all the request handlers here


