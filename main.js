const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/signup", (request, response) =>{
    response.render("signup")
})

app.get("/signin", (request, response) =>{
    response.render("signin")
})

app.get("/", (request, response) =>{
    response.redirect("signin")
})

app.post("/signin", (request, response)=>{
    console.log(request);
    const email = request.body.email;
    const password = request.body.password;

    var data = '{"email":"'+ email+'","password":"' +password+'"}';
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/login',
        headers: {'Content-Type': 'application/json'},
        data : data
    };

axios(config)
.then(function (res) {
    response.render("profil", res.data)
})
.catch(function (error) {
  response.send("Désolé, vous n'avez pas un compte, merci de vous s'inscrire");
});
})

app.post("/signup", (request, response)=>{
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    var data = '{"name":"'+name+'","email":"'+ email+'","password":"' +password+'"}';

    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/signup',
        headers: {'Content-Type': 'application/json'},
        data : data
    };
    axios(config)
    .then(function (res) {
    response.render("profil", res.data)
})
    .catch(function (error) {
    console.log(error);
});
})

app.listen(3000, ()=>{
    console.log("Votre serveur demarre par la porte 3000")
})