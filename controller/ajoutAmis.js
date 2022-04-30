const axios = require("axios");

exports.ajouter = (request, response)=>{
    const friendID = request.params.id;
    let token = localStorage.getItem("token");
    
    var data = {friendId : friendID};
    
    var config = {
      method: 'post',
      url: 'http://ski-api.herokuapp.com/friend',
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      data : data
    };
    
    axios(config)
    .then(function (res) {
        response.render("ajoutAmis", {users : res.data.users})
        console.log(JSON.stringify(res.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    }