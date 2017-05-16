angular.module("emistiApp").controller("NavbarController", ["$scope", "$document", "$state", "LocaleService",
  function($scope, $document, $state, LocaleService) {
    $scope.isMenuOpened = false;
    $scope.isLogoVisible = function() {
      return $state.current && $state.current.name != "home" && $state.current.name != "";
    };

    $scope.localeList = LocaleService.getLocaleList();
    $scope.currentLocaleName = LocaleService.getCurrentLocale();

    $scope.setLocale = function(index) {
      LocaleService.setLocale(index);
      $scope.currentLocaleName = LocaleService.getCurrentLocale();
    };

    angular.element(document.querySelector('#navigation-outside-wrapper')).on('touchstart mousedown', function(evt) {
      if($scope.isMenuOpened) {
        $scope.$apply(function() {
            $scope.openMenu();
        });
      }
    });

    $scope.openMenu = function() {
      $scope.isMenuOpened = !$scope.isMenuOpened;
    };
  }
]);
