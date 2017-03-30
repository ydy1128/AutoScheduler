app.controller('settingCtrl', function($scope, userData){
	$scope.user = {};
	$scope.menu_list = ['Account', 'Password', 'Notification']
});
app.directive('settingList', function(navigator){
	return{
		restrict: 'EA',
		template: '{{ x }} <i class="fa fa-chevron-right" aria-hidden="true"></i>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				angular.element(element).parent().find('.fa-chevron-right').hide();
				element.find('.fa-chevron-right').show();
			});
		}
	}
})