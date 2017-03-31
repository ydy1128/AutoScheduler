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
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  // description:     routing for admin page
  .state('admin', {
    url: '/admin',
    templateUrl: 'templates/admin.html'     
  })
  .state('admin-home', {
    url: '/admin-home',
    templateUrl: 'templates/admin_home.html'     
  });
  $locationProvider.html5Mode(true);
})

app.run(function($rootScope, $location, authentication, adminAuthentication){
  $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() === '/documents' && !authentication.isLoggedIn()) {
      $location.path('/login');
    }
    if ($location.path() === '/account' && !authentication.isLoggedIn()) {
      $location.path('/login');
    }
    if ($location.path() === '/login' && authentication.isLoggedIn()) {
      $location.path('/documents');
    }
    if ($location.path() === '/admin-home' && !adminAuthentication.isLoggedIn()) {
      $location.path('/admin');
    }
    if ($location.path() === '/admin' && adminAuthentication.isLoggedIn()) {
      $location.path('/admin-home');
    }
  });
})

// description:     controller for the whole app
// commented out:   commented because the outside app does not need a controller yet
app.controller('FrameItAppCtrl', function($http, $scope, $location, authentication, adminAuthentication){
  $scope.classes = null;
  $scope.filters = null;
  $http.get('/class-data')
  .then(
      function(response){
          $scope.classes = response.data;
          $scope.filters = $scope.getFilters($scope.classes);
      },
      function(){
          $scope.classes = [];
          console.log('db connection error');
      }
  )
  // description:     get all filters (subject, course, instructor, day)
  // input:           data - the whole data
  // return:          temp - filter titles
  $scope.getFilters = function(data){
      var result = {};
      result.subject = [];
      result.course = [];
      result.instructor = [];
      result.days = ['M', 'T', 'W', 'R', 'F'];
      angular.forEach(data, function(item){
        if(result.subject.indexOf(item.subject) == -1){
          result.subject.push(item.subject)
        }
      });
      angular.forEach(data, function(item){
        if(result.course.indexOf(item.course) == -1){
          result.course.push(item.course)
        }
      });
      angular.forEach(data, function(item){
        angular.forEach(item.instructor, function(ins){
          if(result.instructor.indexOf(ins) == -1){
            result.instructor.push(ins)
          }
        })
      });


      return result;
  }

  $scope.logout = function(){
    console.log('logout called')
    authentication.logout()
    $location.path('/')
  }
  $scope.admin_logout = function(){
    console.log('adminlogout called')
    adminAuthentication.logout()
    $location.path('/admin')
  }
});