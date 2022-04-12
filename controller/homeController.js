const axios = require("axios"); 
const { response } = require("express");
const { request } = require("express");


exports.getSignUp = (request, response) =>{
    response.render("signup")
};

exports.getSignIn = (request, response)=>{
    response.render("signin")
};

exports.getIndex = (request, response) =>{
    response.render("signin")
};


exports.getProfil = (request, response) =>{
    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'https://ski-api.herokuapp.com/tokeninfo',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        data : {'token': token}
    };

    axios(config)
    .then(function (res) {
        response.render("profil", res.data);
    })
    .catch(function (error) {
        response.send(`Désolé, vous n'avez pas de compte. Merci de vous <a href="signup">inscrire</a>.`);
    })};

exports.postSignIn = (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    /* var data = '{"email":"'+ email+'","password":"' +password+'"}'; */
    var data = {email : email, password : password};

    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/login',
        headers: {'Content-Type' : 'application/json'},
        data : JSON.stringify(data)
    };

axios(config)
.then(function (res) {
    localStorage.setItem("token", res.data.token);
    response.redirect("/filActualite");
})
.catch(function (error) {
  response.send(`Désolé, vous n'avez pas de compte. Merci de vous <a href="signup">inscrire</a>.`);
})};

exports.postSignUp = (request, response) =>{

        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;
    
        /* var data = '{"name":"'+name+'","email":"'+ email+'","password":"' +password+'"}'; */

        var data = { name : name, email : email, password : password}
    
        var config = {
            method: 'post',
            url: 'https://ski-api.herokuapp.com/signup',
            headers: {'Content-Type': 'application/json'},
            data : JSON.stringify(data)
        };
        axios(config)
        .then(function (res) {
            response.render("profil", res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

exports.getfilActualite = (request, response)=>{
    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot/',
        headers: { 'Content-Type': 'application/json', 'Authorization': token }

      };
      
      axios(config)
      .then(function (res) {
        response.render("filActualite", {skiSpots : res.data.skiSpots})
       //console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

exports.create = (request, response)=>{
    response.render("create")
}

exports.createpost = (request, response)=>{

    const name = request.body.name;
    const description = request.body.description;
    const address = request.body.address;
    const difficulty = request.body.difficulty;

    let token = localStorage.getItem("token");
    var data = { name : name, description : description, address : address, difficulty : difficulty};
    
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/ski-spot',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        data : data
    };

axios(config)
.then(function (res) {
  response.redirect("/filActualite")
  //console.log(JSON.stringify(res.data));
})
.catch(function (error) {
  console.log(error);
});
};

exports.details = (request, response)=>{
    const id =  request.params.id;

    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot/'+id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        
      };
      console.log(config)
      axios(config)
      .then(function (res) {
         // console.log("AlLO");
          response.render("details", res.data);
          //console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
          console.log("Sorry")
        console.log(error);
      });
};

exports.Update = (request, response)=>{

    
    const name = request.body.name;
    const description = request.body.description;
    const address = request.body.address;
    const difficulty = request.body.difficulty;

    let token = localStorage.getItem("token");
    let id = request.params.id; 

    var data = { name : name, description : description, address : address, difficulty : difficulty};

    var config = {
    method: 'put',
    url: 'http://ski-api.herokuapp.com/ski-spot/'+id,
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    data : data
    };

    console.log(config)

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}