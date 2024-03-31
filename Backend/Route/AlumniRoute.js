const express = require('express');
const router = express.Router();
const alumniController = require('../Controller/AlumniController');

router.post('/feedback', alumniController.AlumniFeedback);
router.get('/', alumniController.getAllAlumni);
module.exports = router;
