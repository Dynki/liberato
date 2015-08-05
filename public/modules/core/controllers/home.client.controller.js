'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdDialog', '$http', '$location', '$window',
	function($scope, Authentication, $mdSidenav, $mdDialog, $http, $location, $window) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.collapseMenu = false;
		
		$scope.toggleSideNav = function() {
			$scope.collapseMenu = !$scope.collapseMenu;
  		};
		  
		$scope.logout = function() {
			$http.get('auth/signout').then(function(){
			});
			$scope.authentication = undefined;
			$window.user = undefined;
			Authentication.user = $window.user
			
			// And redirect to the index page
			$location.path('/signin');
  		};
	}
]);