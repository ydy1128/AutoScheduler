app.controller('adminCtrl', function($scope, $location, adminAuthentication){
    $scope.credentials = {
      email : "",
      password : ""
    }
    $scope.onSubmit = function () {
      adminAuthentication
        .login($scope.credentials)
    };

});
app.controller('adminHomeCtrl', function($scope, $http){
    $scope.pushedClasses = [];
    $scope.getClassesInJSON = function () {
      console.log('pushing')
      $http.post('/create-classdb').
      then(function(){
        console.log('success')
      },
      function(){

      })
    };
    $scope.getAllClasses = function(){
      angular.forEach($scope.classes, function(cls){
        $scope.pushedClasses.push({'subject': cls.subject, 'course': cls.course, 'section': cls.section, 'instructor': cls.instructor[0], 'crn': cls.crn})
      })
    }
    $scope.removeAllClasses = function(){
      let c = confirm('are you sure')
      if(c){
        console.log('delete')
        $http.delete('/delete-all-class-data')
        .then(function(){
          console.log('success')
        },
        function(){

        })
      }
      else{
        console.log('cancelled')
      }
    }

});
