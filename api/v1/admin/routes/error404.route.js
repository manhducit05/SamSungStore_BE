const express = require('express')
const router = express.Router();

const controller = require("../controllers/error404.controller")

router.get("/", controller.index)

module.exports = router;