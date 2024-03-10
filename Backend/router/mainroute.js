
const express = require('express');

const router = express.Router();

const mainpageController = require('../controller/mainpage');





router.get('/',mainpageController.gethomePage);
router.get('/chat',mainpageController.getChatPage);
module.exports = router; 