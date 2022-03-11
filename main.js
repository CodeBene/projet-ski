const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get("/signup", (request, response) =>{
    response.render("signup")
})

app.get("/signin", (request, response) =>{
    response.render("signin")
})

app.get("/", (request, response) =>{
    response.redirect("signin")
})

app.post("/profil", (request, response)=>{
    let user = {
        name: request.body.name,
    };
    axios.post("https://ski-api.herokuapp.com/signup", user)
    .then(resultat =>   {
        console.log(resultat.data);
        response.send(resultat.data)})
    .catch(erreur => response.send("Erreur"))
})

app.listen(3000, ()=>{
    console.log("Votre serveur demarre par la porte 3000")
})