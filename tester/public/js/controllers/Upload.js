(function() {
	var punchlist = angular.module('punchList');

	var Upload = function($scope, $http, $modalInstance, $modal) {

    $scope.containerid = $scope.$$prevSibling.containerid;

		$scope.cancel = function() {
	    $modalInstance.dismiss('cancel');
	  };


    $scope.uploadFiles = function() {

      var fd = new FormData();

      var comments = $('#comments').val();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/fileuploader?subdir=images&comments=' + comments + '&containerid=' + $scope.containerid);
      xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
      for(var i=0, len=$scope.files.length; i<len; i++) {
        fd.append('files', $scope.files[i]);
      }
      xhr.onload = function() {
        var response = JSON.parse(this.responseText);

        response.forEach(function(postedimage){
          $scope.currentfiles.push(postedimage);
        });
        $('#uctrl').val('');
        $('#comments').val('');
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

    dpd.fileuploader.get({containerid: $scope.containerid},function(data) {
      $scope.currentfiles = data;
      $scope.$apply();
    });

    $scope.deleteFile = function(imgIndex) {
      var img = $scope.currentfiles[imgIndex];
      dpd.fileuploader.del(img.id, function(result, error) {
        $scope.currentfiles.splice(imgIndex,1);
        $scope.$apply();
      })
    }


	};

	punchlist.controller('Upload', Upload);

}());
