'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdDialog', '$http', '$location', '$window', 'Menus', '$rootScope',
	function($scope, Authentication, $mdSidenav, $mdDialog, $http, $location, $window, Menus, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.menu = Menus.getMenu('topbar');
		
	}
]);