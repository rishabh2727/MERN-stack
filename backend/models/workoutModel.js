
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: { 
        type: Number,
        required: true
    },
    load: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports= mongoose.model('Workout', workoutSchema)

// we make a schema that adds structure to our model
// we do this usng the property of mongoose
// schema makes sure the user enters or stores the data in this 
// particular format. timesteps is used to know the time when the 
// document was open.
// The mongoose.model method creates the actual model.
// This code uses Mongoose's Schema to define the structure of the workout document,
//  including fields like title, load, and reps
