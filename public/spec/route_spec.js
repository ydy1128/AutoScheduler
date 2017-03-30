//Unit Testing for Routing
describe('FrameItApp - Routing', function(){
	var $rootScope, $state, $injector, serviceMock, state = '';
	beforeEach(function(){
		module('FrameItApp')
		inject(function(_$rootScope_, _$state_, _$injector_, $templateCache){
			$rootScope = _$rootScope_;
			$state = _$state_;
			$injector = _$injector_;

			$templateCache.put('templates/document.html', '')
		})
	})
	
	it('should respond to URL /', function(){
		state = 'home'
		expect($state.href(state, {})).toEqual('/')
	})
	it('should respond to URL /documents', function(){
		state = 'documents'
		expect($state.href(state, {})).toEqual('/documents')
	})
})