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


PunchList.directive('dbinfOnFilesSelected', [function() {
  return {
    restrict: 'A',
    scope: {
      //attribute data-dbinf-on-files-selected (normalized to dbinfOnFilesSelected) identifies the action
      //to take when file(s) are selected. The '&' says to  execute the expression for attribute
      //data-dbinf-on-files-selected in the context of the parent scope. Note though that this '&'
      //concerns visibility of the properties and functions of the parent scope, it does not
      //fire the parent scope's $digest (dirty checking): use $scope.$apply() to update views
      //(calling scope.$apply() here in the directive had no visible effect for me).
      dbinfOnFilesSelected: '&'
    },
    link: function(scope, element, attr, ctrl) {
      element.bind("change", function()
      {  //match the selected files to the name 'selectedFileList', and
        //execute the code in the data-dbinf-on-files-selected attribute
        scope.dbinfOnFilesSelected({selectedFileList : element[0].files});
      });
    }
  }
}]);
