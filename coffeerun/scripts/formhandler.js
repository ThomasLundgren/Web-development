(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var superUsers = new Set();
    const VALID_DOMAIN = 'Valid domain';

    function FormHandler(selector) {
        this.validEmail = false;
        if (!selector) {
            throw new Error('No selector provided!');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
        $('#resetButton').on('click', function(event) {
            $('#rangeLabel').css('color', 'rgb(255, 255, 0)');
        });
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};

            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
            });
            console.log(data);

            if (data.achievement != '') {
                superUsers.delete(data.emailAddress);
            }

            var $achievementList = $('#achievement-list');
            if (data.size === 'coffee-zilla' && data.flavor != '' &&
                data.strength === '100' && data.emailAddress != '') {

                var $modal = $('#achievement-modal');
                $modal.show();
                $('#deny-button').on('click', function(event) {
                    $modal.hide();
                });
                $('#confirm-button').on('click', function(event) {
                    superUsers.add(data.emailAddress);
                    let $emailField = $('#emailInput');
                    $('#emailInput').on('input', function() {
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
            fn(data).
            then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
            $('#rangeLabel').css('color', 'rgb(255, 255, 0)');
            $achievementList.hide();
            $('#emailInput').trigger('input');
        });
    };

    FormHandler.prototype.addInputHandler = function(fn, fn2, dataStore) {
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity(VALID_DOMAIN);
            } else {
                message = emailAddress + ' is not an authorized email address';
                event.target.setCustomValidity(message);
            }
        });
        var elements = [];
        var order = $('#coffeeOrder');
        var strengthRange = $('#strengthLevel');
        var description = order.val();
        var strength = strengthRange.val();

        $('#coffeeOrder, #strengthLevel').on('input', function(event) {
            description = order.val();
            strength = strengthRange.val();
            console.log('strength: ' + strength + '\ndesc: ' + description);
            console.log(fn2(description, strength));
            if (fn2(description, strength)) {
                order[0].setCustomValidity('');
                console.log('valid');
            } else {
                console.log('invalid');
                order[0].setCustomValidity('Cannot be decaf when strength level is ' + strength);
            }
        });
        this.$formElement.on('blur', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            console.log('Validity: ' + event.target.validationMessage);
            if (event.target.validationMessage === VALID_DOMAIN) {
                var checkResponse = function(serverResponse) {
                    console.log(serverResponse);
                    if (!serverResponse) {
                        event.target.setCustomValidity('');
                        console.log('Order was 100% valid');
                    } else {
                        message = emailAddress + ' has already ordered!';
                        event.target.setCustomValidity(message);
                        event.target.reportValidity();
                    }
                }
                var response = dataStore.get(emailAddress, checkResponse);
            }
        });

    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
