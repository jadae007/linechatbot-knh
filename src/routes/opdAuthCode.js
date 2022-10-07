const express = require("express");
const router = express.Router();
const opdAuthCodeController = require('../controllers/opdAuthCodeController')

router.get("/",opdAuthCodeController.index);

module.exports = router;