// controller for search engine
// functions used: initSelect2()
app.controller('searchEngineCtrl', function($scope, $http, passResults){
    //retrieve all classes data from db
    $http.get('/class-data')
    .then(function(response){
        $scope.classes = response.data;
    })
    // populate Course # select on subject change
    $scope.subjectChange = function(){
        var data_list = $scope.classes;
        var selected_classes = [];
        angular.forEach(data_list, function(item){
            if(item['subject'] == $scope.selected_subject){
                selected_classes.push(item);
            }
        });
        $scope.classes_by_subject = selected_classes;
    }

    $scope.searchSubmit = function(){
        var data_list = $scope.classes;
        var selected_classes = [];
        //both search parameters not selected - highlight both subject and crn
        if(($scope.selected_crn == undefined || $scope.selected_crn == '') && 
            ($scope.selected_subject == undefined || $scope.selected_subject == '')){
            console.log('both empty')
        }
        //search by subject and course
        else if($scope.selected_crn == undefined || $scope.selected_crn == ''){
            console.log('search by subjectChange')
            //subject selected but course not selectd - highlight subject
            if($scope.selected_course == undefined || $scope.selected_course == ''){
                console.log('course empty')
                angular.forEach(data_list, function(item){
                    if(item['subject'] == $scope.selected_subject){
                        selected_classes.push(item)
                    }
                });
                passResults.updateClasses(selected_classes);
            }
            else{
                console.log('course empty')
                angular.forEach(data_list, function(item){
                    if(item['subject'] == $scope.selected_subject && item['course'] == $scope.selected_course){
                        selected_classes.push(item)
                    }
                });
                passResults.updateClasses(selected_classes);
            }
        }
        //search by crn
        else if($scope.selected_subject == undefined || $scope.selected_subject == ''){
            console.log('search by crn')
            angular.forEach(data_list, function(item){
                if(item['crn'] == $scope.selected_crn){
                    selected_classes.push(item)
                }
            });
            passResults.updateClasses(selected_classes);
        }        
    }
    initSelect2();
})
// filter unique values from dataset
app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], keys = [];
      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key); 
              output.push(item);
          }
      });
      return output;
   };
});

// initiate select2 libraries
// functions used: enableSelect(), disableSelect()
function initSelect2(){
    $(".search-section select").select2();
    //Course ID selection is initially disabled
    disableSelect('selectCourse');
    $(".search-section select").change(function(){
        var select_id = $(this).parent().attr('id');
        switch (select_id){
            case 'selectSubject':
                if($(this).val() == ''){
                    enableSelect('selectCRN');
                    disableSelect('selectCourse');
                }
                else{
                    disableSelect('selectCRN');
                    enableSelect('selectCourse');
                }
                break;
            case 'selectCRN':
                if($(this).val() == ''){
                    enableSelect('selectSubject');
                }
                else{
                    disableSelect('selectSubject');
                }
        }

    })
}
// enables a select in search engine
// id_str - string of select id div
function enableSelect(id_str){
    $('#'+id_str+' select').attr('disabled', false);
    $('#'+id_str+' label').removeClass('deemed');
}
// disables a select in search engine
// id_str - string of select id div
function disableSelect(id_str){
    $('#'+id_str+' select').attr('disabled', true);
    $('#'+id_str+' label').addClass('deemed');
}
