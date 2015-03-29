(function() {
	var punchlist = angular.module('punchList');

	var SignIn = function($scope, $http, $modalInstance, $state, $rootScope) {

    $scope.login = {};

		$scope.doLogin = function() {
			$http.post('/users/login', {
				username: $scope.login.name,
				password: $scope.login.password
			}).success(function(result) {
				dpd.users.me(function(result, error) {
					if (error) console.log(error);
					window.user = result; // put user on the window
					console.log(this.user);
          $rootScope.$broadcast("wehaveuser");
					$state.go('/projects');
					$modalInstance.dismiss('cancel');
				});
			}).error(function(result) {
				// error
			});
		};

		$scope.cancel = function() {
		    $modalInstance.dismiss('cancel');
		};
	};

	punchlist.controller('SignIn', SignIn);

}());
