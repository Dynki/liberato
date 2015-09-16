'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/dashboards/views/view-dashboard.client.view.html'
		});
	}
]).run(['$rootScope','$location','Authentication',function($rootScope, $location, Authentication){
	
	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams){ 
		if (!Authentication.user && toState.name != 'signin')
			$location.path('signin');
		})
}])		
