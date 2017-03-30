
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
      if(insert){
        return 1;
      }
      else{
        class_list.push(cls);
        $rootScope.$broadcast('class_updated');
        return 0
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