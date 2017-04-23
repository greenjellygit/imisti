angular.module("emistiApp").service("NewsService", ["$http", function($http) {
  return {
    getNews: function() {
      return $http.get("/getNews", {}).then(function(response) {
        return response.data;
      }, function() {});
    }
  }
}]);
