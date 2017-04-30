angular.module("emistiApp").service("ContactService", ["$http", function($http) {
  return {
    sendEmail: function(data) {
      return $http.post("/sendEmail", data).then(function(response) {
        return response;
      }, function() {});
    }
  }
}]);
