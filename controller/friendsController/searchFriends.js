//recherche d'amis et affichag
const axios = require("axios");

exports.getFriends = (request, response) => {
  let query = request.query.search;
  let token = localStorage.getItem("token");

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://ski-api.herokuapp.com/users/search/' + query,
    headers: { 'Content-Type': 'application/json', 'Authorization': token }
  };

  axios(config)
    .then(function (res) {
      var config2 = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/friend',
        headers: { 'Content-Type': 'application/json', 'Authorization': token }
      };
      axios(config2)
        .then(function (r) {
          let myFriends = r.data.friends.map(x => x.id);
          let result = res.data.users;
          result.forEach(element => {
            if (myFriends.includes(element.id))
              element.alreadyFriend = true;
            else element.alreadyFriend = false;
          });
          response.render("addFriends", { users: result });
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.log(error);
    });

}
