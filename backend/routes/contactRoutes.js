const express = require('express');
const { sendContactQuery } = require('../controller/contactController');

const router = express.Router();

router.post('/', sendContactQuery);

module.exports = router;
