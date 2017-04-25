angular.module("emistiApp").controller("NewsController", ["$scope", "NewsService", function($scope, NewsService) {
  $scope.newsList = [];
  $scope.isLastPage = false;

  NewsService.resetPage();

  $scope.loadNewsPage = function() {
    NewsService.loadNewsPage().then(function(data) {
      $scope.isLastPage = data.isLastPage;
      $scope.newsList = $scope.newsList.concat(data.newsPage);
    });
  };
  $scope.loadNewsPage();
}]);
