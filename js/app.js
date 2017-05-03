angular.module("emistiApp", ["ui.router", "ngAnimate", "ngCookies", "pascalprecht.translate", "tmh.dynamicLocale"]);

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
          templateUrl: "js/templates/news.html",
          controller: "NewsController"
        })
        .state("offer", {
          url: "/offer",
          templateUrl: "js/templates/offer.html"
        })
        .state("contact", {
          url: "/contact",
          templateUrl: "js/templates/contact.html",
          controller: "ContactController"
        });
    }
  ])
  .constant('LOCALES', {
    'list': [{
        name: 'en_US',
        displayName: 'English'
      },
      {
        name: 'pl_PL',
        displayName: 'Polski'
      },
    ]
  })
  .config(function($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
  })
  .config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-', // path to translations files
      suffix: '.json' // suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('pl_PL'); // is applied on first load
    $translateProvider.useLocalStorage(); // saves selected language to localStorage
  })
  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  });
