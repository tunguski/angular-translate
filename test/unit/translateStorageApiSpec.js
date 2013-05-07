describe('ngTranslate', function () {

  describe('registerStorageFactory()', function () {

    describe('cleanup', function () {

      beforeEach(module('ngTranslate', ['ngCookies']));

      beforeEach(inject(function ($cookieStore, $COOKIE_KEY) {
        $cookieStore.remove($COOKIE_KEY);
        expect($cookieStore.get($COOKIE_KEY)).toBeUndefined();
      }));
    });

    describe('called without factoryFn', function () {

      var exceptionMessage;

      beforeEach(module('ngTranslate', function ($translateProvider) {
        try {
          $translateProvider.registerStorageFactory(null);
        } catch (ex) {
          exceptionMessage = ex.message;
        }
      }));

      it('should be throw an error', inject(function ($translate) {
        expect(exceptionMessage).toEqual('Couldn\'t register storage factory without given storageFactoryFn!');
      }));
    });

    describe('called with invalid storageFactoryFn (string)', function () {

      var exceptionMessage;

      beforeEach(module('ngTranslate', 'ngCookies', function ($translateProvider) {
        try {
          $translateProvider.registerStorageFactory('cookie');
        } catch (ex) {
          exceptionMessage = ex.message;
        }
      }));

      it('should be throw an error', inject(function ($translate) {
        expect(exceptionMessage).toEqual('StorageFactory \'cookie\' is not supported!');
      }))
    });

    describe('called with valid storageFactoryFn (string, cookie)', function () {

      beforeEach(module(['ngTranslate', 'ngCookies'], function ($translateProvider) {
        $translateProvider.translations('en_US', {
          'TITLE': 'Hello world'
        });

        $translateProvider.translations('de_DE', {
          'TITLE': 'Hallo Welt'
        });

        $translateProvider.preferredLanguage('en_US');

        $translateProvider.registerStorageFactory('cookieStorage');
        $translateProvider.rememberLanguage(true);
      }));

      beforeEach(inject(function ($cookieStore, $COOKIE_KEY) {
        $cookieStore.remove($COOKIE_KEY);
        expect($cookieStore.get($COOKIE_KEY)).toBeUndefined();
      }));

      it('should get language key from cookie store', function () {
        inject(function ($translate, $cookieStore, $COOKIE_KEY) {
          expect($translate.preferredLanguage()).toEqual('en_US');
          expect($translate.uses()).toEqual('en_US');
          expect($translate('TITLE')).toEqual('Hello world');

          $translate.uses('de_DE');
          expect($translate.preferredLanguage()).toEqual('en_US');
          expect($translate.uses()).toEqual('de_DE');
          expect($cookieStore.get($COOKIE_KEY)).toEqual('de_DE');
          expect($translate('TITLE')).toEqual('Hallo Welt');
        });
      });
    });

    if ('localStorage' in window && window['localStorage'] !== null) {
      describe('called with valid storageFactoryFn (string, localStorage)', function () {

        beforeEach(module('ngTranslate', function ($translateProvider) {
          $translateProvider.translations('en_US', {
            'TITLE': 'Hello world'
          });

          $translateProvider.translations('de_DE', {
            'TITLE': 'Hallo Welt'
          });

          $translateProvider.preferredLanguage('en_US');

          $translateProvider.registerStorageFactory('localStorage');
          $translateProvider.rememberLanguage(true);
        }));

        beforeEach(inject(function ($COOKIE_KEY, $window) {
          $window.localStorage.removeItem($COOKIE_KEY);
          expect($window.localStorage.getItem($COOKIE_KEY)).toBe(null);
        }));

        it('should get language key from localStorage', function () {
          inject(function ($translate, $window, $COOKIE_KEY) {
            expect($translate.preferredLanguage()).toEqual('en_US');
            expect($translate.uses()).toEqual('en_US');
            expect($translate('TITLE')).toEqual('Hello world');

            $translate.uses('de_DE');

            expect($translate.preferredLanguage()).toEqual('en_US');
            expect($translate.uses()).toEqual('de_DE');
            expect($window.localStorage.getItem($COOKIE_KEY)).toEqual('de_DE');
            expect($translate('TITLE')).toEqual('Hallo Welt');
          });
        });
      });
    }
  });
});
