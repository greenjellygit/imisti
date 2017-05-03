angular.module("emistiApp").controller("NavbarController", ["$scope", "$state", "LocaleService",
  function($scope, $state, LocaleService) {
    $scope.isLogoVisible = function() {
      return $state.current && $state.current.name != "home" && $state.current.name != "";
    };

    $scope.localeList = LocaleService.getLocaleList();
    $scope.currentLocaleName = LocaleService.getCurrentLocale();
    
    $scope.setLocale = function(index) {
      LocaleService.setLocale(index);
      $scope.currentLocaleName = LocaleService.getCurrentLocale();
    };
  }
]);
