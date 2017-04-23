angular.module("emistiApp").controller("NavbarController", ["$scope", "$state", function($scope, $state) {
  $scope.isLogoVisible = function() {
    return $state.current && $state.current.name != "home" && $state.current.name != "";
  };
}]);
