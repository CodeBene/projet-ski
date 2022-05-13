//recherche d'amis et affichag
const axios = require("axios");

exports.getAmis = (request, response) => {
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
          response.render("ajoutAmis", {users: res.data.users});
          console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
          console.log(error);
      });

}

exports.verifyAlreadyFriend = (request, response)=>{
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
    res.render("ajoutAmis", {already: res.data.friends});
    
      
      console.log(already);
      // console.log(JSON.stringify(res.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  }


    
              
             
           
            
        
        

