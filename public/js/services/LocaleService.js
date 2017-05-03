angular.module('emistiApp').service('LocaleService', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
  'use strict';

  var localeList = LOCALES.list;
  var currentLocale = $translate.proposedLanguage(); // because of async loading

  var checkLocaleIsValid = function(locale) {
    return localeList.some(function(e) {
      return e.name == locale;
    });
  };

  var setLocale = function(locale) {
    if (!checkLocaleIsValid(locale)) {
      console.error('Locale name "' + locale + '" is invalid');
      return;
    }
    currentLocale = locale;
    // asking angular-translate to load and apply proper translations
    $translate.use(locale);
  };

  // on successful applying translations by angular-translate
  $rootScope.$on('$translateChangeSuccess', function(event, data) {
    document.documentElement.setAttribute('lang', data.language); // sets "lang" attribute to html
    // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
    tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
  });

  return {
    getLocaleList: function() {
      return localeList;
    },
    getCurrentLocale: function() {
      return currentLocale;
    },
    setLocale: function(idx) {
      setLocale(localeList[idx].name);
    }
  };
});
