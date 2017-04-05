describe('searchResultsCtrl', function(){
	let scope, http, httpBackend, createController, controller;

	beforeEach(function(){
		module('FrameItApp')
		inject(function($rootScope, $http, $httpBackend, $controller, $injector){
			passResults = $injector.get('passResults');
			httpBackend = $httpBackend;
			http = $http;
			scope = $rootScope.$new();
			createController = function(){
				return $controller('searchResultsCtrl', {
					'$scope': scope
				})
			}
		})
		controller = createController();
	})

	it('filtered data should not be empty', function(){
		passResults.updateClasses(filtered_dummy_data1)
		expect(scope.filteredClasses).not.toEqual([]);
	})
	it('filtered data should be filtered correctly', function(){
		let pass = true;
		passResults.updateClasses(filtered_dummy_data1)
		angular.forEach(scope.filteredClasses, function(elem){
			if(elem.subject != 'CSCE'){
				pass = false;
			}
		})
		expect(pass).toEqual(true);
	})
	it('filtered data subject sort', function(){
		passResults.updateClasses(filtered_dummy_data2)
		scope.courseSort();
		scope.subjectSort();
		expect(scope.filteredClasses[0].subject).toEqual('AERS');
		expect(scope.filteredClasses[1].subject).toEqual('CSCE');
	})
	it('filtered data course# sort', function(){
		passResults.updateClasses(filtered_dummy_data2)
		scope.courseSort();
		expect(scope.filteredClasses[0].course).toEqual('102');
		expect(scope.filteredClasses[1].course).toEqual('102');
	})
	it('filtered data section sort', function(){
		passResults.updateClasses(filtered_dummy_data2)
		scope.sectionSort();
		expect(scope.filteredClasses[0].section).toEqual('501');
		expect(scope.filteredClasses[1].section).toEqual('502');
	})
	it('updating data should clear sort_by', function(){
		passResults.updateClasses(filtered_dummy_data2)
		expect(scope.sort_by).toEqual('0');
	})
})