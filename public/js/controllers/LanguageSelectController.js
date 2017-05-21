angular.module("emistiApp").controller("LanguageSelectController", ["$rootScope", "$scope", "$window", "$translateLocalStorage", "LocaleService",
  function($rootScope, $scope, $window, $translateLocalStorage, LocaleService) {
    $scope.localeList = LocaleService.getLocaleList();
    $scope.isLanguageSelectVisible = !$window.localStorage.getItem("IS_LANGUAGE_SET");

    $scope.setLocale = function(index) {
      $window.localStorage.setItem("IS_LANGUAGE_SET", true);
      LocaleService.setLocale(index);
      $scope.isLanguageSelectVisible = false;
      $rootScope.$broadcast('event-language-changed');
    };
  }
]);
