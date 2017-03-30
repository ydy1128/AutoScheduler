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