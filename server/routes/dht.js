"use strict";
const express = require("express");
let exec = require('child_process').exec;
let router = express.Router();
router.get("/current", (req, res, next) => {
    exec("bin/dht22.py", function(err, stdout, stderr){
        let values = stdout.split(" "); 
        let t = values[0];
        let h = values[1];
        let result = { humidity: h, temperature: t };
        res.json(result);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
