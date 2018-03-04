"use strict";

import express = require("express");
import * as cp from "child_process";
let router = express.Router();

// let sw = "off";

router.get("/on", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.log("On");
    // if (sw === "off") {
    //     sw = "on";
    // }
    // res.json(sw);
    cp.exec("bin/light.sh on", () => {
        res.json("on");
    });
});

router.get("/off", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.log("Off");
    // if (sw === "on") {
    //     sw = "off";
    // }
    // res.json(sw);
    cp.exec("bin/light.sh off", () => {
        res.json("off");
    });
});

router.get("/status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.log("status");
    // res.json(sw);
    cp.exec("bin/light.sh status", (err, stdout, stderr) => {
        let status = null;
        if (stdout.trim() === "1") {
            status = "on";
        } else {
            status = "off";
            }
        res.json(status);
    });
});

export default router;
