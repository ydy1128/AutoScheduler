app.controller('sideMenuCtrl', function($scope, $http, navigator, $location, selectResults, userData){
	$scope.title = 'Worksheets';
	$scope.schedule_title = 'Account Setting';
	$scope.template = "../templates/side_menu.html";
	$scope.schedule_template = "../templates/empty_schedule.html";
	$scope.selected_worksheet = '';
	$scope.worksheets = [];
    $scope.worksheet_message = '';
    $scope.worksheet_counter = 0;
    $scope.user = {};

	userData.getProfile()
	.then(
		function(response){
			$scope.user = response.data;
			let temp_sheets = [];

			for(let i = 0; i < $scope.user.schedules.length; i++){
				temp_sheets.push(parseInt($scope.user.schedules[i].name.split(' ')[1]))
				$scope.worksheets.push($scope.user.schedules[i].name)
			}
			if(temp_sheets.length > 0){
				$scope.worksheet_counter = Math.max.apply(null, temp_sheets);
			}
		},
		function(err){
			console.log('unknown user error: '+err)
		}
	)

	$scope.$on('navigate_menu', function(){
		$scope.updateTemplate(navigator.getCurrNav());
	});

	$scope.addWorksheet = function(){
		$scope.worksheet_counter++;
		var new_name = 'Schedule ' + $scope.worksheet_counter;
		var new_schedule = {'name': new_name, 'courses': []};
		$scope.worksheets.push(new_name);
		$scope.user.schedules.push(new_schedule)
		userData.updateUser($scope.user._id, $scope.user)
		$scope.selected_worksheet = new_name;
		$scope.schedule_template = "../templates/schedule.html";
		selectResults.selectSchedule(new_name)
	}
	$scope.updateTemplate = function(value){
		switch(value){
			case 'worksheets':
				$scope.template = "../templates/side_menu.html";
				if($scope.selected_worksheet == ''){
					$scope.schedule_template = "../templates/empty_schedule.html";
				}	
				else{
					$scope.schedule_template = "../templates/schedule.html";
				}

				$scope.title = 'Worksheets';
				break;
			case 'search':
				$scope.template = "../templates/side_menu.html";
				if($scope.selected_worksheet == ''){
					$scope.schedule_template = "../templates/empty_schedule.html";
				}	
				else{
					$scope.schedule_template = "../templates/schedule.html";
				}

				$scope.title = 'Search';
				break;
			case 'result':
				$scope.template = "../templates/side_menu.html";
				if($scope.selected_worksheet == ''){
					$scope.schedule_template = "../templates/empty_schedule.html";
				}	
				else{
					$scope.schedule_template = "../templates/schedule.html";
				}

				$scope.title = 'Result';
				break;
			case 'selected':
				$scope.template = "../templates/side_menu.html";
				if($scope.selected_worksheet == ''){
					$scope.schedule_template = "../templates/empty_schedule.html";
				}	
				else{
					$scope.schedule_template = "../templates/schedule.html";
				}

				$scope.title = 'Schedule';
				break;
			case 'setting':
				$scope.template = "../templates/side_menu.html";
				$scope.schedule_template = "../templates/account.html";
				$scope.title = 'Settings';
				break;
		}
	}
	$scope.updateScheduleTemplate = function(value){
		value = value.toLowerCase();
		switch(value){
			case 'schedule':
				$scope.schedule_template = "../templates/schedule.html";
				break;
			case 'account':
				$scope.schedule_template = "../templates/account.html";
				$scope.schedule_title = 'Account Setting';
				break;
			case 'password':
				$scope.schedule_template = "../templates/password.html";
				$scope.schedule_title = 'Password Setting';
				break;
			case 'notification':
				$scope.schedule_template = "../templates/notification.html";
				$scope.schedule_title = 'Notification Setting';
				break;
		}
	}
	$scope.removeWorksheet = function(item){
		let remove_index = $scope.worksheets.indexOf(item);
		let db_remove_index = -1;
		for(let i = 0; i < $scope.user.schedules.length; i++){
			if($scope.user.schedules[i].name == item){
				db_remove_index = i;
				break;
			}
		}
		// console.log(db_remove_index)

		$scope.worksheets.splice(remove_index, 1);
		$scope.user.schedules.splice(db_remove_index, 1);

		// $scope.user.schedules.push(new_schedule)
		userData.updateUser($scope.user._id, $scope.user)
		$scope.schedule_template = "../templates/empty_schedule.html";
	}
	$scope.loadWorksheet = function(item){
		let remove_index = $scope.worksheets.indexOf(item);
		$scope.selected_worksheet = item;
		$scope.updateScheduleTemplate('schedule');
		selectResults.selectSchedule(item);
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
				angular.element('.side-contents').removeClass('active');
				angular.element('#worksheets').addClass('active');
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
				angular.element('.side-contents').removeClass('active');
				angular.element('#search').addClass('active');
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
				angular.element('.side-contents').removeClass('active');
				angular.element('#result').addClass('active');
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
				angular.element('.side-contents').removeClass('active');
				angular.element('#selected').addClass('active');
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
				angular.element('.side-contents').removeClass('active');
				angular.element('#settings').addClass('active');
			}),
			scope.$on('navigate_menu', function(){
				if(navigator.getCurrNav() == 'settings'){
					element.trigger('click');	
				}
			})
		}
	}
})


app.directive('worksheetItem', function(selectResults, navigator, colorSelector){
    return{
        restrict: 'EA',
        templateUrl: '../templates/worksheet_item.html',
        link: function(scope, element, attrs){
        	angular.element(element).bind('click', function(){
	        	if(angular.element(element).hasClass('active')){
	        		angular.element(element).find('.fa').fadeOut(300);
	        		angular.element(element).removeClass('active')
	        	}
	        	else{
	        		angular.element(element).find('.fa').fadeIn(300);
	        		angular.element(element).addClass('active')
	        	}
        	})
        }
    }
});