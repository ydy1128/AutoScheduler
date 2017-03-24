app.controller('loginCtrl', function($scope, $location, authentication){
    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
        // .then(function(data){
        // },
        // function(err){
        //   console.log(err)
        // })
    };
})


