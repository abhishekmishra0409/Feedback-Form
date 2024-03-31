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
        const queryObj = { ...req.query };
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Student.find(JSON.parse(queryStr))

        const students = await query;
        const totalCount = await Student.countDocuments(JSON.parse(queryStr));

        res.status(200).json({
            success: true,
            total: totalCount,
            students
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {StudentFeedback,getAllStudents};
