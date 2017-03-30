app.service('authentication', function($http, $window, $location){
  var saveToken = function (token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function () {
    // console.log($window.localStorage['mean-token'])
    return $window.localStorage['mean-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('/api/register', user)
    .then(
      function(response){
        saveToken(response.data.token);
        $location.path('/documents')
      },
      function(err){
        console.log(err)
      });
  };

  login = function(user) {
    return $http.post('/api/login', user)
    .then(
      function(response){
        console.log('login successful')
        saveToken(response.data.token);
        $location.path('/documents')
      },
      function(err){
        console.log(err)

      });
    // .success(function(data) {
    //   saveToken(data.token);
    // });
  };

  logout = function() {
    $window.localStorage.removeItem('mean-token');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };
})

app.service('adminAuthentication', function($http, $window, $location){
  var saveToken = function (token) {
    $window.localStorage['admin-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['admin-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('/api/adminregister', user)
    .then(
      function(response){
        saveToken(response.data.token);
        $location.path('/admin')
      },
      function(err){
        console.log(err)
      });
  };

  login = function(user) {
    user.email += '=$&.#=admin';

    return $http.post('/api/adminlogin', user)
    .then(
      function(response){
        saveToken(response.data.token);
        $location.path('/admin-home')
      },
      function(err){
        console.log(err)

      });
    // .success(function(data) {
    //   saveToken(data.token);
    // });
  };

  logout = function() {
    $window.localStorage.removeItem('admin-token');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };
})

app.service('userData', function($http, authentication){
  var getProfile = function () {
    return $http.get('/api/profile', {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      }
    });
  };
  var updateUser = function(id, user){
    console.log('updateUser called')
    if(id != undefined){
      $http.put('/api/user' + id, user);
    }
    else{
      console.log('user not found')
    }
  }
  return {
    getProfile : getProfile,
    updateUser : updateUser
  };
})

app.service('adminData', function($http, adminAuthentication){
  var getProfile = function () {
    return $http.get('/api/adminprofile', {
      headers: {
        Authorization: 'Bearer '+ adminAuthentication.getToken()
      }
    });
  };

  return {
    getProfile : getProfile
  };
})