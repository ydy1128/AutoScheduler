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
// description:     app service for exchanging data between search_engine and search_results
app.factory('navigator', function($rootScope){
  var current_nav = '';
  // var filter_list
  // description:     updates data in shared section and refreshes search_results controller
  // functions used:  $broadcast('data_shared') - search_results.js
  function navigate(nav){
    current_nav = nav;
    $rootScope.$broadcast('navigate_menu');
  }
  // description:     returns updated data
  // return:          list - current data list
  function getCurrNav(){
    return current_nav;
  }
  return{ 
      navigate: navigate,
      getCurrNav: getCurrNav
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


