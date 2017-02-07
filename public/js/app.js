var app = angular.module('FrameItApp',['ui.router'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
    
    $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
    })
    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('documents', {
        url: '/documents',
        templateUrl: 'templates/documents.html'     
    });
    $locationProvider.html5Mode(true);
})
// app.controller('FrameItAppCtrl', function($scope){

// });
//
app.factory('passResults', function($rootScope){
    var list = [];
    function updateClasses(cls){
        list = cls;
        $rootScope.$broadcast('data_shared');
    }
    function getClasses(){
        return list;
    }
    return{ 
        updateClasses: updateClasses,
        getClasses: getClasses
    }
})
