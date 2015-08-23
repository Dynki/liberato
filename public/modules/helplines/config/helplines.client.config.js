'use strict';

// Configuring the Articles module
angular.module('helplines').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Helplines', 'helplines', 'dropdown', '/helplines(/create)?',true, null, 3 , "phone");
		// Menus.addSubMenuItem('topbar', 'helplines', 'List Helplines', 'helplines');
		// Menus.addSubMenuItem('topbar', 'helplines', 'New Helpline', 'helplines/create');
	}
]);