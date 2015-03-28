(function() {
	var punchlist = angular.module('punchList');

	var Header = function($scope, $http, $modal) {
		$scope.noUser = true;
		dpd.users.me(function(user) {
		    if (user) {
		        $scope.noUser = false;
		        window.user = user;
		        $scope.username = user.username;
		        $scope.$apply();
		        console.log(user);
	       }
	    });
		$scope.signIn = function() {
			$modal.open({
				templateUrl: 'templates/login.html',
				controller: 'SignIn'
			});
		};

    $scope.signUp = function() {
      $modal.open({
        templateUrl: 'templates/register.html',
        controller: 'RegisterUser'
      });
    };

	};

	punchlist.controller('Header', Header);
}());
