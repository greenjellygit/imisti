angular.module("emistiApp").controller("NewsController", ["$scope", "NewsService", function($scope, NewsService) {
  $scope.newsList = [];

  NewsService.getNews().then(function(data) {
    $scope.newsList = data;
  });
}]);
