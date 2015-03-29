(function() {
	var punchlist = angular.module('punchList');

	var RegisterUser = function($scope, $http, $modalInstance, $state, $rootScope) {

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
        window.user = result;
        $rootScope.$broadcast("wehaveuser");
        $modalInstance.dismiss('cancel');
        $state.go('/projects');
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
