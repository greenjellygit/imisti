angular.module("emistiApp").controller("NewsController", ["$scope", "$timeout", "NewsService", function($scope, $timeout, NewsService) {
  $scope.newsList = [];
  $scope.isLastPage = false;
  $scope.isNewsLoaded = false;

  NewsService.resetPage();

  $scope.loadNewsPage = function() {
    NewsService.loadNewsPage().then(function(data) {
      $scope.isLastPage = data.isLastPage;
      $scope.newsList = $scope.newsList.concat(data.newsPage);
      $timeout(function() {
        $scope.isNewsLoaded = true;
      }, 500);
    });
  };
  $scope.loadNewsPage();
}]);
