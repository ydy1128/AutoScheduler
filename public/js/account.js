app.controller('accountCtrl', function($scope, userData){
	$scope.user = {};
	$scope.account_message = '';
	$scope.notis = [{id: 'noti1', label: 'Night before registration',checked: 'chedked'},
					{id: 'noti2', label: '5 minutes before Registration',checked: 'chedked'}];
	$scope.init = function(){
		userData.getProfile()
		.then(function(response){
			$scope.user = response.data;
			if(!$scope.user.preferences.noti1){
				angular.element('#noti1').trigger('click');
			}
			if(!$scope.user.preferences.noti2){
				angular.element('#noti2').trigger('click');
			}
		},
		function(){
			console.log('Unknown User Error')
		})
	}
	$scope.accountSubmit = function(){
		userData.updateUser($scope.user._id, $scope.user);
		$scope.account_message = 'Account Updated.';
	}
	$scope.init();
});
app.directive('notiChecks', function(userData){
	return{
		restrict: 'EA',
		template: '<input id="{{ noti.id }}" type="checkbox" data-reverse checked /> <label>{{ noti.label }}</label>',
		link: function(scope, element, attrs){
			angular.element(element).find(':checkbox').checkboxpicker();
			angular.element(element).find('input').change(function(){
				switch(angular.element(element).find(':checkbox').attr('id')){
					case 'noti1':
						scope.user.preferences.noti1 = angular.element(element).find('a:first-child').hasClass('active')
						userData.updateUser(scope.user._id, scope.user);
						break;
					case 'noti2':
						scope.user.preferences.noti2 = angular.element(element).find('a:first-child').hasClass('active')
						userData.updateUser(scope.user._id, scope.user);
						break;
				}
			})
		}
	}
})