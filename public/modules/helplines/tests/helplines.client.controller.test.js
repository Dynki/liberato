'use strict';

(function() {
	// Helplines Controller Spec
	describe('Helplines Controller Tests', function() {
		// Initialize global variables
		var HelplinesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Helplines controller.
			HelplinesController = $controller('HelplinesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Helpline object fetched from XHR', inject(function(Helplines) {
			// Create sample Helpline using the Helplines service
			var sampleHelpline = new Helplines({
				name: 'New Helpline'
			});

			// Create a sample Helplines array that includes the new Helpline
			var sampleHelplines = [sampleHelpline];

			// Set GET response
			$httpBackend.expectGET('helplines').respond(sampleHelplines);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.helplines).toEqualData(sampleHelplines);
		}));

		it('$scope.findOne() should create an array with one Helpline object fetched from XHR using a helplineId URL parameter', inject(function(Helplines) {
			// Define a sample Helpline object
			var sampleHelpline = new Helplines({
				name: 'New Helpline'
			});

			// Set the URL parameter
			$stateParams.helplineId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/helplines\/([0-9a-fA-F]{24})$/).respond(sampleHelpline);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.helpline).toEqualData(sampleHelpline);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Helplines) {
			// Create a sample Helpline object
			var sampleHelplinePostData = new Helplines({
				name: 'New Helpline'
			});

			// Create a sample Helpline response
			var sampleHelplineResponse = new Helplines({
				_id: '525cf20451979dea2c000001',
				name: 'New Helpline'
			});

			// Fixture mock form input values
			scope.name = 'New Helpline';

			// Set POST response
			$httpBackend.expectPOST('helplines', sampleHelplinePostData).respond(sampleHelplineResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Helpline was created
			expect($location.path()).toBe('/helplines/' + sampleHelplineResponse._id);
		}));

		it('$scope.update() should update a valid Helpline', inject(function(Helplines) {
			// Define a sample Helpline put data
			var sampleHelplinePutData = new Helplines({
				_id: '525cf20451979dea2c000001',
				name: 'New Helpline'
			});

			// Mock Helpline in scope
			scope.helpline = sampleHelplinePutData;

			// Set PUT response
			$httpBackend.expectPUT(/helplines\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/helplines/' + sampleHelplinePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid helplineId and remove the Helpline from the scope', inject(function(Helplines) {
			// Create new Helpline object
			var sampleHelpline = new Helplines({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Helplines array and include the Helpline
			scope.helplines = [sampleHelpline];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/helplines\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleHelpline);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.helplines.length).toBe(0);
		}));
	});
}());