(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($scope, $http, $modal) {

    if (user) {
      $scope.user = user;
    }

  };

  punchlist.controller('Projects', Projects);

}());