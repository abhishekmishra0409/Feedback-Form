const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/feedback', {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a Mongoose schema
const feedbackSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    branch: String,
    semester: String,
    yearOfAdmission: String,
    emailId: String,
    questionRatings: [Number],
});

// Create a Mongoose model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/submit-feedback', async (req, res) => {
    const {
        name,
        rollNo,
        branch,
        semester,
        yearOfAdmission,
        emailId,
        questionRatings,
    } = req.body;

    try {
        // Check for duplicate enrollment numbers
        const existingFeedback = await Feedback.findOne({ rollNo });

        if (existingFeedback) {
            return res.json({ error: 'Enrollment number has already been used.' });
        }

        // Create a new feedback instance
        const newFeedback = new Feedback({
            name,
            rollNo,
            branch,
            semester,
            yearOfAdmission,
            emailId,
            questionRatings,
        });

        // Save the feedback to MongoDB
        await newFeedback.save();

        // Process and store the feedback data as needed (you can save it to a database)
        // For simplicity, logging it to the console here
        console.log('Feedback Submitted:');
        console.log('Name:', name);
        console.log('Enrollment No:', rollNo);
        console.log('Branch:', branch);
        console.log('Semester:', semester);
        console.log('Year of Admission:', yearOfAdmission);
        console.log('Email ID:', emailId);
        console.log('Question Ratings:', questionRatings);

        return res.json({ success: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error in submitting feedback:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
