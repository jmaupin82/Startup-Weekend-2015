/**
 * Created by Logan on 3/26/2015.
 */

var PunchList = angular.module('punchList', ['ui.router', 'mm.foundation']);

PunchList.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

	 	$stateProvider
	 		.state('/home', {
	 			url: '/home',
	 			templateUrl: 'templates/homepage.html',
	 			controller: 'Homepage'
	 		})
	 		.state('/projects', {
	 			url: '/projects',
	 			templateUrl: 'templates/projects.html',
	 			controller: 'Projects'
	 		})
	 		.state('/projects/{projectId}', {
	 			url: '/projects/{projectId}',
	 			templateUrl: 'templates/project.html',
	 			controller: 'Project'
	 		});
	}
]);

//PunchList.controller('Homepage', function($scope) {
//  $scope.oneAtATime = true;
//
//  $scope.groups = [
//    {
//      title: "Dynamic Group Header - 1",
//      content: "Dynamic Group Body - 1"
//    },
//    {
//      title: "Dynamic Group Header - 2",
//      content: "Dynamic Group Body - 2"
//    }
//  ];
//
//  $scope.items = ['Item 1', 'Item 2', 'Item 3'];
//
//  $scope.addItem = function() {
//    var newItemNo = $scope.items.length + 1;
//    $scope.items.push('Item ' + newItemNo);
//  };
//});

//PunchList.controller('Projects', function($scope) {
//
//});

//PunchList.controller('Project', function($scope, $stateParams) {
//	$scope.projectId = $stateParams.projectId;
//});
