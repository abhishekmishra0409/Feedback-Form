const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Enrollment: {
        type: String,
        required: true
    },
    CompletionYear: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Program: {
        type: String,
        required: true
    },
    CurrentStatus: {
        type: String,
        required: true
    },
    questionRating: [{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }]
});


const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;
