'use strict';

//Setting up route
angular.module('dashboards').config(['$stateProvider',
	function($stateProvider) {
		// Dashboards state routing
		$stateProvider.
		state('viewDashboard', {
			url: '/dashboards',
			templateUrl: 'modules/dashboards/views/view-dashboard.client.view.html'
		})
	}
]);