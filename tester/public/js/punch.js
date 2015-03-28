// var entityApp = angular.module('oustartup', []);

// // http://beta.json-generator.com/

// entityApp.controller('homepage', function($scope, $http) {

//   $scope.punchText = "Some test controller text";
//   //$scope.entities = [];
//   //
//   //// Get all entities
//   //$http.get('/entities')
//   //  .success(function(entities) {
//   //    $scope.loaded = true;
//   //    $scope.entities = entities;
//   //  }).error(function(err) {
//   //    alert(err);
//   //  });
//   //
//   //dpd.entities.on('silver', function(message) {
//   //  console.log('silver was added');
//   //});
//   //
//   //dpd.entities.on('create', function(message) {
//   //  console.log('New entity was added: ' + message);
//   //});
//   //
//   //$scope.addEntity = function(name) {
//   //  $http.post('/entities', {
//   //    name: name,
//   //    attributes: {
//   //      isImportant: true,
//   //      friends: [12,443,3869, 23],
//   //      options: {
//   //        colors:{
//   //          blue: true,
//   //          yellow: false,
//   //          orange:false
//   //        }
//   //      }
//   //    }
//   //  }).success(function(entity) {
//   //    $scope.newEntityName = '';
//   //    $scope.entities.push(entity);
//   //  }).error(function(err) {
//   //    // Alert if there's an error
//   //    return alert(err.message || "an error occurred");
//   //  });
//   //};
//   //
//   //$scope.updateAttributes = function(entity) {
//   //  // Update the entity
//   //  $http.put('/entities/' + entity.id, {
//   //    name: "John Henry",
//   //    attributes: {
//   //      options: {
//   //        colors: {
//   //          blue: true,
//   //          yellow: true,
//   //          orange: true,
//   //          silver: true
//   //        }
//   //      }
//   //    }
//   //  })
//   //    .success(function(entity){
//   //      var index = $scope.entities.indexOf(
//   //        $scope.entities.filter(function(t) {
//   //          return t.id === entity.id;
//   //        })[0]);
//   //
//   //      if (index !== -1) {
//   //        $scope.entities.splice(index,1,entity);
//   //      }
//   //
//   //    })
//   //    .error(function(err) {
//   //    return alert(err.message || (err.errors && err.errors.completed) || "an error occurred");
//   //  });
//   //};
//   //
//   //
//   //$scope.doLogin = function(){
//   //  $http.post('/users/login',{
//   //    username: 'Mike',
//   //    password: 'password'
//   //  }).success(function(result){
//   //    $scope.loginResult = result;
//   //  }).error(function(result){
//   //    $scope.loginResult = result;
//   //  })
//   //};
//   //
//   //$scope.deleteEntity = function(e,entity) {
//   //  e.preventDefault();
//   //  $http.delete('/entities/' + entity.id)
//   //    .success(function() {
//   //    // Find the index of an object with a matching id
//   //    var index = $scope.entities.indexOf(
//   //        $scope.entities.filter(function(t) {
//   //          return t.id === entity.id;
//   //        })[0]);
//   //
//   //    if (index !== -1) {
//   //      $scope.entities.splice(index, 1);
//   //    }
//   //  }).error(function(err) {
//   //    alert(err.message || "an error occurred");
//   //  });
//   //};

// });