'use strict';

//Helplines service used to communicate Helplines REST endpoints
angular.module('helplines').factory('Helplines', ['$resource',
	function($resource) {
		return $resource('helplines/:helplineId', { helplineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);