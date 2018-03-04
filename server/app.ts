"use strict";

import * as config from "../fruitnanny_config";
import custom_button from "./routes/custom_button";
import dht from "./routes/dht";
import express = require("express");
import light from "./routes/light";

let app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/public", express.static("public"));

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction)  => {
  res.render("index", { config });
});

app.get("/settings", (req: express.Request, res: express.Response, next: express.NextFunction)  => {
    res.render("settings", { config });
  });

app.use("/api/light", light);
app.use("/api/dht", dht);
app.use("/api/custom_button", custom_button);

app.listen(7000, () => {
    console.log("Fruitnanny app listening on port 7000!");
});
