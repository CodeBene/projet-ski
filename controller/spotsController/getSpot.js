const axios = require("axios");

exports.getSpot = (request, response) => {
    const id = request.params.id;

    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot/' + id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token },

    };
    axios(config)
        .then(function (res) {
            response.render("spot", res.data)
        })
        .catch(function (error) {
            console.log(error);
        });
};
