const express = require('express')
const router = express.Router();

const controller = require("../controller/product-category.controller")

router.get("/", controller.index)
router.get("/:slug", controller.getProductsInCategory)


module.exports = router;
