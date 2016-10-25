"use strict";

import express = require("express");
let router = express.Router();

let sw = "off";

router.get("/on", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("On");
    if (sw === "off") {
        sw = "on";
    }
    res.json(sw);
});

router.get("/off", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("Off");
    if (sw === "on") {
        sw = "off";
    }
    res.json(sw);
});

router.get("/status", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("status");
    res.json(sw);
});

export default router;
