(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($rootscope, $scope, $http, $modal) {
  	//get all projects for the signed in user
  	if($scope.user){
  		console.log("there is a user", user);
  		//get the list of projects
  	}

	$scope.addProject = function() {
	  $modal.open({
	        templateUrl: 'templates/addProject.html',
	        controller: 'RegisterUser'
	      });
	  }

	  $scope.doAddProject = function() {
	  	debugger;
	  	if($scope.isClient && $scope.addproject.pid) {
	  		//only if the user is a client and the pid was entered
	  		//lookup the project with the given pid


	  	}
	  	else if ($scope.isContractor && $scope.user) {
	  		//create a new project based on the form informations
	  		var proj = {
		  		name: $scope.addproject.name,
		  		pid: math.random(200), //TODO make this non coliding
		  		description: $scope.addproject.description,
		  		contractorUserid : $scope.user.id
		  	};
		  	dpd.projects.post(proj, function(success, error){
		  		if(success){
		  			console.log("success!", success);
		  		}
		  		else {
		  			console.log("error :(", error);
		  		}
		  	});
	  	}
	  }
  	
  };

  punchlist.controller('Projects', Projects);

  

}());