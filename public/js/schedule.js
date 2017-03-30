app.controller('scheduleCtrl', function($scope, $rootScope, selectResults){
	$scope.titles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	$scope.times = [];
	$scope.width_array = [];
	$scope.height_array = [];
	$scope.selectedClasses = [];
	$scope.sessions = [];
    $scope.$on('class_updated', function(){
		$scope.selectedClasses = selectResults.getClasses();
		$scope.processSchedule($scope.selectedClasses);
	});
	$scope.initSchedule = function(){
		for(let i = 7; i < 23; i++){
			let time = '';
			if(i > 12){
				time =  i-12 + ':00 PM';
			}
			else{
				time =  i + ':00 AM';
			}
			$scope.times.push(time)
			$scope.times.push('')
		}
		$scope.width_array = new Array($scope.titles.length);
		$scope.height_array = new Array($scope.times.length);
	}
	$scope.processSchedule = function(classes){
		$scope.sessions = [];
		angular.forEach(classes, function(cls){
			let session = cls.subject+'-'+cls.course+'-'+cls.section
			angular.forEach(cls.schedule, function(cs){
				let start_time = cs.start_time.split(' ')[0].split(':');
				let end_time = cs.end_time.split(' ')[0].split(':');
				let start_ampm = cs.start_time.split(' ')[1];
				let end_ampm = cs.end_time.split(' ')[1];
				start_time.push(start_ampm);
				end_time.push(end_ampm);
				angular.forEach(cs.days,function(day){
					switch(day){
						case 'M':
							day = 0;
						break;
						case 'T':
							day = 1;
						break;
						case 'W':
							day = 2;
						break;
						case 'R':
							day = 3;
						break;
						case 'F':
							day = 4;
						break;
					}
					$scope.sessions.push({'session': session, 'instructors': cls.instructor, 'day': day, 'start': start_time, 'end': end_time})
				})
			})
		})
	}
	$scope.initSchedule();
})

app.directive('scheduleItem', function(colorSelector){
    return{
    	scope:{
    		current: '=',
    	},
        restrict: 'EA',
        templateUrl: '../templates/schedule_item.html',
        link: function(scope, element, attrs){
	    	let position_top = parseInt(scope.current.start[0]) - 7;
	    	let position_left = parseInt(scope.current.day) * 20;
	    	let position_bottom = parseInt(scope.current.end[0]) - 7;
            let str = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(';
            str += colorSelector.getColor(scope.current.session.split('-')[0])[0];
            str += '), to('+colorSelector.getColor(scope.current.session.split('-')[0])[1]+'))';
            console.log(scope.current.session)
            console.log(scope.current.end[2])
	    	if(scope.current.start[2] == 'pm'){
	    		position_top += 12;
	    	}
	    	if(scope.current.end[2] == 'pm'){
	    		position_bottom += 12;
	    	}
	    	console.log(position_top, position_bottom)

	    	position_top = position_top * 60;
	    	position_bottom = position_bottom * 60;
	    	position_top += parseInt(scope.current.start[1]) + 1;
	    	position_bottom += parseInt(scope.current.end[1]) - 1;	    	
	    	position_bottom -= position_top;
	    	console.log(position_top, position_bottom)
        	angular.element(element).css('top', position_top+ 'px');
        	angular.element(element).css('left', 'calc(' + position_left + '% ' + '+ .2%)');
        	angular.element(element).css('height', position_bottom + 'px');
        	angular.element(element).css('background', str);
        }
    }
})