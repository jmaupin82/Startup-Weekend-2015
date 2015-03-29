(function () {
  var punchlist = angular.module('punchList');

  var Projects = function($scope, $http, $modal) {

    $scope.project = {
      id: 44444455555,
      name: 'fakeprojectname'
    };

    if (user) {
      $scope.user = user;
    }

    $scope.doUpload = function() {
      $modal.open({
        templateUrl: 'templates/upload.html',
        controller: 'Upload'
      });
    };
  };

  punchlist.controller('Projects', Projects);

}());