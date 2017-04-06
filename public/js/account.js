app.controller('accountCtrl', function($scope, $http, userData){
	$scope.user = {};
	$scope.account_message = '';
	$scope.new_password = '';
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
	$scope.pwSubmit = function(){
		if($scope.new_password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
			userData.updatePassword($scope.user._id, $scope.new_password)
			.then(function(response){
				if(response.data.answer == 'success'){
					$scope.account_message = 'Password changed.';
				}
				else{
					$scope.account_message ='Network Connection Error.';
				}
			}, function(){
				$scope.account_message ='Network Connection Error.';
			})			
		}
		else{
			$scope.account_message = 'A password must: \n • Contain at least 8 characters \n • Contain at least 1 number \n • Contain at least 1 lowercase character (a-z) \n • Contain at least 1 uppercase character (A-Z) \n • Contain at least 1 special character';
		}
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