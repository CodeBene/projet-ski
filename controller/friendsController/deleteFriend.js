const axios = require("axios");

exports.deleteFriend = (request, response)=>{
    const id = request.params.id;
    let token = localStorage.getItem("token");
        
    var config = {
      method: 'delete',
      url: 'http://ski-api.herokuapp.com/friend/' + id,
      headers: {'Content-Type': 'application/json', 'Authorization': token},
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