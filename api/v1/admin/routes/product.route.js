const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware')
const uploadCloud = require("../middlewares/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()

const controller = require("../controllers/product.controller")

router.get("/", controller.index)
router.get("/detail/:slug", controller.detail)
router.post("/create", upload.single("thumbnail"), uploadCloud.upload, controller.create)
router.patch("/delete/:slug", controller.delete)

module.exports = router;
