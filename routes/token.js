const express = require('express');
const { buyToken, getAllTokensByMeter,getTokenInfo } = require('../controllers/tokens');
const router = express.Router();

router.post("/", buyToken);
router.get("/:meterNumber", getAllTokensByMeter);
router.get("/validate/token/:token/:meterNumber", getTokenInfo);

module.exports = router;