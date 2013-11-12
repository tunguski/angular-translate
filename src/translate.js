/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
angular.module('pascalprecht.translate', ['ng'])

.run(['$translate', function ($translate) {

  var key = $translate.storageKey(),
      storage = $translate.storage();

  if (storage) {
    storage.get(key).then(function (langKey) {
      $translate.uses(langKey);
    }, function () {
      if (angular.isString($translate.preferredLanguage())) {
        $translate.uses($translate.preferredLanguage());
      } else {
        storage.set(key, $translate.uses());
      }
    });

  } else if (angular.isString($translate.preferredLanguage())) {
    $translate.uses($translate.preferredLanguage());
  }
}]);
