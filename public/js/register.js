app.controller('registerCtrl', function($scope, $location, authentication){
  $scope.coptions = ['U1','U2','U3','U4','U5'];
	$scope.credentials = {
      first_name : "",
      last_name : "",
      email : "",
      classification : "",
      password : "",
    };
  $scope.register_message = '';
    $scope.onSubmit = function() {
      if(!$scope.credentials.email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)){
        console.log('email failed')
        $scope.register_message = 'Invalid email.';
      }
      else if(!$scope.credentials.password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        console.log('pw failed')
        angular.element('.hide-later').hide(300);
        angular.element('#registerMessageDiv').css('height', '130px');
        $scope.register_message = 'A password must: \n • Contain at least 8 characters \n • Contain at least 1 number \n • Contain at least 1 lowercase character (a-z) \n • Contain at least 1 uppercase character (A-Z) \n • Contain at least 1 special character';
      }
      else{
        $scope.register_message = 'Register successful.';
        console.log('success')
        authentication.register($scope.credentials)
      }
    };
})
