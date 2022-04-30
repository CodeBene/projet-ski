const axios = require("axios");

exports.createpost = (request, response) => {

    const name = request.body.name;
    const description = request.body.description;
    const address = request.body.address;
    const difficulty = request.body.difficulty;

    let token = localStorage.getItem("token");
    var data = { name: name, description: description, address: address, difficulty: difficulty };

    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/ski-spot',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        data: data
    };

    axios(config)
        .then(function (res) {
            response.redirect("/filActualite")
        })
        .catch(function (error) {
            console.log(error);
        });
};
