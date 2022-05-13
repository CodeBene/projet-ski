const axios = require("axios");

exports.postSignIn = (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    var data = { email: email, password: password };
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/login',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data)
        
    };

    axios(config)
        .then(function (res) {
            localStorage.setItem("token", res.data.token);
            response.redirect("/filActualite");
        })
        .catch(function (error) {
            response.send(`Désolé, vous n'avez pas de compte. Merci de vous <a href="signup">inscrire</a>.`);
        })
};
