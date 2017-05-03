angular.module("emistiApp").service("NewsService", ["$http", function($http) {
  var page = {
    offset: 0,
    limit: 4
  };

  return {
    resetPage: function() {
      page.offset = 0;
    },
    loadNewsPage: function(offset, limit) {
      return $http.get("/loadNewsPage/" + page.offset + "/" + page.limit).then(function(response) {
        page.offset += page.limit;
        return response.data;
      }, function() {});
    }
  }
}]);
