app.controller('searchResultsCtrl', function($scope, $http, passResults){
	$scope.filteredClasses = passResults.getClasses();
	$scope.$on('data_shared', function(){
		$scope.filteredClasses = passResults.getClasses();
	})

    // description:     initiate select2 library
    $scope.initSelect2 = function(){
        $("#sortSelect select").select2({
        	minimumResultsForSearch: -1
        });
    }
    $scope.initSelect2();
})