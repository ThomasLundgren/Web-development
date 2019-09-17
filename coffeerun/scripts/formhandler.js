(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided!');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        $('#resetButton').on('click', function (event) {
            $('#rangeLabel').css('color', 'rgb(255, 255, 0)');
        });
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            var data = {};

            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is: ' + item.value);
            });
            console.log(data);

            var achievementList = $('#achievement-list');

            if (data.size === 'coffee-zilla' && data.flavor != ''
                    && data.strength === '100' && data.achievement === ''
                    && achievementList.css('display') != 'block') {
                var modal = $('#achievement-modal');
                modal.show();
                $('#deny-button').on('click', function (event) {
                    modal.hide();
                    fn(data);
                    this.reset();
                });
                $('#confirm-button').on('click', function (event) {
                    achievementList.css('display', 'block');
                    modal.hide();
                });
            } else {
                fn(data);
                this.reset();
            }
            achievementList.hide();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
