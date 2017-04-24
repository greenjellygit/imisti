angular.module("emistiApp").controller("NavbarController", ["$scope", "$state", "LocaleService",
  function($scope, $state, LocaleService) {
    $scope.isLogoVisible = function() {
      return $state.current && $state.current.name != "home" && $state.current.name != "";
    };

    $scope.localeList = LocaleService.getLocaleList();
    $scope.setLocale = LocaleService.setLocale;
  }
]);
