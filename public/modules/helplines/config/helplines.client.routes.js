'use strict';

//Setting up route
angular.module('helplines').config(['$stateProvider',
	function($stateProvider) {
		// Helplines state routing
		$stateProvider.
		state('listHelplines', {
			url: '/helplines',
			templateUrl: 'modules/helplines/views/list-helplines.client.view.html'
		}).
		state('createHelpline', {
			url: '/helplines/create',
			templateUrl: 'modules/helplines/views/create-helpline.client.view.html'
		}).
		state('viewHelpline', {
			url: '/helplines/:helplineId',
			templateUrl: 'modules/helplines/views/view-helpline.client.view.html'
		}).
		state('editHelpline', {
			url: '/helplines/:helplineId/edit',
			templateUrl: 'modules/helplines/views/edit-helpline.client.view.html'
		});
	}
]);