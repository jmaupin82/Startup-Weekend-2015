(function() {
	var punchlist = angular.module('punchList');

	var Header = function($scope, $http, $modal) {
		$scope.noUser = true;

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
