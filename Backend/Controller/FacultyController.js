const Faculty = require('../Model/FacultyModel');

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
        const faculty = await Faculty.find();
        res.status(200).json({ faculty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { FacultyFeedback , getAllFaculty};
