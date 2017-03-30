var app = angular.module('FrameItApp',['ui.router', 'ngScrollable'])

// description:     app configuration for routing
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  // description:     routing for home page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  })
  // description:     routing for documents page
  .state('documents', {
    url: '/documents',
    templateUrl: 'templates/documents.html'     
  });
  $locationProvider.html5Mode(true);
})
// description:     controller for the whole app
// commented out:   commented because the outside app does not need a controller yet
// app.controller('FrameItAppCtrl', function($scope){

// });

// description:     app service for exchanging data between search_engine and search_results
app.factory('passResults', function($rootScope){
  var class_list = [];
  // var filter_list
  // description:     updates data in shared section and refreshes search_results controller
  // functions used:  $broadcast('data_shared') - search_results.js
  function updateClasses(cls){
    class_list = cls;
    $rootScope.$broadcast('data_shared');
  }
  // description:     returns updated data
  // return:          list - current data list
  function getClasses(){
      return class_list;
  }
  return{ 
      updateClasses: updateClasses,
      getClasses: getClasses
  }
})

// description:     app service for exchanging data between search_results and selected_results
app.factory('selectResults', function($rootScope){
  var class_list = [];
  // description:     add class to the shared service
  // functions used:  $broadcast('class_added')
  function addClass(cls){
    var key = cls.subject+'-'+cls.course+'-'+cls.section;
    if(class_list.length == 0){
      class_list.push(cls);
      $rootScope.$broadcast('class_updated');
      return 0;
    }
    else{
      var insert = classExists(key, cls);
      var time = timeExists(cls);
      if(insert){
        return 1;
      }
      else{
        class_list.push(cls);
        $rootScope.$broadcast('class_updated');
        return 0;
      }

      
    }   
  }
  function classExists(key, cls){
    for(var i = 0; i < class_list.length; i++){
      var match_key = class_list[i].subject+'-'+class_list[i].course+'-'+class_list[i].section;
      if(key == match_key){
        return true;
      }
      else if(i == class_list.length-1){
        return false;
      }
    }
  }
  function timeExists(cls){
    console.log('running')
    for(var i = 0; i < class_list.length; i++){
      console.log(class_list[i])
      for(var j = 0; j < class_list[i].schedule.length; j++) {
        var compare_days = class_list[i].schedule[j].days;
        var compare_starttime = class_list[i].schedule[j].start_time;
        var compare_endtime = class_list[i].schedule[j].end_time;
        console.log(compare_days)
        for(var k = 0; k < cls.schedule.length; k++) {
          var input_days = cls.schedule[k].days;
          var input_startime = cls.schedule[k].start_time;
          var input_endtime = cls.schedule[k].end_time;
          console.log(input_days)
          console.log(input_startime)
          for(var l = 0; l < compare_days.length; l++){
            var check_days = input_days.indexOf(compare_days[l]);
            var overlap_check = true;
            console.log(check_days+"checkdays")
            if(check_days == -1) {
              return false;
            }
            else {
              var time_compare_starttime = compare_starttime.split(" ");
              var time_input_starttime = input_startime.split(" ");
              var ampm_compare_starttime1;
              var ampm_compare_starttime;

              console.log(time_compare_starttime[0], time_compare_starttime[1])
              console.log(time_input_starttime[0], time_input_starttime[1])
              
                if (time_compare_starttime[1] == "pm")
                {
                  ampm_compare_starttime1 = time_compare_starttime[0].split(":").join("");
                  ampm_compare_starttime = parseInt(ampm_compare_starttime1) + 1200;
                  console.log(ampm_compare_starttime+"pm");
                }
                else if(time_compare_starttime[1] == "am")
                {
                  ampm_compare_starttime1 = time_compare_starttime[0].split(":").join("");
                  ampm_compare_starttime = parseInt(ampm_compare_starttime1);
                  console.log(ampm_compare_starttime+"am");
                }
              
              var time_compare_endtime = compare_endtime.split(" ");
              var ampm_compare_endtime1;
              var ampm_compare_endtime;
                if (time_compare_endtime[1] == "pm")
                {
                  ampm_compare_endtime1 = time_compare_endtime[0].split(":").join("");
                  ampm_compare_endtime = parseInt(ampm_compare_endtime1) + 1200;
                }                
                else if(time_compare_endtime[1] == "am")
                {
                  ampm_compare_endtime1 = time_compare_endtime[0].split(":").join("");
                  ampm_compare_endtime = parseInt(ampm_compare_endtime1);                  
                }

              var time_input_starttime = input_startime.split(" ");
              var ampm_input_starttime1;
              var ampm_input_starttime;
                if (time_input_starttime[1] == "pm")
                {
                  ampm_input_starttime1 = time_input_starttime[0].split(":").join("");
                  ampm_input_starttime = parseInt(ampm_input_starttime1) + 1200;
                }                
                else if(time_input_starttime[1] == "am")
                {
                  ampm_input_starttime1 = time_input_starttime[0].split(":").join("");
                  ampm_input_starttime = parseInt(ampm_input_starttime1);             
                }              

              var time_input_endtime = input_endtime.split(" ");
              var ampm_input_endtime1;
              var ampm_input_endtime;
                if (time_input_endtime[1] == "pm")
                {
                  ampm_input_endtime1 = time_input_endtime[0].split(":").join("");
                  ampm_input_endtime = parseInt(ampm_input_endtime1) + 1200;
                }                
                else if(time_input_endtime[1] == "am")
                {
                  ampm_input_endtime1 = time_input_endtime[0].split(":").join("");
                  ampm_input_endtime = parseInt(ampm_input_endtime1);                  
                }              
                console.log(overlap_check);
              if(ampm_compare_starttime < ampm_input_starttime && ampm_compare_endtime < ampm_input_endtime)
                {}
              else
                {
                  overlap_check = false;
                }
              console.log(overlap_check);
              }

            //M

            //W
            //F
          }
        }



    }
  }
  }
  // description:     updates data in shared section and refreshes search_results controller
  // functions used:  $broadcast('class_removed')
  function removeClass(cls){
    var index = class_list.indexOf(cls);
    if(index == -1){
      return 1;
    }
    else{
      class_list.splice(index);
      $rootScope.$broadcast('class_updated');
      return 0;
    }
    // $rootScope.$broadcast('class_removed');
  }
  // description:     returns updated data
  // return:          list - current data list
  function getClasses(){
      return class_list;
  }
  return{ 
      addClass: addClass,
      removeClass: removeClass,
      getClasses: getClasses
  }
})
// description:     app service for navigating between the side menu
app.factory('navigator', function($rootScope){
  var current_nav = '';
  // var filter_list
  // description:     update the current menu to navigate
  // functions used:  $broadcast('navigate_menu') - search_results.js
  function navigate(nav){
    current_nav = nav;
    $rootScope.$broadcast('navigate_menu');
  }
  // description:     returns navigated menu title
  // return:          current_nav - current nav title 
  function getCurrNav(){
    return current_nav;
  }
  return{ 
      navigate: navigate,
      getCurrNav: getCurrNav
  }
})

app.factory('colorSelector', function($rootScope){
  var color_list = [['#1abc9c', '#16a085'], ['#3498db', '#2980b9'], 
                    ['#34495e', '#2c3e50'], ['#f1c40f', '#f39c12'],
                    ['#e74c3c', '#c0392b'], ['#95a5a6', '#7f8c8d'],
                    ['#2ecc71', '#27ae60'], ['#9b59b6', '#8e44ad'],
                    ['#e67e22', '#d35400'], ['#ecf0f1', '#bdc3c7']];
  function getColor(str){
    var num = 0;
    for(var i = 0; i < str.length; i++){
      num += str.charCodeAt(i);
    }
    num = num % 10;
    return color_list[num];
  }
  return{ 
      getColor: getColor
  }
})


// description:   filter unique values from dataset (to be used in template)
// return:        output - returns the filtered data in template
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
