app.controller('scheduleCtrl', function($scope, $rootScope, selectResults){
	$scope.titles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	$scope.times = [];
	$scope.width_array = [];
	$scope.height_array = [];
	$scope.selectedClasses = [];
	$scope.tbaClasses = [];
	$scope.sessions = [];
	$scope.tba_sessions = [];
    $scope.$on('class_updated', function(){
		$scope.selectedClasses = selectResults.getClasses();
		// $scope.tbaClasses = selectResults.getTbaClasses();
		$scope.processSchedule($scope.selectedClasses);
		// $scope.processTbaSchedule($scope.tbaClasses);
	});
	$scope.initSchedule = function(){
		for(let i = 7; i < 23; i++){
			let time = '';
			if(i > 12){
				time =  i-12 + ':00 PM';
			}
			else if (i == 12){
				time = i + ':00 PM';
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
		$scope.tba_sessions = [];

		angular.forEach(classes, function(cls){
			let session = cls.subject+'-'+cls.course+'-'+cls.section
			angular.forEach(cls.schedule, function(cs){
		        if(cs.start_time.includes('TBA') || cs.end_time == undefined){
		          $scope.tba_sessions.push({'session': session, 'instructors': cls.instructor, 'time': 'TBA'})
		        }	
		        else{
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
				}
			})
		})
	}
	$scope.initSchedule();
})
app.directive('schedule', function(){
	return{
		templateUrl: '../templates/schedule.html'
	}
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
	    	if(scope.current.start[2] == 'pm' && scope.current.start[0] != 12){
	    		position_top += 12;
	    	}
	    	if(scope.current.end[2] == 'pm' && scope.current.end[0] != 12){
	    		position_bottom += 12;
	    	}
	    	position_top = position_top * 60;
	    	position_bottom = position_bottom * 60;
	    	position_top += parseInt(scope.current.start[1]) + 1;
	    	position_bottom += parseInt(scope.current.end[1]) - 1;	    	
	    	position_bottom -= position_top;
        	angular.element(element).css('top', position_top+ 'px');
        	angular.element(element).css('left', 'calc(' + position_left + '% ' + '+ .2%)');
        	angular.element(element).css('height', position_bottom + 'px');
        	angular.element(element).css('background', str);
        }
    }
})
app.directive('tbaContents', function(){
	return{
		restrict: 'EA',
		templateUrl: '../templates/tba.html',
        link: function(scope, element, attrs){
        	angular.element('#tbaOpener').bind('click',function(){
        		if(angular.element('#tbaContents').hasClass('active')){
        			angular.element('#tbaOpener .fa-caret-up').show();
        			angular.element('#tbaOpener .fa-caret-down').hide();
	        		angular.element('#tbaOpener').css('bottom', '0');
	        		angular.element('#tba').css('height', '0');
	        		angular.element('#tba').css('margin-top', '0');
	        		angular.element('#tbaContents').removeClass('active');
        		}
        		else{
        			angular.element('#tbaOpener .fa-caret-up').hide();
        			angular.element('#tbaOpener .fa-caret-down').show();
	        		angular.element('#tbaOpener').css('bottom', '130px');
	        		angular.element('#tba').css('height', '130px');
	        		angular.element('#tba').css('margin-top', '-130px');
	        		angular.element('#tbaContents').addClass('active');
        		}
        	})
        }
	}
})
app.directive('tbaItem', function(colorSelector){
	return{
    	scope:{
    		current: '=',
    	},
		restrict: 'EA',
		template: '<div class="schedule-title">{{ current.session }}<div> <div class="schedule-time">TBA</div>',
        link: function(scope, element, attrs){
            let str = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(';
            str += colorSelector.getColor(scope.current.session.split('-')[0])[0];
            str += '), to('+colorSelector.getColor(scope.current.session.split('-')[0])[1]+'))';
        	angular.element(element).css('background', str);

        }
	}
})