const axios = require("axios");

exports.addFriends = (request, response) => {
  const friendID = request.params.id;
  let token = localStorage.getItem("token");

  var data = { friendId: friendID };

  var config = {
    method: 'post',
    url: 'http://ski-api.herokuapp.com/friend',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    data: data
  };

  axios(config)
    .then(function (res) {
      response.redirect('/profil');
      console.log(JSON.stringify(res.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}