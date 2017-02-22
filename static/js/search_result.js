app.controller('searchResultsCtrl', function($scope, $http, passResults){
	$scope.filteredClasses = passResults.getClasses();
	$scope.$on('data_shared', function(){
		$scope.filteredClasses = passResults.getClasses();
	})
})