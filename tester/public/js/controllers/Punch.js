(function() {
  var punchlist = angular.module('punchList');

  var Punch = function($scope, $http, $modalInstance, $state, projectId, punch) {
    $scope.punch = punch || {};

    $scope.isClient = user.role === 'client';

    $scope.newComment = {};

    function getComments() {
      if($scope.punch.hasOwnProperty('id')){
        dpd.comments.get({containerID: punch.id})
          .then(function(comments) {
            $scope.comments = comments;
            $scope.$apply();
          });
      }
    }


    getComments();

    $scope.create = function() {
      var data = {
        title: $scope.punch.title,
        description: $scope.punch.description,
        creatorUserID: user.id,
        isWishList: user.role === 'client',
        creatorRole: user.role,
        date: (new Date($scope.punch.date)).getTime(),
        wishPriority: $scope.punch.wishPriority,
        projectID: projectId
      };

      dpd.punches.post(data);
      $modalInstance.dismiss('cancel');
    };

    $scope.edit = function() {
      var data = {
            title: $scope.punch.title,
            description: $scope.punch.description,
            isWishList: $scope.punch.date ? false : punch.isWishList,
            date: $scope.punch.date,
            wishPriority: $scope.punch.wishPriority,
            completed: $scope.punch.completed,
            confirmed: $scope.punch.confirmed
          };

      dpd.punches.put(punch.id, data);
      $modalInstance.dismiss('cancel');
    };

    $scope.addComment = function() {
      var data = {
          description: $scope.newComment.description,
          username: user.username,
          date: (new Date()).getTime(),
          containerID: punch.id
      };
      debugger;
      dpd.comments.post(data)
        .then(getComments);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  };

  punchlist.controller('Punch', Punch);

}());
