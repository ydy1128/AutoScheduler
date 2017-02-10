// description:     controller for search engine
// functions used:  initSelect2() - search_engine.js
app.controller('searchEngineCtrl', function($scope, $rootScope, $http, passResults){
    $scope.selected_subjects = [];
    $scope.selected_courses = [];
    $scope.selected_sections = [];
    $scope.selected_crns = [];
    $scope.selected_instructors = [];
    $scope.selected_days = [];
    $scope.search_message = '';
    //retrieve all classes data from db
    $http.get('/class-data')
    .then(
        function(response){
            $scope.classes = response.data;
            $scope.filters = getFilters(response.data);
        },
        function(){
            $scope.classes = [];
            console.log('db connection error');
        }
    )
    // description:     clears message when option is selected in any filters
    $scope.searchChange = function(){
        $scope.search_message = '';
    }
    // description:     gives search result data to search_result controller and populates search message
    // functions used:  filterByElements() - search_engine.js
    //                  filterByInstructors() - search_engine.js
    //                  filterByDays() - search_engine.js
    $scope.searchSubmit = function(){
        var filtered_data = $scope.classes;
        var filter_selected = false;
        angular.element('#engineBox li').removeClass('active');
        if($scope.selected_subjects.length > 0){
            filter_selected = true;
            filtered_data = filterByElements(filtered_data, $scope.selected_subjects, 'subject');
        }
        if($scope.selected_courses.length > 0){
            filter_selected = true;
            filtered_data = filterByElements(filtered_data, $scope.selected_courses, 'course');
        }
        if($scope.selected_sections.length > 0){
            filter_selected = true;
            filtered_data = filterByElements(filtered_data, $scope.selected_sections, 'section');
        }
        if($scope.selected_crns.length > 0){
            filter_selected = true;
            filtered_data = filterByElements(filtered_data, $scope.selected_crns, 'crn');
        }
        if($scope.selected_instructors.length > 0){
            filter_selected = true;
            filtered_data = filterByInstructors(filtered_data, $scope.selected_instructors);
        }
        if($scope.selected_days.length > 0){
            filter_selected = true;
            filtered_data = filterByDays(filtered_data, $scope.selected_days);
        }

        if(!filter_selected){
            $scope.search_message = '* At least one filter must be selected!';
            passResults.updateClasses([])
        }
        else if(filtered_data.length == 0){
            $scope.search_message = '* No Results Found.';
            angular.element('#engineBox li').removeClass('active');
        }
        else{
            passResults.updateClasses(filtered_data)
        }
    }
    initSelect2();
})
// description:     initiate select2 libraries
function initSelect2(){
    $(".search-section select").select2();
}
function getFilters(data){
    var result = [];
    angular.forEach(data, function(item){
        var temp_obj1 = {}, temp_obj2 = {}, temp_obj3 = {};
        temp_obj1['subject'] = item['subject'];
        temp_obj1['course'] = item['course'];
        temp_obj1['section'] = item['section'];
        temp_obj1['crn'] = item['crn'];
        angular.forEach(item['instructor'], function(ins){
            temp_obj2 = $.extend({}, temp_obj1);
            temp_obj2['instructor'] = ins;
        });
        angular.forEach(item.schedule, function(schedule){
            var days = schedule.days;
            angular.forEach(days, function(day){
                temp_obj3 = $.extend({}, temp_obj2);
                temp_obj3['day'] = day;
                result.push(temp_obj3);
            });
        });
    });
    return result;
}
// description:     filters the data with selected filters (used for subject and course)
// input:           target - the whole data
//                  filters - applied filters in select
//                  key - filter category (in this case subject and courses)
// return:          temp - filtered data
// functions used:  highlightFilters() - search_engine.js
function filterByElements(target, filters, key){
    var temp = [];
    var vals = [];
    var diff_vals = [];
    angular.forEach(target, function(item){
        angular.forEach(filters, function(filter){
            if(item[key] == filter){
                var temp_obj = $.extend({}, item);
                temp.push(temp_obj)
                vals.push(filter);
            }
        })
    })
    highlightFilters(filters, vals, key);
    return temp;
}
// description:     filters the data with selected filters (used for instructor)
// input:           target - the whole data
//                  filters - applied filters in select
// return:          temp - filtered data
// functions used:  highlightFilters() - search_engine.js
function filterByInstructors(target, filters){
    var temp = []
    var vals = [];
    angular.forEach(target, function(item){
        var instructors = item['instructor'];
        angular.forEach(filters, function(filter){
            if(instructors.indexOf(filter) != -1){
                var temp_obj = $.extend({}, item);
                temp.push(temp_obj)
                vals.push(filter);
            }
        })
    })
    highlightFilters(filters, vals, 'instructor');
    return temp;
}
// description:     filters the data with selected filters (used for day)
// input:           target - the whole data
//                  filters - applied filters in select
// return:          temp - filtered data
// functions used:  highlightFilters() - search_engine.js
function filterByDays(target, filters){
    var temp = []
    var vals = [];
    angular.forEach(target, function(item){
        var schedules = item['schedule'];
        angular.forEach(filters, function(filter){
            angular.forEach(schedules, function(schedule){
                if(schedule.days.includes(filter)){
                    var temp_obj = $.extend({}, item);
                    temp.push(temp_obj)
                    vals.push(filter);
                }
            })
        })
    })
    highlightFilters(filters, vals, 'day');
    return temp;
}
// description:     highlight unapplied filters
// input:           filters - applied filters in select
//                  vals - applied filters
//                  key - filter category (subject, course, instructor, or day)
// return:          temp - filtered data
// functions used:  highlightFilters() - search_engine.js
function highlightFilters(filters, vals, key){
    var diff_vals = filters.filter(function(x) { return vals.indexOf(x) < 0 });
    var $scope = angular.element('#searchEngine').scope();
    angular.forEach(angular.element('#select'+key+' li'), function(value, key){
        var check = angular.element(value).text().substr(1);
        if(diff_vals.indexOf(check) != -1){
            angular.element(value).addClass('active');
        }
    })
    if(diff_vals.length > 0){
        $scope.search_message = '* Selected filters has not been applied or could not produce any results.';
    }
}