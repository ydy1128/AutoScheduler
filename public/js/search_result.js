app.controller('searchResultsCtrl', function($scope, $http, passResults){
	$scope.filteredClasses = passResults.getClasses();
    $scope.sort_options = [{id: 'SUbject', value:'Subject'}, {id:'Course', value: 'Course #'}, {id: 'Section', value: 'Section'}];
	$scope.$on('data_shared', function(){
		$scope.filteredClasses = passResults.getClasses();
        $scope.sort_by = '0';
        // $('#dummy').text(JSON.stringify($scope.filteredClasses))
	});

    // description:     initiate select2 library
    $scope.initSelect2 = function(){
        angular.element("#sortSelect select").select2({
        	minimumResultsForSearch: -1
        });
    };
    $scope.sortClasses = function(sort_by){
        switch (sort_by.id){
            case 'Subject':
                $scope.subjectSort()
                break;
            case 'Course':
                $scope.courseSort()
                break;
            case 'Section':
                $scope.sectionSort();
                break;
        }
    }
    $scope.subjectSort = function(){
        $scope.filteredClasses.sort(function (a, b) {
            let x, y, z;
            x = a.subject.localeCompare(b.subject)
            if(x == 0){
                y = a.course - b.course;
                if(y == 0){
                    z = a.section - b.section;
                    return z;
                }
                return y;
            }
            return x;
        });
        // $scope.filteredClasses.sort(orderByProperty('subject', 'course', 'section'))
    };
    $scope.courseSort = function(){
        $scope.filteredClasses.sort(function (a, b) {
            let x, y, z;
            x = a.course - b.course;
            if(x == 0){
                y = a.subject.localeCompare(b.subject)
                if(y == 0){
                    z = a.section - b.section;
                    return z;
                }
                return y;
            }
            return x;
        });
    };
    $scope.sectionSort = function(){
        $scope.filteredClasses.sort(function (a, b) {
            let x, y, z;
            x = a.section - b.section;
            if(x == 0){
                y = a.subject.localeCompare(b.subject)
                if(y == 0){
                    z = a.course - b.course;
                    return z;
                }
                return y;
            }
            return x;
        });
    };

    $scope.initSelect2();
})
app.directive('resultItem', function(){
    return{
        // scope: true,
        restrict: 'AE',
        // replace: 'true',
        templateUrl: '../templates/result_item.html'
    }
})
