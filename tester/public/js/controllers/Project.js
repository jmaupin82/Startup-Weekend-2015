(function () {
  var punchlist = angular.module('punchList');

  var Project = function($scope, $stateParams) {
    if (user) {
      $scope.user = user;
    }
    $scope.projectId = $stateParams.projectId;
  };

  punchlist.controller('Project', Project);

}());