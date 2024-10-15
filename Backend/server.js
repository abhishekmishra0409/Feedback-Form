const express = require('express')
const mongoose = require('mongoose')
const studentRoute = require('./Route/StudentRoute');
const facultyRoute = require('./Route/FacultyRoute');
const alumniRoute = require('./Route/AlumniRoute');
const cors = require('cors')
const morgan = require('morgan')

const app = express();
// const HOST = '192.168.1.71';
const PORT = 3000;
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
app.use("/student",studentRoute );
app.use("/faculty",facultyRoute );
app.use("/alumni",alumniRoute );


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect MongoDB", error);
    }
};

connectDB();

// allowed username and password
const allowedUsername = 'admin';
const allowedPassword = '123456';

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check
        if (username === allowedUsername && password === allowedPassword) {
            res.json({ message: 'Login successful' ,token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT,  () => {
    console.log(`Server is running on :${PORT}`);
});
