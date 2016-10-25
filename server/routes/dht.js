"use strict";
const express = require("express");
let router = express.Router();
router.get("/current", (req, res, next) => {
    console.log("On");
    let temp = Math.random() * (30 - 10) + 10;
    let hum = Math.random() * 100;
    let result = { humidity: hum, temperature: temp };
    res.json(result);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
