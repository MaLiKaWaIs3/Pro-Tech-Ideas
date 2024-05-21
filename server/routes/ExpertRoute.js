const express = require("express");
const router = express.Router();

const {
    getExperts,
    getExpertById,
    saveExpert,
    updateExpert,
    deleteExpert
} = require('../controllers/ExpertController.js')



router.get('/experts', getExperts);
router.get('/experts/:id', getExpertById);
router.post('/experts', saveExpert);
router.patch('/experts/:id', updateExpert);
router.delete('/experts/:id', deleteExpert);

module.exports = router