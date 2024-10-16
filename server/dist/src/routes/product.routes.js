"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(product_controller_1.getProducts)
    .post(product_controller_1.createProduct);
exports.default = router;
