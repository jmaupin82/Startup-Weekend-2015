(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($scope, $http, $modal) {

    $scope.projects = {};

    if (user) {
      $scope.user = user;
    }

  };

  punchlist.controller('Projects', Projects);

}());