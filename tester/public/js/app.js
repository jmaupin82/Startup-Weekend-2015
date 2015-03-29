/**
 * Created by Logan on 3/26/2015.
 */

var PunchList = angular.module('punchList', ['ui.router', 'mm.foundation', 'datePicker']);

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
