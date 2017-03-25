app.controller('accountCtrl', function($scope, userData){
	$scope.user = {};
	$scope.init = function(){
		userData.getProfile()
		.then(function(response){
			console.log(response.data)
			$scope.user = response.data;
		},
		function(){
			console.log('Unknown User Error')
		})
		$(':checkbox').checkboxpicker();
	}
	$scope.init()
});
