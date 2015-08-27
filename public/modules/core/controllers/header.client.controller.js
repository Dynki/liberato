'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$mdSidenav', '$mdDialog', '$http', '$location', '$window', 'Menus', '$rootScope',
	function($scope, Authentication, $mdSidenav, $mdDialog, $http, $location, $window, Menus, $rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

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

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
		$scope.changeState = function(url){
			$location.path(url);
		}
	}
]);