angular.module("emistiApp").controller("NavbarController", ["$rootScope", "$scope", function($rootScope, $scope) {
  $scope.isLogoVisible = false;

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.name != "home") {
        $scope.isLogoVisible = true;
      }
    });
}]);
