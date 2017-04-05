app.controller('adminCtrl', function($scope, $location, adminAuthentication){
    $scope.credentials = {
      email : "",
      password : ""
    };
    var first_cred = {
    	email: "frameit-admin",
    	password : "kaddev-frameit",
    }
    $scope.onSubmit = function () {
      adminAuthentication
        .login($scope.credentials)
    };

});
app.controller('adminHomeCtrl', function($scope, $http){
    $scope.getClassesInJSON = function () {
      $http.post('/create-classdb').
      then(function(){
        console.log('success')
      },
      function(){

      })
    };

});
