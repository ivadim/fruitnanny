"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cp = require("child_process");
let router = express.Router();
router.get("/current", (req, res, next) => {
    cp.exec("bin/dht22.py", (err, stdout, stderr) => {
        let values = stdout.split(" ");
        let t = values[0];
        let h = values[1];
        let result = { humidity: h, temperature: t };
        res.json(result);
    });
});
exports.default = router;
