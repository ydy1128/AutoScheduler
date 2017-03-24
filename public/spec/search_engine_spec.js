describe('searchEngineCtrl', function(){
	let scope, http, httpBackend, createController, controller;

	beforeEach(function(){
		module('FrameItApp')
		inject(function($rootScope, $http, $httpBackend, $controller){
			httpBackend = $httpBackend;
			http = $http;
			scope = $rootScope.$new();
			createController = function(){
				return $controller('searchEngineCtrl', {
					'$scope': scope
				})
			}
		})
		controller = createController();
	    http.get('/class-data')
	    .then(
	        function(response){
	            scope.classes = response.data;
	            scope.filters = getFilters(response.data);
	        },
	        function(){
	            scope.classes = [];
	        }
	    )
		httpBackend
	    .expect('GET', '/class-data')
	    .respond(200, classdata.ClassInfo)
	    expect(httpBackend.flush).not.toThrow();
	})

	describe('$http', function(){
		it('the data response should not be empty', function(){
			expect(scope.classes).not.toEqual([]);
		})
		it('the data response should contain "CSCE" subject', function(){
			let array = [];
			angular.forEach(scope.classes, function(elem){
				array.push(elem.subject);
			})
			expect(array.indexOf('CSCE')).not.toEqual(-1);
		})
	})
	describe('select options and search message', function(){
		it('search message should be empty', function(){
			scope.selected_subjects = ['CSCE'];
			scope.searchSubmit();
			expect(scope.search_message).toEqual('');
		})
		it('empty filter message should be triggered', function(){
			scope.searchSubmit();
			expect(scope.search_message).toEqual('* At least one filter must be selected!');
		})
		it('empty filter message should be triggered', function(){
			scope.selected_subjects = ['CSCE'];
			scope.selected_courses = ['110', '482'];
			scope.searchSubmit();
			expect(scope.search_message).toEqual('* Selected filters has not been applied.');
		})
	})
})