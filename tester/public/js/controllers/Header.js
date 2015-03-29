(function() {
	var punchlist = angular.module('punchList');

	var Header = function($scope, $http, $modal, $state) {
		$scope.noUser = true;

    $scope.$on('wehaveuser', function() {
      if ($scope.user) {
        $scope.noUser = false;
        window.user = user;
        $scope.user = user;
      }
    });

		$scope.signIn = function() {
			$modal.open({
				templateUrl: 'templates/login.html',
				controller: 'SignIn'
			});
		};
		dpd.users.me(function(user, error){
			$scope.user = user;
			window.user = user;
			$scope.noUser = false;
			$scope.username = user.username;
			$scope.$apply();
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
