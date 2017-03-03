app.controller('searchResultsCtrl', function($scope, passResults, selectResults, navigator){
	$scope.filteredClasses = passResults.getClasses();
    $scope.sort_options = [{id: 'Subject', value:'Subject'}, {id:'Course', value: 'Course #'}, {id: 'Section', value: 'Section'}];
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
    $scope.addCurrentClass = function(key){
        angular.forEach($scope.filteredClasses, function(cls, i){
            var match_key = cls.subject+'-'+cls.course+'-'+cls.section;
            // console.log(key, match_key)
            if(match_key == key){
                console.log($scope.filteredClasses[i])
                selectResults.addClass($scope.filteredClasses[i]);
                navigator.navigate('selected');
            }
        })
        
    }
    $scope.initSelect2();
})
app.directive('resultItem', function(selectResults, navigator){
    return{
        // scope: true,
        restrict: 'AE',
        // replace: 'true',
        templateUrl: '../templates/result_item.html',
        link: function(scope, element, attrs){
            angular.element(element).find('.item-top').bind('click', function(){             
                if(angular.element(element).hasClass('active')){
                    angular.element(element).find('.fa-caret-up').hide();
                    angular.element(element).find('.fa-caret-down').show();
                    angular.element(element).find('.item-contents').slideUp(500, function(){
                        scope.$emit('content.changed');
                    });
                    angular.element(element).css({'broder-bottom-left-radius':'5px', 'broder-bottom-right-radius':'5px'});
                    angular.element(element).removeClass('active');
                }
                else{
                    angular.element(element).find('.fa-caret-down').hide();
                    angular.element(element).find('.fa-caret-up').show();
                    angular.element(element).find('.item-contents').slideDown(500, function(){
                        scope.$emit('content.changed');
                    });
                    angular.element(element).css({'broder-bottom-left-radius':'0px', 'broder-bottom-right-radius':'0px'});

                    angular.element(element).addClass('active');

                }
            })
        }
    }
})

function toggleContents(elem){
    if(angular.element(elem).hasClass('active')){
        angular.element(elem).find('.fa-caret-up').hide();
        angular.element(elem).find('.fa-caret-down').show();
        angular.element(elem).find('.item-contents').slideUp(500);
        angular.element(elem).css({'broder-bottom-left-radius':'5px', 'broder-bottom-right-radius':'5px'});
        angular.element(elem).removeClass('active');
    }
    else{
        angular.element(elem).find('.fa-caret-down').hide();
        angular.element(elem).find('.fa-caret-up').show();
        angular.element(elem).find('.item-contents').slideDown(500);
        angular.element(elem).css({'broder-bottom-left-radius':'0px', 'broder-bottom-right-radius':'0px'});

        angular.element(elem).addClass('active');

    }
}
