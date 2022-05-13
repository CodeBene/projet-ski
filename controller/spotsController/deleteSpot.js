const axios = require("axios");

exports.deleteSpot = (request, response) => {

    const id = request.params.id;

    let token = localStorage.getItem("token");

    var config = {
        method: 'delete',
        url: 'http://ski-api.herokuapp.com/ski-spot/' + id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token }
    };
    axios(config)
        .then(function (res) {
            response.redirect("/filActualite")
        })
        .catch(function (error) {
            console.log(error);
        });
}
