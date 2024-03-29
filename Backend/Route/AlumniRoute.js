const express = require('express');
const router = express.Router();
const alumniController = require('../Controller/AlumniController');

router.post('/feedback', alumniController.AlumniFeedback);
router.get('/', (req,res)=>{
    res.send("Heyyy jiii or sb bdiya")
});
module.exports = router;
