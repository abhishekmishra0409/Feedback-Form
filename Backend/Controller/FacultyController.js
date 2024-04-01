const Faculty = require('../Model/FacultyModel');
const Student = require("../Model/StudentModel");

const FacultyFeedback = async (req, res) => {
    try {
        const newFaculty = new Faculty({
            department: req.body.department,
            session: req.body.session,
            questionRating: req.body.questionRating
        });

        const savedFaculty = await newFaculty.save();

        res.status(201).json({ message: 'Faculty Feedback Submitted successfully', faculty: savedFaculty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllFaculty = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Faculty.find(JSON.parse(queryStr))

        const faculty = await query;
        const totalCount = await Faculty.countDocuments(JSON.parse(queryStr));

        res.status(200).json({
            success: true,
            total: totalCount,
            faculty
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { FacultyFeedback , getAllFaculty};
