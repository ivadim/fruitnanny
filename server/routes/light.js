"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cp = require("child_process");
let router = express.Router();
router.get("/on", (req, res, next) => {
    cp.exec("bin/light.sh on", () => {
        res.json("on");
    });
});
router.get("/off", (req, res, next) => {
    cp.exec("bin/light.sh off", () => {
        res.json("off");
    });
});
router.get("/status", (req, res, next) => {
    cp.exec("bin/light.sh status", (err, stdout, stderr) => {
        let status = null;
        if (stdout.trim() === "1") {
            status = "on";
        }
        else {
            status = "off";
        }
        res.json(status);
    });
});
exports.default = router;
