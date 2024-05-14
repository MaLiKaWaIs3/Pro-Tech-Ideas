const express = require("express");
const router = express.Router();
const expertAuth = require("./middlewares/expertAuth.js");

const {
    getStudents,
    getStudentById,
    saveStudent,
    updateStudent,
    deleteStudent,
    getStudentHistory
} = require('../controllers/StudentController.js')



router.get('/patients', getStudents);
router.get('/patients/:id', getStudentById);
router.post('/patients', saveStudent);
router.patch('/patients/:id', updateStudent);
router.delete('/patients/:id', deleteStudent);
router.get('/patients/history/:id', expertAuth,getStudentHistory);


module.exports = router