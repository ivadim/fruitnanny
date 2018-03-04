"use strict";

import express = require("express");
let router = express.Router();

router.get("/random", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let result = { random_number: Math.random() };
    res.json(result);
});

export default router;
