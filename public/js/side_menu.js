app.controller('sideMenuCtrl', function($scope, navigator){
	$scope.title = 'Worksheets';
	$scope.template = "../templates/worksheets.html";
	$scope.$on('navigate_menu', function(){
		$scope.updateTemplate(navigator.getCurrNav());
	});
	$scope.updateTemplate = function(value){
		switch(value){
			case 'worksheets':
				$scope.template = "../templates/worksheets.html";
				$scope.title = 'Worksheets';
				break;
			case 'search':
				$scope.template = "../templates/search_engine.html";
				$scope.title = 'Search';
				break;
			case 'result':
				$scope.template = "../templates/search_result.html";
				$scope.title = 'Result';
				break;
			case 'selected':
				$scope.template = "../templates/selected_result.html";
				$scope.title = 'Selected';
				break;
			case 'setting':
				$scope.template = "../templates/worksheets.html";
				$scope.title = 'Settings';
				break;
		}
	}
});
app.directive('sheetMenu', function(navigator){
	return{
		restrict: 'EA',
		template: '<a class="active" ng-click="updateTemplate(\'worksheets\')"><i class="fa fa-file-text-o" aria-hidden="true"></i></a>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element('.nav-stacked li a').removeClass('active')
				element.find('a').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'worksheets'){
					element.trigger('click');	
				}
			})
		}
	}
})
app.directive('searchMenu', function(navigator){
	return{
		restrict: 'EA',
		template: '<a ng-click="updateTemplate(\'search\')"><i class="fa fa-search" aria-hidden="true"></i></a>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element('.nav-stacked li a').removeClass('active')
				element.find('a').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'search'){
					element.trigger('click');	
				}
			})
		}
	}
})
app.directive('resultMenu', function(navigator){
	return{
		restrict: 'EA',
		template: '<a ng-click="updateTemplate(\'result\')"><i class="fa fa-list" aria-hidden="true"></i></a>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element('.nav-stacked li a').removeClass('active')
				element.find('a').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'result'){
					element.trigger('click');	
				}
			})
		}
	}
})
app.directive('selectedMenu', function(navigator){
	return{
		restrict: 'EA',
		template: '<a ng-click="updateTemplate(\'selected\')"><i class="fa fa-check-square-o" aria-hidden="true"></i></a>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element('.nav-stacked li a').removeClass('active')
				element.find('a').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'selected'){
					element.trigger('click');	
				}
			})
		}
	}
})
app.directive('settingMenu', function(navigator){
	return{
		restrict: 'EA',
		template: '<a ng-click="updateTemplate(\'setting\')"><i class="fa fa-cog" aria-hidden="true"></i></a>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element('.nav-stacked li a').removeClass('active')
				element.find('a').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'settings'){
					element.trigger('click');	
				}
			})
		}
	}
})