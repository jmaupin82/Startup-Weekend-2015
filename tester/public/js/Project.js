(function () {
  var punchlist = angular.module('punchList');

  var Project = function($scope, $stateParams) {
    $scope.projectId = $stateParams.projectId;
  };

  punchlist.controller('Project', Project);

}());