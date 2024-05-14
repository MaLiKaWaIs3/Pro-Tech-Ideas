const express = require("express");
const router = express.Router();

const {
    getExperts,
    getExpertById,
    saveExpert,
    updateExpert,
    deleteExpert
} = require('../controllers/ExpertController.js')



router.get('/doctors', getExperts);
router.get('/doctors/:id', getExpertById);
router.post('/doctors', saveExpert);
router.patch('/doctors/:id', updateExpert);
router.delete('/doctors/:id', deleteExpert);

module.exports = router