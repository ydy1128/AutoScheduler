app.controller('selectedResultsCtrl', function($scope, $rootScope, selectResults, navigator){
	$scope.selectedClasses = selectResults.getClasses();
    $scope.sort_options = [{id: 'Subject', value:'Subject'}, {id:'Course', value: 'Course #'}, {id: 'Section', value: 'Section'}];
    $scope.button_type = 'Remove';
    $scope.$on('class_updated', function(){
		$scope.selectedClasses = selectResults.getClasses();
        $scope.sort_by = '0';
	});
    $scope.initSelect2 = function(){
        angular.element("#sortSelect2 select").select2({
        	minimumResultsForSearch: -1
        });

    };
    $scope.sortClasses = function(sort_by){
        switch (sort_by.id){
            case 'Subject':
                $scope.subjectSort();
                break;
            case 'Course':
                $scope.courseSort();
                break;
            case 'Section':
                $scope.sectionSort();
                break;
        }
    }
    $scope.subjectSort = function(){
        $scope.selectedClasses.sort(function (a, b) {
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
    };
    $scope.courseSort = function(){
        $scope.selectedClasses.sort(function (a, b) {
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
        $scope.selectedClasses.sort(function (a, b) {
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
    $scope.updateCurrentClass = function(key, action){
        if(action == 'Remove'){
            $scope.add_messag = '';
            angular.forEach($scope.selectedClasses, function(cls, i){
                var match_key = cls.subject+'-'+cls.course+'-'+cls.section;
                if(match_key == key){
                    var msg = selectResults.removeClass($scope.selectedClasses[i]);
                }
            })
        }
    }
    $scope.initSelect2();
})