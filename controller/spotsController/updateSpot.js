const axios = require("axios");

exports.updateSpot = (request, response) => {
    const name = request.body.name;
    const description = request.body.description;
    const address = request.body.address;
    const difficulty = request.body.difficulty;

    let token = localStorage.getItem("token");
    var data = { name: name, description: description, address: address, difficulty: difficulty };

    const id = request.params.id;

    var config = {
        method: 'put',
        url: 'http://ski-api.herokuapp.com/ski-spot/' + id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        data: JSON.stringify(data)
    };

    axios(config)
        .then(function (res) {
            response.redirect("/createSpot")
        })
        .catch(function (error) {
            console.log(error);
        });

};