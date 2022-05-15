const axios = require("axios");

exports.getOtherUserProfile = (request, response) => {
  const id = request.params.id;
  let token = localStorage.getItem("token");
  var config = {
    method: 'get',
    url: 'https://ski-api.herokuapp.com/user/' + id,
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
  };
  axios(config)
    .then(function (res) {
      const id = request.params.id;
      var config = {
        method: 'get',
        url: 'http://ski-api.herokuapp.com/friend/' + id,
        headers: { 'Content-Type': 'application/json', 'Authorization': token }
      };

      axios(config)
        .then(function (res2) {
          let config = {
            method: 'get',
            url: 'http://ski-api.herokuapp.com/friend/',
            headers: { 'Content-Type': 'application/json', 'Authorization': token }
          };
          axios(config)
            .then(function (res3) {
              let myFriends = res3.data.friends.map(x => x.id);
              let user = res.data.user;
              if (myFriends.includes(user.id))
                user.alreadyFriend = true;
              else user.alreadyFriend = false;
              let result = res2.data.friends;
              result.forEach(element => {
                if (myFriends.includes(element.id))
                  element.alreadyFriend = true;
                else element.alreadyFriend = false;
              });
              console.log(result);
              response.render("otherUserProfile", { profil: user, friends: result });
            })
            .catch(function (error) {
              console.log(error);
            });

          //response.render("otherUserProfile", {profil: res.data.user, friends : res2.data.friends})
          //console.log(JSON.stringify(res2.data));
        })
        .catch(function (error) {
          console.log(error);
        });

    })
    .catch(function (error) {
      response.send("Désolé, l'info sur cet utilisateur n'est pas disponible.");
    });
};

