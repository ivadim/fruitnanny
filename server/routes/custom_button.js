"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
router.get("/random", (req, res, next) => {
    let result = { random_number: Math.random() };
    res.json(result);
});
exports.default = router;
