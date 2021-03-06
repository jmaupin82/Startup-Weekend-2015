(function() {
  var punchlist = angular.module('punchList');

  var Project = function($scope, $stateParams, $modal, $state) {
	    if (window.user) {
	      $scope.user = user;
	    }

	    $scope.idTip = 'Share this id with your client for them to join the project.';

	    if (!window.user) {
	    	$state.go('/home');
	    	return;
	    }

	    $scope.createPunch = function() {
	    	var instance = $modal.open({
	    		templateUrl: 'templates/CreatePunch.html',
	    		controller: 'Punch',
	    		resolve: {
	    			projectId: function() {
	    				return $stateParams.projectId;
	    			},
	    			punch: function() {
	    				return null;
	    			}
	    		}
	    	});

	    	instance.result.then(function() {}, function() {
	    		loadPunches();
	    	});
	    };

	    $scope.editPunch = function(punch) {
	    	var instance = $modal.open({
	    		templateUrl: 'templates/EditPunch.html',
	    		controller: 'Punch',
	    		resolve: {
	    			projectId: function() {
	    				return $stateParams.projectId;
	    			},
	    			punch: function() {
	    				return punch;
	    			}
	    		}
	    	});

	    	instance.result.then(function() {}, function() {
	    		loadPunches();
	    	});
	    };

	    $scope.showPunch = function(punch) {
	    	var instance = $modal.open({
	    		templateUrl: 'templates/ShowPunch.html',
	    		controller: 'Punch',
	    		resolve: {
	    			projectId: function() {
	    				return $stateParams.projectId;
	    			},
	    			punch: function() {
	    				return punch;
	    			}
	    		}
	    	});
	    };

	    dpd.projects.get($stateParams.projectId)
	    	.then(function(project) {
	    		$scope.projectName = project.name;
	    		$scope.projectDescription = project.description;
	    		$scope.projectId = project.pid;
	    		$scope.$apply();
	    	});

	    function getImage(punch) {
	    	dpd.fileuploader.get({containerid: punch.id})
	    		.then(function(imgs) {
	    			var img = imgs && imgs[0];

	    			if (img) {
	    				punch.image = img.filename;
	    				$scope.$apply();
	    			}
	    		});
	    };

	    function loadPunches() {
	    	dpd.punches.get({projectID: $stateParams.projectId})
		    	.then(function(projects) {
		    		var punches = [], wishlist = [];

		    		(projects || []).forEach(function(project) {
		    			if (project.isWishList) {
		    				wishlist.push(project);
		    			} else {
		    				punches.push(project);
		    			}

		    			getImage(project);
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
		}

		loadPunches();
	};

  	punchlist.controller('Project', Project);

}());
