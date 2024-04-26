const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    subject:{
        type:String,
        required:true
    },
    facultyName:{
        type:String,
        required:true
    },
    questionRating: [{
            type: Number,
            required: true,
            min: 1,
            max: 5
    }]
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
