const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const homeController = require("./controller/homeController");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localstorage');
}

app.get("/signup", homeController.getSignUp);

app.get("/signin", homeController.getSignIn);

app.get("/", homeController.getIndex);

app.get("/profil", homeController.getProfil);

app.post("/signin", homeController.postSignIn);

app.post("/signup", homeController.postSignUp);

app.get("/filActualite", homeController.getfilActualite);

app.get("/create", homeController.create);

app.post("/create", homeController.createpost);

app.get("/details/:id", homeController.details);

app.put("/details/:id", homeController.Update);

app.delete("/delete/:id", homeController.delete);

app.get("/ajoutAmis", homeController.AjoutAmis);

app.get("/users/search/:query", homeController.getAmis)

app.listen(3000, () => {
    console.log("Votre serveur demarre par la porte 3000");
});