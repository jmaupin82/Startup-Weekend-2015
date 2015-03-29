(function() {
  var punchlist = angular.module('punchList');

  var Punch = function($scope, $http, $modalInstance, $state, projectId, punch) {
    debugger;
    $scope.punch = punch || {};

    $scope.isClient = user.role === 'client';

    $scope.newComment = {};
    $scope.currentfiles = [];

    function getComments() {
      if($scope.punch.hasOwnProperty('id')){
        dpd.comments.get({containerID: punch.id})
          .then(function(comments) {
            $scope.comments = comments;
            $scope.$apply();
          });
      }
    }



    $scope.uploadFiles = function(containerid) {

      var fd = new FormData();

      // var comments = $('#comments').val();
      //var imgComments = $scope.imgComments;

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/fileuploader?subdir=images&containerid=' + containerid);
      xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
      for(var i=0, len=$scope.files.length; i<len; i++) {
        fd.append('files', $scope.files[i]);
      }
      xhr.onload = function() {
        var response = JSON.parse(this.responseText);

        response.forEach(function(postedimage){
          $scope.currentfiles.push(postedimage);
        });
        $scope.$apply();
      };

      xhr.onerror = function(err) {
        // error
        console.log(err);
      };

      xhr.send(fd);

    };

    $scope.setFiles = function(element) {
      $scope.files = element;
    };

    if($scope.punch.hasOwnProperty('id')){
      dpd.fileuploader.get({containerid: $scope.containerid},function(data) {
        $scope.currentfiles = data;
        $scope.$apply();
      });
    }













    getComments();

    $scope.create = function() {

      var containerid;





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

      dpd.punches.post(data)
        .then(function(punch) {
          $scope.uploadFiles(punch.id);
          $scope.$apply();
          $modalInstance.dismiss('cancel');
      });
      //$modalInstance.dismiss('cancel');
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
