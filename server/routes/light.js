"use strict";
const express = require("express");
let exec = require('child_process').exec;
let router = express.Router();
router.get("/on", (req, res, next) => {
    exec("bin/light.sh on", function(){
        res.json("on");
    });     
})
router.get("/off", (req, res, next) => {
    exec("bin/light.sh off", function(){
        res.json("off");
    });
});
router.get("/status", (req, res, next) => {
    exec("bin/light.sh status", function(err, stdout, stderr){
	var status = null;
	if (stdout.trim() === "1") {
	    status = "on"
	} else {
	    status = "off"
        }
	res.json(status);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
