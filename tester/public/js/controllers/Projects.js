(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($scope, $http, $modal, $state) {
  	//get all projects for the signed in user
  	$scope.projects = new Array();
  	$scope.addproject = {};
	$scope.linkproject = {};

  	console.log(window.user);
    if (window.user) {
      $scope.user = window.user;
      //set some scope variables if the user is a contractor or client
      if($scope.user.role == 'contractor') {
      	$scope.isContractor = true;
      }
      else {
      	$scope.isClient = true;
      }
      //build the list of projects
      getProjectsForUser($scope.user);
    }

  	$scope.doAddProject = function() {
	  	
	  	if($scope.isClient && $scope.addproject.pid) {
	  		//only if the user is a client and the pid was entered
	  		//lookup the project with the given pid
	  		dpd.projects.get({pid: $scope.addproject.pid}, function(success, error){
	  			console.log(success);
	  			if(error) {
	  				console.log("there was an error in your request", error);
	  				return;
	  			}
	  			dpd.projects.put(success.id, {clientUserid: $scope.user.id}, function(success, error){
	  				if(error) {
	  					console.log("there was an error linking the client to the project", error);
	  				}
	  			})
	  		});

	  	}
	  	else if ($scope.isContractor && $scope.user) {
	  		//create a new project based on the form informations
	  		var proj = {
		  		name: $scope.addproject.name,
		  		pid: Math.random(200), //TODO make this non coliding
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
	 };
    function getProjectsForUser(user) {
    	if (user.role == 'contractor') {
    		dpd.projects.get({contractorUserid: user.id}, function(success, error){
    			if(error){
    				console.log("there was a problem loading the projects.");
    			}
    			$scope.projects = success;
    			$scope.$apply();

    		});
    	}
    	else if (user.role == 'client') {
    		dpd.projects.get({clientUserid: user.id}, function(success, error){
    			if(error){
    				console.log("there was a problem loading the projects.");
    			}
    			$scope.projects = success;
    			$scope.$apply();
    		});
    	}
    }
  	

	$scope.addProject = function() {
	  $modal.open({
	        templateUrl: 'templates/addProject.html',
	        controller: 'RegisterUser', 
	        scope: $scope
	   });
	};
	$scope.gotoProject = function(project) {
	  	console.log(project);
	  	window.location.href = window.location.href + '/' + project.id;
	  	//$state.go('^.' + project.id); why doesn't this work?

	 };
	
	 $scope.doLinkProject = function() {
	 	console.log($scope.linkproject.pid);
	 	debugger;
  		//only if the user is a client and the pid was entered
  		//lookup the project with the given pid
  		dpd.projects.get({pid: $scope.linkproject.pid}, function(success, error){
  			debugger;
  			console.log(success);
  			if(error) {
  				console.log("there was an error in your request", error);
  				return;
  			}
  			dpd.projects.put(success.id, {clientUserid: $scope.user.id}, function(success, error){
  				if(error) {
  					console.log("there was an error linking the client to the project", error);
  				}
  			})
  		});
  	};
  };

  punchlist.controller('Projects', Projects);

  

}());