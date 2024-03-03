const express = require("express");
const { generateNewShortURL, getAnalytics } = require("../controllers/url");

const router = express.Router(); // Properly initialize express.Router()

router.post('/', generateNewShortURL);
// router.get('/:shortId', visit); 
router.get('/analytics/:shortId',getAnalytics)

module.exports = router;
