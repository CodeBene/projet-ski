const axios = require("axios");

const url = require("url");

exports.getfilActualite = (request, response) => {
    const page = url.parse(request.url, true).query.page;

    let token = localStorage.getItem("token");
    var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/ski-spot?page=' + page + '&limit=10',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },

    };

    axios(config)
        .then(function (res) {
            response.render("filActualite", { skiSpots: res.data.skiSpots, totalPages: res.data.totalPages })
        })
        .catch(function (error) {
            console.log(error);
        });
};
