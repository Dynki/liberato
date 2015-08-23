'use strict';

// Configuring the Articles module
angular.module('appointments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Appointments', 'appointments', 'dropdown', '/appointments(/create)?',true, null, 2 , "access_time");
	}
]);