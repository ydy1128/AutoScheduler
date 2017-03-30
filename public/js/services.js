
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
app.factory('selectResults', function($rootScope, $http, userData){
  var class_list = [];
  var current_schedule = '';
  // description:     add class to the shared service
  // functions used:  $broadcast('class_added')
  function addClass(cls, silent=false){
    var key = cls.subject+'-'+cls.course+'-'+cls.section;
    if(current_schedule == ''){
      console.log('schedule not selected');
      return -1;
    }
    else{
      if(class_list.length == 0){
        class_list.push(cls);
        $rootScope.$broadcast('class_updated');
        if(!silent){
          userData.getProfile()
          .then(function(response){
            let user = response.data;
            for(let i = 0; i < user.schedules.length; i++){
              if(user.schedules[i].name == current_schedule){
                index = i;
                break;
              }
            }
              user.schedules[index].courses.push({'subject': cls.subject, 'course': cls.course, 'section': cls.section})
              console.log(user._id)
              userData.updateUser(user._id, user)
          }, function(){
            console.log('Unknown user error.')
          })
        }
        return 0;
      }
      else{
        let insert = classExists(key, cls);
        if(insert){
          return 1;
        }
        else{
          class_list.push(cls);
          $rootScope.$broadcast('class_updated');
          if(!silent){
            userData.getProfile()
            .then(function(response){
              console.log(response.data)
              var user = response.data;
              for(let i = 0; i < user.schedules.length; i++){
                if(user.schedules[i].name == current_schedule){
                  index = i;
                  break;
                }
              }
              
              user.schedules[index].courses.push({'subject': cls.subject, 'course': cls.course, 'section': cls.section})
              console.log(response.data._id)
              userData.updateUser(response.data._id, user)

            }, function(){
              console.log('Unknown user error.')
            })
          }
          return 0
        }
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
      userData.getProfile()
      .then(function(response){
        console.log(response.data)
        let user = response.data;
        let remove_index = -1;
        for(let i = 0; i < user.schedules.length; i++){
          if(user.schedules[i].name == current_schedule){
            index = i;
            break;
          }
        }
        for(let i = 0; i < user.schedules[index].courses.length; i++){
          let curr_course = user.schedules[index].courses[i]
          let key = curr = cls.subject + '-' + cls.course + '-' + cls.section;
          let match_key = cls.subject + '-' + cls.course + '-' + cls.section;
          if(key == match_key){
            remove_index = i;
            break;
          }
        }
        user.schedules[index].courses.splice(remove_index, 1)
        userData.updateUser(user._id, user)
      }, function(){
        console.log('Unknown user error.')
      })
      return 0;
    }
    // $rootScope.$broadcast('class_removed');
  }
  // description:     returns updated data
  // return:          list - current data list
  function getClasses(){
      return class_list;
  }
  function selectSchedule(name){
    class_list = [];
      $rootScope.$broadcast('class_updated');

    userData.getProfile()
    .then(function(response){
      var user = response.data;
      var exists = false;
      var index = -1;
      for(var i = 0; i < user.schedules.length; i++){
        if(user.schedules[i].name == name){
          exists = true;
          index = i;
        }
      }
      if(exists){
        current_schedule = name;
        for(var i = 0; i < user.schedules[index].courses.length; i++){
          var current = user.schedules[index].courses[i];
          var key = current.subject + '-' + current.course + '-' + current.section;
          $http.get('/update-schedule'+key)
          .then(function(response){
            // console.log(response.data[0])
            // class_list.push(key)
            addClass(response.data[0], true)
          }, function(){

          })
        }
      }
      else{
        console.log('Error: Schedule Does not Exist.');
      }
    },
    function(){
      console.log('Unknown User Error.');
    })
  }
  return{ 
      addClass: addClass,
      removeClass: removeClass,
      getClasses: getClasses,
      selectSchedule: selectSchedule
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