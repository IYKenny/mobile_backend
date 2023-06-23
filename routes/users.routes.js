const express = require('express');
const { registerUser } = require('../controllers/users.controller');
const router = express.Router();

router.post("/", registerUser);

module.exports = router;