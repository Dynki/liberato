'use strict';

// Helplines controller
angular.module('helplines').controller('HelplinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Helplines',
	function($scope, $stateParams, $location, Authentication, Helplines) {
		$scope.authentication = Authentication;

		// Create new Helpline
		$scope.create = function() {
			// Create new Helpline object
			var helpline = new Helplines ({
				name: this.name
			});

			// Redirect after save
			helpline.$save(function(response) {
				$location.path('helplines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Helpline
		$scope.remove = function(helpline) {
			if ( helpline ) { 
				helpline.$remove();

				for (var i in $scope.helplines) {
					if ($scope.helplines [i] === helpline) {
						$scope.helplines.splice(i, 1);
					}
				}
			} else {
				$scope.helpline.$remove(function() {
					$location.path('helplines');
				});
			}
		};

		// Update existing Helpline
		$scope.update = function() {
			var helpline = $scope.helpline;

			helpline.$update(function() {
				$location.path('helplines/' + helpline._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Helplines
		$scope.find = function() {
			$scope.helplines = Helplines.query();
		};

		// Find existing Helpline
		$scope.findOne = function() {
			$scope.helpline = Helplines.get({ 
				helplineId: $stateParams.helplineId
			});
		};
	}
]);