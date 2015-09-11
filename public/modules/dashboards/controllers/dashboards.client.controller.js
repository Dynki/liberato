'use strict';

// Dashboards controller
angular.module('dashboards').controller('DashboardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Dashboards',
	function($scope, $stateParams, $location, Authentication, Dashboards) {
		$scope.authentication = Authentication;

        $scope.allContacts = [{name: 'Teveor Longbottom', email: 'trev@grimauld.com'}];

    // Chart.defaults.global.responsive = true;
    // Chart.defaults.global.maintainAspectRatio = false;

		// Create new Dashboard
		$scope.create = function() {
			// Create new Dashboard object
			var dashboard = new Dashboards ({
				name: this.name
			});

			// Redirect after save
			dashboard.$save(function(response) {
				$location.path('dashboards/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dashboard
		$scope.remove = function(dashboard) {
			if ( dashboard ) { 
				dashboard.$remove();

				for (var i in $scope.dashboards) {
					if ($scope.dashboards [i] === dashboard) {
						$scope.dashboards.splice(i, 1);
					}
				}
			} else {
				$scope.dashboard.$remove(function() {
					$location.path('dashboards');
				});
			}
		};

		// Update existing Dashboard
		$scope.update = function() {
			var dashboard = $scope.dashboard;

			dashboard.$update(function() {
				$location.path('dashboards/' + dashboard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Dashboards
		$scope.find = function() {
			$scope.dashboards = Dashboards.query();
		};

		// Find existing Dashboard
		$scope.findOne = function() {
			$scope.dashboard = Dashboards.get({ 
				dashboardId: $stateParams.dashboardId
			});
		};
		
	  
        var options = {
            scaleShowGridLines : true,
            scaleGridLineColor : 'rgba(0,0,0,.05)',
            scaleGridLineWidth : 1,
            bezierCurve : true,
            bezierCurveTension : 0.4,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            legendTemplate : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };

        var ctx2 = $('#myPieChart1').get(0).getContext('2d');
        var ctx3 = $('#myPieChart2').get(0).getContext('2d');

        $scope.data2 = [
            {
                value: 80,
                color:'#3F51B5',
                highlight: '#3F51B5',
                label: 'Complete'
            },
            {
                value: 20,
                color: '#46BFBD',
                highlight: '#46BFBD',
                label: 'Incomplete'
            }
        ];

        $scope.data3 = [
            {
                value: 65,
                color:'#3F51B5',
                highlight: '##3F51B5',
                label: 'Not a risk'
            },
            {
                value: 35,
                color: '#F53F32',
                highlight: '#F53F32',
                label: 'At Risk'
            }
        ];

        var myDoughnutChart = new Chart(ctx2).Doughnut($scope.data2,options);
        var myDoughnutChart2 = new Chart(ctx3).Doughnut($scope.data3,options);


        $scope.getDOW = function(date, dow){

            var newDate = new Date(date);

            newDate.setDate(newDate.getDate() + dow);

            var weekday = new Array(7);
            weekday[0]= 'Sunday';
            weekday[1] = 'Monday';
            weekday[2] = 'Tuesday';
            weekday[3] = 'Wednesday';
            weekday[4] = 'Thursday';
            weekday[5] = '"Friday';
            weekday[6] = 'Saturday';

            return weekday[newDate.getDay()];
        };

        var date = new Date();

        var data = {
            labels: [$scope.getDOW(date, -7),
                $scope.getDOW(date, -6),
                $scope.getDOW(date, -5),
                $scope.getDOW(date, -4),
                $scope.getDOW(date, -3),
                $scope.getDOW(date, -2),
                $scope.getDOW(date, -1)],
            datasets: [
                {
                    label: 'New Clients',
                    fillColor: '#3F51B5',
                    strokeColor: '#3F51B5',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 36, 44, 48, 66, 88, 90]
                }
            ]
        };

        var dataBar = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Male",
                    fillColor: "#3F51B5",
                    strokeColor: "#3F51B5",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "Female",
                    fillColor: "#FE9700",
                    strokeColor: "#FE9700",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };    
        
        var optionsBar = {
                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                scaleBeginAtZero : true,
            
                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines : false,
            
                //String - Colour of the grid lines
                scaleGridLineColor : "rgba(0,0,0,.05)",
            
                //Number - Width of the grid lines
                scaleGridLineWidth : 1,
            
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
            
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
            
                //Boolean - If there is a stroke on each bar
                barShowStroke : true,
            
                //Number - Pixel width of the bar stroke
                barStrokeWidth : 2,
            
                //Number - Spacing between each of the X value sets
                barValueSpacing : 5,
            
                //Number - Spacing between data sets within X values
                barDatasetSpacing : 1,
            
                //String - A legend template
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            
            }    
            
        // Get context with jQuery - using jQuery's .get() method.
        var ctxBar = $('#BarChart1').get(0).getContext('2d');
    
    
    
     var myBarChart = new Chart(ctxBar).Bar(dataBar, optionsBar);
        

	}
	
	
]);