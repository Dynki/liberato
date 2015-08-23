'use strict';

// Configuring the Articles module
angular.module('dashboards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Dashboards', 'dashboards', 'dropdown', '/dashboards(/create)?',true, null, 0 , "dashboard");
		// Menus.addSubMenuItem('topbar', 'dashboards', 'List Dashboards', 'dashboards');
		// Menus.addSubMenuItem('topbar', 'dashboards', 'New Dashboard', 'dashboards/create');
	}
]);