(function (window) {
  'use strict';
  var App = window.App || {};
  var Promise = window.Promise;
  /*
    Silver challenge: Making data private
    Att deklarera variabeln data på detta vis innebär
    att alla instanser av App.DataStore använder samma
    data-instans.
  */
  var data = {};

  function DataStore() {}

  function promisedResolvedWith(value) {
      var promise = new Promise(function(resolve, reject) {
          resolve(value);
      });
      return promise;
  }

  DataStore.prototype.add = function(key, val) {
    return promisedResolvedWith(null);
  };

  DataStore.prototype.get = function(key) {
    return promisedResolvedWith(data[key]);
  };

  DataStore.prototype.getAll = function() {
    return promisedResolvedWith(data);
  };

  DataStore.prototype.remove = function(key) {
    delete data[key];
    return promisedResolvedWith(null);
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
