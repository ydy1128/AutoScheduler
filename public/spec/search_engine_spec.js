describe('searchEngineCtrl', function(){
	beforeEach(angular.mock.module('FrameItApp'));
	var $controller, $http, $httpBackend;

	beforeEach(angular.mock.inject(function($injector){
		$controller = $injector.get('$controller');
		$http = $injector.get('$http');
		$httpBackend = $injector.get('$httpBackend');
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
	}))


	describe('$scope.filters', function(){
		it('- contains "CSCE" check', function(){
			$scope = {};
			var controller = $controller('searchEngineCtrl', { $scope: $scope });
			//loads dummy data
			$scope.classes = classdata['ClassInfo']
            $scope.filters = getFilters(classdata['ClassInfo']);

			expect($scope.filters.map(function(e) { return e.subject; }).indexOf('CSCE')).not.toBe(-1);
		})
	})
	describe('$scope.searchSUmbit()', function(){
		beforeEach(function() {
			$scope = {};
			controller = $controller('searchEngineCtrl', { $scope: $scope });
		});
		it('- empty filter check', function(){
			//loads dummy data
			$scope.classes = classdata['ClassInfo']
            $scope.filters = getFilters(classdata['ClassInfo']);

		    $scope.selected_subjects = [];
		    $scope.selected_courses = [];
		    $scope.selected_instructors = [];
		    $scope.selected_days = [];
		    $scope.search_message = '';

		    $scope.searchSubmit();
			expect($scope.search_message).toBe('* At least one filter must be selected!');
		})
		// it('- no result found check', function(){
		// 	//loads dummy data
		//     // angular.element('body').append('<div id="searchEngine" ng-controller="searchEngineCtrl"></div>');
		// 	$scope.classes = classdata['ClassInfo']
  //           $scope.filters = getFilters(classdata['ClassInfo']);

		//     $scope.selected_subjects = ['CSCE'];
		//     $scope.selected_courses = ['482'];
		//     $scope.selected_instructors = [];
		//     $scope.selected_days = [];
		//     $scope.search_message = '';


		//     $scope.searchSubmit();

		// 	expect($scope.search_message).toBe('* No Results Found.');
		// })
	})
})