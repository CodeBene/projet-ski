const axios = require("axios");

exports.postSignUp = (request, response) => {

    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    var data = { name: name, email: email, password: password }
    console.log(data);

    var config = {
        method: 'post',
        url: 'http://ski-api.herokuapp.com/signup',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data)
    };
    axios(config)
        .then(function (res) {
            response.render("signin", res.data);
        })
        .catch(function (error) {
            console.log(error);
        })
};