(function() {
	var punchlist = angular.module('punchList');

	var Upload = function($scope, $http, $modalInstance, $state, $rootScope) {
    $scope.files = [];

    $scope.currentproject = $scope.$$prevSibling.project;
    $scope.currentfiles = [];

		$scope.cancel = function() {
	    $modalInstance.dismiss('cancel');
	  };

    //$('.alert-success').hide();

    $scope.uploadFiles = function() {

      var fd = new FormData();
      for (var i in $scope.files) {
        fd.append("uploadedFile", $scope.files[i])
      }

      var comments = $('#comments').val();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload?subdir=images&comments=' + comments + '&projectid=' + $scope.currentproject.id);
      xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        console.log(response);
        $('.alert-success').append("Upload successful!<br />");
        for (var index in response) {
          $scope.appendUploadedFileToTable(response[index]);
        }
      };
      xhr.onerror = function(err) {
        alert("Error: ", err);
      }
      xhr.send(fd);

    };


    //$scope.uploadFiles = function() {
    //
    //  var fd = new FormData();
    //  for (var i in $scope.files) {
    //    fd.append("uploadedFile", $scope.files[i])
    //  }
    //
    //  var comments = $('#comments').val();
    //  $http.post('/upload?&comments=' + comments + '&uniqueFilename=' + true)
    //    .success(function (data) {
    //      $('.alert-success').append("Upload successful!<br />");
    //      for (var index in data) {
    //        $scope.appendUploadedFileToTable(data[index]);
    //      }
    //    })
    //    .error(function (data, status) {
    //      alert("Error: ", data);
    //    });
    //
    //
    //};


    $scope.appendUploadedFileToTable = function(file) {
      $('#result tr:last').after(
        "<tr><td><a href='upload_/" + file.subdir + "/" + file.filename + "'>" + file.filename + "</a></td>" +
        "<td>" + file.subdir + "</td>" +
        "<td>" + file.comments + "</td>" +
        "<td>" + file.filesize + "</td>" +
        "<td>" + file.originalFilename + "</td>" +
        "<td>" + new Date(file.creationDate).toLocaleString() + "</td>" +
        "<td><button class='btn btn-default btn-sm' " +
        "ng-click='deleteFile(this, &quot;" + file.id + "&quot;)'>Delete</button></td></tr>");

    };

    $scope.setFiles = function(element) {
      console.log('files:', element);
      // Turn the FileList object into an Array
      $scope.files = [];
      for (var i = 0; i < element.length; i++) {
        $scope.files.push(element[i]);
      }
      console.log($scope.files)
    };

    dpd.upload.get(function(data, statusCode, headers, config) {
      $scope.currentfiles = data;
      $scope.$apply();
      //for(var index in data) {
      //  $scope.appendUploadedFileToTable(data[index]);
      //}
    });

    $scope.deleteFile = function(imgIndex) {
      var thisImg = $scope.currentfiles[imgIndex];
      dpd.upload.del(thisImg.id, function(data, status) {
        var asdf = "asdf";
        //$('.alert-success').show();
        //$('.alert-success').append("File removed!");
      })
    }


	};

	punchlist.controller('Upload', Upload);

}());
