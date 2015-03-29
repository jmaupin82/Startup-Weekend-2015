(function() {
  var punchlist = angular.module('punchList');

  var Project = function($scope, $stateParams, $modal, $state) {
    $scope.projectId = $stateParams.projectId;
    $scope.idTip = 'Share this id with your client for them to join the project.';

    if (!window.user) {
    	$state.go('/home');
    	return;
    }

    $scope.createPunch = function() {
    	$modal.open({
    		templateUrl: 'templates/CreatePunch.html',
    		controller: 'Punch',
    		resolve: {
    			projectId: function() {
    				return $stateParams.projectId;
    			}
    		}
    	});
    };

    dpd.projects.get($scope.projectId)
    	.then(function(project) {
    		$scope.projectName = project.name;
    		$scope.projectDescription = project.description;
    		$scope.$apply();
    	});

    dpd.punches.get({projectID: $scope.projectId})
    	.then(function(projects) {
    		var punches = [], wishlist = [];

    		(projects || []).forEach(function(project) {
    			project.completed = true;
    			if (project.isWishList) {
    				wishlist.push(project);
    			} else {
    				punches.push(project);
    			}
    		});

    		punches.sort(function(a, b) {
    			var valA = a.date,
    				valB = b.date;

    			return valA < valB ? -1 : valA === valB ? 0 : 1;
    		});

    		wishlist.sort(function(a, b) {
    			var valA = a.wishPriority,
    				valB = b.wishPriority;

    			return valA < valB ? -1 : valA === valB ? 0 : 1;
    		});


    		$scope.wishlist = wishlist;
    		$scope.punches = punches;

    		$scope.$apply();
    	});
  };

  punchlist.controller('Project', Project);

}());
