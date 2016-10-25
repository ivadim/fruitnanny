"use strict";
const dht_1 = require("./routes/dht");
const express = require("express");
const light_1 = require("./routes/light");
let app = express();
let config = {
    baby_birthday: "2016-03-15",
};
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/public", express.static("public"));
app.get("/", (req, res, next) => {
    res.render("index", { config });
});
app.use("/api/light", light_1.default);
app.use("/api/dht", dht_1.default);
app.listen(7000, () => {
    console.log("Example app listening on port 7000!");
});
