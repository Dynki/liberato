'use strict';

// Configuring the Articles module
angular.module('appointments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Appointments', 'appointments', 'dropdown', '/appointments(/create)?',true, null, 1 , 'lib/material-design-icons/action/svg/design/ic_perm_contact_calendar_24px.svg');
	}
]);