(function() {
  var punchlist = angular.module('punchList');

  var Punch = function($scope, $http, $modalInstance, $state, projectId) {

    $scope.punch = {};

    $scope.create = function() {
      var data = {
        title: $scope.punch.name,
        description: $scope.punch.description,
        creatorUserID: user.id,
        isWichList: user.role === 'client',
        creatorRole: user.role,
        date: (new Date($scope.punch.date)).getTime(),
        wishPriority: $scope.punch.priority,
        projectID: projectId
      };

      dpd.punches.post(data);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
  };

  punchlist.controller('Punch', Punch);

}());
