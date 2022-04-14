const axios = require("axios"); 

const url = require("url");


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

    const page = url.parse(request.url, true).query.page;


    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot?page='+page+'&limit=10',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },

      };
      console.log(config)
      
      axios(config)
      .then(function (res) {
          console.log(res.data)
        response.render("filActualite", {skiSpots : res.data.skiSpots, totalPages : res.data.totalPages})
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
  console.log(JSON.stringify(res.data));
})
.catch(function (error) {
  console.log(error);
});
};

exports.details = (request, response)=>{
    const what =  request.params;
    const id = what.id
    console.log(id);
    console.log("request.params ***************",id);

    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot/'+id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        
      };
      console.log(config)
      axios(config)
      .then(function (res) {console.log(res.data)

          response.render("details", res.data)
          //console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
          console.log("Sorry")
        //console.log(error);
      });
};


exports.Update = (request, response)=>{
    const name = request.body.name;
    const description = request.body.description;
    const address = request.body.address;
    const difficulty = request.body.difficulty;

    let token = localStorage.getItem("token");
    var data = { name : name, description : description, address : address, difficulty : difficulty};

    const id = request.params.id;

    var config = {
        method: 'put',
        url: 'http://ski-api.herokuapp.com/ski-spot/'+id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        data : JSON.stringify(data)
      };
      
      axios(config)
      .then(function (res) {
          response.redirect("/create")
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

}


exports.delete = (request, response)=>{
    
    const id = request.params.id; 

    let token = localStorage.getItem("token");

    var config = {
         method: 'delete',
         url: 'http://ski-api.herokuapp.com/ski-spot/'+id,
         headers: { 'Content-Type': 'application/json', 'Authorization': token }
        };
        axios(config)
        .then(function (res) {
            response.redirect("/filActualite");
            console.log("Bravo")
            //console.log(JSON.stringify(res.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    