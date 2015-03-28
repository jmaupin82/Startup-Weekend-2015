(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($scope, $http, $modal) {
  	//get all projects for the signed in user
  	if(user){
  		console.log("there is a user", user);
  		//dpd.projects.get({})
  	}

  	
  };

  punchlist.controller('Projects', Projects);

}());