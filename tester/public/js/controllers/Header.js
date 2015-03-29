(function() {
	var punchlist = angular.module('punchList');

	var Header = function($scope, $http, $modal, $state) {
		$scope.noUser = true;

    $scope.$on('wehaveuser', function() {
      if (user) {
        $scope.noUser = false;
        $scope.user = user;
        //$scope.username = user.username;
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

    $scope.signOut = function() {
      $http.post('/users/logout').success(function(result) {
        $scope.noUser = true;
        $scope.user = null;
        window.user = null;
        $state.go('/home');
        // log out stuff
      }).error(function(result) {
        //error
      });
    };

	};

	punchlist.controller('Header', Header);
}());
