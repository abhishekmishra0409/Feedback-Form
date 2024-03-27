const express = require('express');
const router = express.Router();
const {StudentFeedback,getAllStudents} = require('../Controller/StudentController');

router.post('/feedback', StudentFeedback);
router.get("/",getAllStudents)

module.exports = router;
