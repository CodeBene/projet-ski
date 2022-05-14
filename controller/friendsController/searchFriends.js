//recherche d'amis et affichag
const axios = require("axios");

exports.getFriends = (request, response) => {
  let query = request.query.search;
  let token = localStorage.getItem("token");

  var axios = require('axios');

  var config = {
      method: 'get',
      url: 'http://ski-api.herokuapp.com/users/search/'+query,
      headers: {'Content-Type': 'application/json', 'Authorization': token }
  };

  axios(config)
      .then(function (res) {
        var config2 = {
          method: 'get',
          url: 'http://ski-api.herokuapp.com/friend',
          headers: {'Content-Type': 'application/json', 'Authorization': token}
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
          response.render("addFriends", {users: result});
        })
        .catch(function (err) {
          console.log(err);
        });

          //response.render("addFriends", {users: res.data.users});
          //console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
          console.log(error);
      });

}

/*exports.verifyAlreadyFriend = (request, response)=>{
  let token = localStorage.getItem("token");
  
  // var data = {friendId : friendID};
  // var data = res.data.friends;
  var config = {
    method: 'get',
    url: 'http://ski-api.herokuapp.com/friend',
    headers: {'Content-Type': 'application/json', 'Authorization': token},
    // data : data
  };
  
  axios(config)
  .then(function (res) {
    res.render("addFriends", {already: res.data.friends});
    
      
      console.log(already);
      // console.log(JSON.stringify(res.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  } */
  