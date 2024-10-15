const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    questionRating: [{
        type: Number,
        required: true,
    }]
});


const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
