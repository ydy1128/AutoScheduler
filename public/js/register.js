app.controller('registerCtrl', function($scope, $location, authentication){
  $scope.coptions = ['U1','U2','U3','U4','U5'];
	$scope.credentials = {
      first_name : "",
      last_name : "",
      email : "",
      classification : "",
      password : "",
    };

    $scope.onSubmit = function() {
      //console.log('Submitting registration');
      authentication
        .register($scope.credentials)
        // .then(function(data){
        // 	$location.path('/login');
        // },
        // function(err){
        // 	console.log(err)
        // })
    };
})
