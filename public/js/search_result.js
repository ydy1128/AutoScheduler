app.controller('searchResultsCtrl', function($scope, passResults, selectResults, navigator){
	$scope.filteredClasses = passResults.getClasses();
    $scope.sort_options = [{id: 'Subject', value:'Subject'}, {id:'Course', value: 'Course #'}, {id: 'Section', value: 'Section'}];
	$scope.button_type = 'Add';
    $scope.add_message = '';
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
    $scope.updateCurrentClass = function(key, action){
        console.log(action)
        if(action == 'Add'){
            $scope.add_messag = '';
            angular.forEach($scope.filteredClasses, function(cls, i){
                var match_key = cls.subject+'-'+cls.course+'-'+cls.section;
                if(match_key == key){
                    // run if all errorchecking pass
                    var msg = selectResults.addClass($scope.filteredClasses[i]);
                    if(msg == 0){
                        navigator.navigate('selected');
                    }
                    else if(msg == -1){
                        $scope.add_message = '* Please select a schedule first.';
                    }
                    else if(msg == 1){
                        $scope.add_message = "* The course already exists in your schedule.";
                    }
                    else if(msg == 2){
                        $scope.add_message = "* Current class has time conflict(s) in your schedule.";
                    }
                    else{
                        $scope.add_message = '* Unknown Insert Error: Please contact Admin.';
                    }
                }
            })
        }
    }
    $scope.clearMessage = function(){
        console.log('called')
        $scope.add_message = '';
    }
    $scope.initSelect2();
})

app.directive('resultItem', function(selectResults, navigator, colorSelector){
    return{

        restrict: 'EA',
        scope: {
            current: '=',
            btn: '=',
            clear: '&',
            update: '&'
        },
        templateUrl: '../templates/result_item.html',
        link: function(scope, element, attrs){
            scope.add_message = '';
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
            }),
            element.css('background', function(){
                console.log(scope.current.subject)
                var str = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(';
                str += colorSelector.getColor(scope.current.subject)[0];
                str += '), to('+colorSelector.getColor(scope.current.subject)[1]+'))';
                return str;
            }),
            element.css('background', function(){
                var str = '-webkit-linear-gradient(0% 0%, 0% 100%, from(';
                str += colorSelector.getColor(scope.current.subject)[0];
                str += '), to('+colorSelector.getColor(scope.current.subject)[1]+'))';
                return str;
            }),
            element.css('background', function(){
                var str = '-moz-linear-gradient(center top,';
                str += colorSelector.getColor(scope.current.subject)[0];
                str += ','+colorSelector.getColor(scope.current.subject)[1]+')';
                return str;
            })
        }
    }
});