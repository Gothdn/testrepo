var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  var refresh = function() {
    $http.get('/contactList').success(function(res) {
      $scope.contactList = res;
      $scope.contact = "";
    });
  };

  refresh();

  $scope.addContact = function() {
    $http.post('/contactList', $scope.contact);
    refresh();
  };

  $scope.remove = function(id) {
    console.log("remove " + id);
    $http.delete('/contactList/' + id);
    refresh();
  };

  $scope.edit = function(id) {
    console.log("edit " + id);
    $http.get('/contactList/' + id).success(function(res){
      $scope.contact = res;
    });
  };

  $scope.update = function() {
    $http.put('/contactList/' + $scope.contact.id, $scope.contact).success(function(res) {
      refresh();
    });
  };
}]);