(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var superUsers = new Set();

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
            });
            console.log(data);

            var $achievementList = $('#achievement-list');

            if (data.achievement != '') {
                superUsers.delete(data.emailAddress);
            }

            if (data.size === 'coffee-zilla' && data.flavor != ''
                    && data.strength === '100' && data.emailAddress != '') {

                var $modal = $('#achievement-modal');
                $modal.show();
                $('#deny-button').on('click', function (event) {
                    $modal.hide();
                });
                $('#confirm-button').on('click', function (event) {
                    superUsers.add(data.emailAddress);
                    let $emailField = $('#emailInput');
                    $('#emailInput').blur(function () {
                        if (!superUsers.has(this.value)) {
                            $achievementList.css('display', 'none');
                        } else {
                            $achievementList.css('display', 'block');
                        }
                    });
                    $emailField.attr('value', data.emailAddress);
                    $achievementList.css('display', 'block');
                    $modal.hide();
                });
            }
            fn(data);
            this.reset();
            $('#rangeLabel').css('color', 'rgb(255, 255, 0)');
            $achievementList.hide();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
