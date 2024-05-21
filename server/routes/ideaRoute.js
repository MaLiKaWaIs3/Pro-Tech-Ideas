const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/IdeaController');



router.post('/uploadideas', ideaController.saveIdeas);
router.get('/getideas', ideaController.getIdeas);
router.post('/addremarks', ideaController.saveRemark);

module.exports = router;
