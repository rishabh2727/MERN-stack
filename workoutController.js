
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)

}

// get a single workout
const getsingleWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
        // this makes sure that we do not get an internal error if we are unable to find 
        // the id and does not stop the server we try checking if the id is unvalid before
        // doing the workout.findbyid otherwise the server stops running cause of the error.
        // if the id is valid the program continues
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: "No such workout Workout exists"})
    }
    // we make sure to retur the status so that the program does not continue executing
    res.status(200).json(workout)
    }
     
// create a workout
const createWorkout = async (req,res) => {
    const {title,load,reps} = req.body


let emptyFields = []

if (!title) {
    emptyFields.push('title')
  }
if (!load) {
    emptyFields.push('load')
  }
if (!reps) {
    emptyFields.push('reps')
  }
if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

    try{
        // creating a new workout document named 'workout'
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)

    }catch(error){
        res.status(400).json({error: error.message})

    }
}

// delete a workout

const deleteWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error: "No such workout Workout exists"})
    }
    // we make sure to retur the status so that the program does not continue executing
    res.status(200).json(workout)
    }


// update a workout

const updateWorkout = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id:id}, {...req.body})

    if(!workout){
        return res.status(404).json({error: "No such workout Workout exists"})
    }
    // we make sure to retur the status so that the program does not continue executing
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getsingleWorkout,
    deleteWorkout,
    updateWorkout
}

// we have to keep in mind we are making the functions here that 
// basically handle the requests made. 
// there are several requests either to get all workouts or delete a single workout 
// then we export these functions from here and require it in the routes folder file 
// and put the name of the function in the router.get function which fires it. 


// general knowledge:  in js
// you can declare a function using the function keyword.

// function myFunction(parameter1, parameter2) {
    // Function body
    // console.log(parameter1, parameter2);
// }

// You can also create functions as expressions and assign them to variables.
 // const myFunction = function(parameter1, parameter2) {
     // Function body
//     console.log(parameter1, parameter2);
// };

// Arrow functions provide a more concise syntax for function expressions.

// const myFunction = (parameter1, parameter2) => {
//     // Function body
//     console.log(parameter1, parameter2);
// }