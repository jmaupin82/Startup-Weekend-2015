(function () {
  var punchlist = angular.module('punchList');

  var Homepage = function($scope, $http, $state) {
    $scope.oneAtATime = true;

    $scope.user = {};

    $scope.doLogin = function(){

      $http.post('/users/login',{
        username: $scope.user.name,
        password: $scope.user.password
      }).success(function(result){
        dpd.users.me(function(result, error) {
          if(error) console.log(error);
          this.user = result; // put user on the window
          console.log(this.user);
          //$scope.user = result;
        });
      }).error(function(result){
        // error
      })
    };

    $scope.groups = [
      {
        title: "Dynamic Group Header - 1",
        content: "Dynamic Group Body - 1"
      },
      {
        title: "Dynamic Group Header - 2",
        content: "Dynamic Group Body - 2"
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.goProjects = function() {
      //window.location.href = window.location.href + '/projects';
      $state.go('/projects'); 
    }
  };

  punchlist.controller('Homepage', Homepage);

}());
