"use strict";
const express = require("express");
let router = express.Router();
let sw = "off";
router.get("/on", (req, res, next) => {
    console.log("On");
    if (sw === "off") {
        sw = "on";
    }
    res.json(sw);
});
router.get("/off", (req, res, next) => {
    console.log("Off");
    if (sw === "on") {
        sw = "off";
    }
    res.json(sw);
});
router.get("/status", (req, res, next) => {
    console.log("status");
    res.json(sw);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
