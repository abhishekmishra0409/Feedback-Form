const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollment: {
        type: String,
        required: true
    },
    passout: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    questionRatings: [{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }]
});


const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;
