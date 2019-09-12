
(function (window) {
  'use strict';
  var App = window.App || {};
  /*
    Silver challenge: Making data private
    Att deklarera variabeln data på detta vis innebär
    att alla instanser av App.DataStore använder samma
    data-instans.
  */
  var data = {};

  function DataStore() {}

  DataStore.prototype.add = function (key, val) {
    data[key] = val
  };

  DataStore.prototype.get = function (key) {
    return data[key];
  }

  DataStore.prototype.getAll = function () {
    return data;
  }

  DataStore.prototype.remove = function (key) {
    delete data[key];
  }

  App.DataStore = DataStore;
  window.App = App;
})(window)
