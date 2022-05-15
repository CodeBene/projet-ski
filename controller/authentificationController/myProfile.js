const axios = require("axios");

exports.getMyProfile = (request, response) => {
    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'https://ski-api.herokuapp.com/tokenInfo',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        data: { 'token': token }
    };

    axios(config)
        .then(function (res) {
            var config = {
                method: 'get',
                url: 'http://ski-api.herokuapp.com/friend',
                headers: { 'Content-Type': 'application/json', 'Authorization': token  }
              };
              
              axios(config)
              .then(function (res2) {
                response.render("profil", {profil : res.data, friends : res2.data});
                console.log(JSON.stringify(res.data));
              })
              .catch(function (error) {
                console.log(error);
              });
            
        })
        .catch(function (error) {
            response.send(`Désolé, vous n'avez pas de compte. Merci de vous <a href="signup">inscrire</a>.`);
        })
};
