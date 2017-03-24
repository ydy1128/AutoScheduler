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
