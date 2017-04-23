angular.module("emistiApp", ["ui.router", "ngAnimate"]);

angular.module("emistiApp").config(['$stateProvider', "$urlRouterProvider", "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $locationProvider.hashPrefix('');

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "js/templates/main.html"
      })
      .state("news", {
        url: "/news",
        templateUrl: "js/templates/news.html"
      })
      .state("offert", {
        url: "/offert",
        templateUrl: "js/templates/offert.html"
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "js/templates/contact.html"
      });
  }
]);
