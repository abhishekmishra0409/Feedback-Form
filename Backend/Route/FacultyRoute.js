const express = require('express');
const router = express.Router();
const {FacultyFeedback,getAllFaculty} = require('../Controller/FacultyController');

router.post('/feedback', FacultyFeedback);
router.get("/",getAllFaculty)

module.exports = router;
