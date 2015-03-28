(function() {
	var punchlist = angular.module('punchList');

	var SignIn = function($scope, $http, $modalInstance) {

    $scope.user = {};

		$scope.doLogin = function() {
			$http.post('/users/login', {
				username: $scope.user.name,
				password: $scope.user.password
			}).success(function(result) {
				dpd.users.me(function(result, error) {
					if (error) console.log(error);
					window.user = result; // put user on the window
					console.log(this.user);
					//$scope.user = result;
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
