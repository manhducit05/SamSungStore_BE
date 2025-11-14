const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware')
// const uploadCloud = require("../middlewares/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()

const controller = require("../controllers/account.controller")

router.get("/", authMiddleWare.requireAuth, controller.index)
// , uploadCloud.upload
router.post("/create", authMiddleWare.requireAuth, upload.single("avatar"), controller.create)
router.patch("/delete/:id", authMiddleWare.requireAuth, controller.delete)
router.get("/bin", authMiddleWare.requireAuth, controller.bin)
router.patch("/restore/:id", authMiddleWare.requireAuth, controller.restore)

router.post("/login", controller.login)
router.post("/checkToken", controller.checkToken)
router.get('/verify', authMiddleWare.requireAuth, controller.verifyAccount);

module.exports = router;