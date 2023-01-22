const express = require('express');
const router = express.router();
const { login, signup } = require('../controllers/auth.js');

router.post('./signup', signup);
router.post('./login', login);

module.exports = router;
