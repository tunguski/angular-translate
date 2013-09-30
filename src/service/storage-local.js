angular.module('pascalprecht.translate')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateLocalStorage
 * @requires $window
 *
 * @description
 * Abstraction layer for localStorage. This service is used when telling angular-translate
 * to use localStorage as storage.
 *
 */
.factory('$translateLocalStorage', ['$window', '$q', '$translateCookieStorage', function ($window, $q, $translateCookieStorage) {

  // Setup adapter
  var localStorageAdapter = {
    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateLocalStorage#get
     * @methodOf pascalprecht.translate.$translateLocalStorage
     *
     * @description
     * Returns an item from localStorage by given name.
     *
     * @param {string} name Item name
     * @return {string} Value of item name
     */
    get: function (name) {
      var deferred = $q.defer();

      deferred.resolve($window.localStorage.getItem(name));
      console.log($window.localStorage.getItem(name));
      return deferred.promise;
    },
    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translateLocalStorage#set
     * @methodOf pascalprecht.translate.$translateLocalStorage
     *
     * @description
     * Sets an item in localStorage by given name.
     *
     * @param {string} name Item name
     * @param {string} value Item value
     */
    set: function (name, value) {
      var deferred = $q.defer();
      deferred.resolve($window.localStorage.setItem(name, value));
      return deferred.promise;
    }
  };

  var $translateLocalStorage = ('localStorage' in $window && $window.localStorage !== null) ?
  localStorageAdapter : $translateCookieStorage;

  return $translateLocalStorage;
}]);
