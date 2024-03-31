const Student = require('../Model/StudentModel');

const StudentFeedback = async (req, res) => {
    try {

        const newStudent = new Student({
            session: req.body.session,
            program: req.body.program,
            branch: req.body.branch,
            semester: req.body.semester,
            year: req.body.year,
            questionRating:req.body.questionRating
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({ message: 'Student Feedback Submitted successfully', student: savedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {StudentFeedback,getAllStudents};
