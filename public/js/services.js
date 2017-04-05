
// description:     app service for exchanging data between search_engine and search_results
app.factory('passResults', function($rootScope){
  var class_list = [];
  // var filter_list
  // description:     updates data in shared section and refreshes search_results controller
  // functions used:  $broadcast('data_shared') - search_results.js
  function updateClasses(cls){
    class_list = cls;
    // angular.forEach(cls, function(elem, i){
    //   console.log(elem.subject, elem.course, elem.section)
    //   class_list.push(cls[i])
    // })
    console.log('sharing data')
    $rootScope.$broadcast('data_shared');
  }
  // description:     returns updated data
  // return:          list - current data list
  function getClasses(){
      console.log('getting classes');
      
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
              userData.updateUser(user._id, user)
          }, function(){
            console.log('Unknown user error.')
          })
        }
        return 0;
      }
      else{
        let insert = classExists(key, cls);
        let time = timeExists(cls);
        if(insert){
          return 1;
        }
        else if(time){
          return 2;
        }
        else{
          class_list.push(cls);
          $rootScope.$broadcast('class_updated');
          if(!silent){
            userData.getProfile()
            .then(function(response){
              var user = response.data;
              for(let i = 0; i < user.schedules.length; i++){
                if(user.schedules[i].name == current_schedule){
                  index = i;
                  break;
                }
              }
              
              user.schedules[index].courses.push({'subject': cls.subject, 'course': cls.course, 'section': cls.section})
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
  function courseSubject(cls){
    console.log('running')
    for(var i = 0; i < class_list.length; i++){
      var compare_subject = class_list[i].subject;
      var compare_course = class_list[i].course;
      var cls_subject = cls.subject;
      var cls_course = cls.course;
      var error_check;
      console.log(class_list[i].subject)
      if (compare_subject == cls_subject){
        if(compare_course == cls_course){
          error_check = false;
        }
        else{
          error_check = true;
        }
      }
      else{
        error_check = true;
      }
    }
  }

  function timeExists(cls){
    for(var i = 0; i < class_list.length; i++){
      for(var j = 0; j < class_list[i].schedule.length; j++) {
        var compare_days = class_list[i].schedule[j].days;
        var compare_starttime = class_list[i].schedule[j].start_time;
        var compare_endtime = class_list[i].schedule[j].end_time;
        for(var k = 0; k < cls.schedule.length; k++) {
          var input_days = cls.schedule[k].days;
          var input_startime = cls.schedule[k].start_time;
          var input_endtime = cls.schedule[k].end_time;

          for(var l = 0; l < compare_days.length; l++){
            var check_days = input_days.indexOf(compare_days[l]);
            var overlap_check = false;
            if(check_days != -1) {
              var time_compare_starttime = compare_starttime.split(" ");
              var time_input_starttime = input_startime.split(" ");
              var ampm_compare_starttime1;
              var ampm_compare_starttime;              
              if(time_compare_starttime[1] == "am" || time_compare_starttime[0].includes('12:')){
                ampm_compare_starttime1 = time_compare_starttime[0].split(":").join("");
                ampm_compare_starttime = parseInt(ampm_compare_starttime1);
              }
              else if (time_compare_starttime[1] == "pm"){
                ampm_compare_starttime1 = time_compare_starttime[0].split(":").join("");
                ampm_compare_starttime = parseInt(ampm_compare_starttime1) + 1200;
              }
              
              var time_compare_endtime = compare_endtime.split(" ");
              var ampm_compare_endtime1;
              var ampm_compare_endtime;
              if(time_compare_endtime[1] == "am" || time_compare_endtime[0].includes('12:')){
                ampm_compare_endtime1 = time_compare_endtime[0].split(":").join("");
                ampm_compare_endtime = parseInt(ampm_compare_endtime1);                  
              }
              else if (time_compare_endtime[1] == "pm"){
                ampm_compare_endtime1 = time_compare_endtime[0].split(":").join("");
                ampm_compare_endtime = parseInt(ampm_compare_endtime1) + 1200;
              }                
               

              var time_input_starttime = input_startime.split(" ");
              var ampm_input_starttime1;
              var ampm_input_starttime;
              if(time_input_starttime[1] == "am" || time_input_starttime[0].includes('12:')){
                ampm_input_starttime1 = time_input_starttime[0].split(":").join("");
                ampm_input_starttime = parseInt(ampm_input_starttime1);             
              }   
              else if (time_input_starttime[1] == "pm"){
                ampm_input_starttime1 = time_input_starttime[0].split(":").join("");
                ampm_input_starttime = parseInt(ampm_input_starttime1) + 1200;
              }                
                         

              var time_input_endtime = input_endtime.split(" ");
              var ampm_input_endtime1;
              var ampm_input_endtime;
              if(time_input_endtime[1] == "am" || time_input_starttime[0].includes('12:')){
                ampm_input_endtime1 = time_input_endtime[0].split(":").join("");
                ampm_input_endtime = parseInt(ampm_input_endtime1);                  
              } 
              else if (time_input_endtime[1] == "pm"){
                ampm_input_endtime1 = time_input_endtime[0].split(":").join("");
                ampm_input_endtime = parseInt(ampm_input_endtime1) + 1200;
              }                
                 
              if(ampm_input_starttime < ampm_compare_starttime){
                if(ampm_input_endtime < ampm_compare_starttime){

                }
                else{
                  // console.log('case 1')
                  return true;
                }
              }    
              else if(ampm_input_starttime < ampm_compare_starttime){
                // console.log('case 2')
                return true;
              }         
              else{
                if(ampm_input_starttime <= ampm_compare_endtime){
                  // console.log('case 3')
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return overlap_check;
  }
  // description:     updates data in shared section and refreshes search_results controller
  // functions used:  $broadcast('class_removed')
  function removeClass(cls){
    var index = class_list.indexOf(cls);
    if(index == -1){
      return 1;
    }
    else{
      class_list.splice(index, 1);
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
          let key = curr = curr_course.subject + '-' + curr_course.course + '-' + curr_course.section;
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