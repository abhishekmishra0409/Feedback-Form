const Alumni = require('../Model/AlumniModel');

const AlumniFeedback = async (req, res) => {
    try {

        const newAlumni = new Alumni({
            Name: req.body.Name,
            Enrollment: req.body.Enrollment,
            CompletionYear: req.body.CompletionYear,
            email: req.body.email,
            Program: req.body.Program,
            CurrentStatus: req.body.CurrentStatus,
            questionRating: req.body.questionRating
        });

        const savedAlumni = await newAlumni.save();

        res.status(201).json({ message: 'Alumni Feedback submitted successfully', alumni: savedAlumni });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.status(200).json({ alumni });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { AlumniFeedback , getAllAlumni};
