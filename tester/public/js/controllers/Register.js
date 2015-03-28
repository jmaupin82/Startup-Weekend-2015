(function() {
	var punchlist = angular.module('punchList');

	var RegisterUser = function($scope, $http, $modalInstance) {

    $scope.userregister = {
      role: 'client'
    };

    $scope.doRegister = function() {
      $http.post('/users', {
        username: $scope.userregister.username,
        password: $scope.userregister.password,
        email: $scope.userregister.email,
        webpage: $scope.userregister.webpage,
        role: $scope.userregister.role
      }).success(function(result) {
        dpd.users.me(function(result, error) {
          if (error) console.log(error);
          this.user = result; // put user on the window
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

	punchlist.controller('RegisterUser', RegisterUser);

}());
