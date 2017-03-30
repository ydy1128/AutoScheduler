app.controller('loginCtrl', function($scope, $rootScope, $location, authentication){
    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
    };
})


