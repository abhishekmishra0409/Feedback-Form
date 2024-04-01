const Alumni = require('../Model/AlumniModel');

const AlumniFeedback = async (req, res) => {
    try {

        const {name, enrollment, passout, course, branch, currentStatus, mail, description, questionRatings} = req.body;

        const newAlumni = new Alumni({
            name,
            enrollment,
            passout,
            course,
            branch,
            currentStatus,
            mail,
            description,
            questionRatings
        });

        const savedAlumni = await newAlumni.save();

        res.status(201).json({ message: 'Alumni Feedback submitted successfully', alumni: savedAlumni });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAlumni = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Alumni.find(JSON.parse(queryStr))

        const alumni = await query;
        const totalCount = await Alumni.countDocuments(JSON.parse(queryStr));

        res.status(200).json({
            success: true,
            total: totalCount,
            alumni
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { AlumniFeedback , getAllAlumni};
