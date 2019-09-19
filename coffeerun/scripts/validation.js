(function (window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@hig\.se$/.test(email);
        },

        isDecaf: function (text, value) {
            return !(/decaf/i.test(text) && value > 20);
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
