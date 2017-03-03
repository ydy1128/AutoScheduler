app.controller('selectedResultsCtrl', function($scope, $rootScope, selectResults, navigator){
	$scope.selectedClasses = selectResults.getClasses();
    $scope.sort_options = [{id: 'Subject', value:'Subject'}, {id:'Course', value: 'Course #'}, {id: 'Section', value: 'Section'}];
	$scope.$on('class_added', function(){
		$scope.selectedClasses = selectResults.getClasses();
        $scope.sort_by = '0';
	});
    $scope.initSelect2 = function(){
        angular.element("#sortSelect2 select").select2({
        	minimumResultsForSearch: -1
        });

    };

    $scope.initSelect2();
})