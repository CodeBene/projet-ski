const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const router = require("./routes/routes");

app.set("view engine", "ejs");
const expressLayouts = require("express-ejs-layouts");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localstorage');
}

app.use(router)

app.listen(3000, () => {
    console.log("Votre serveur demarre par la porte 3000");
});