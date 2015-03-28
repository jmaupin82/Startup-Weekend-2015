(function() {
	var punchlist = angular.module('punchList');

	var Header = function($scope, $http, $modal) {
		$scope.noUser = true;
		$scope.isContractor = true;
		$scope.signIn = function() {
			$modal.open({
				templateUrl: 'templates/login.html',
				controller: 'SignIn'
			});
		};
		dpd.users.me(function(user, error){
			$scope.user = user;
			$scope.noUser = false;
			$scope.username = user.username;
			// dpd.projects.get({contractorUserid: user.id}, function(results, error){
			// 	console.log("results", results);
			// 	console.log("error message", error);
			// });
		});

    $scope.signUp = function() {
      $modal.open({
        templateUrl: 'templates/register.html',
        controller: 'RegisterUser'
      });
    };

	};

	punchlist.controller('Header', Header);
}());
