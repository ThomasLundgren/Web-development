(function(window) {
    'use strict';
    const CARAMEL_COLOR = '255, 153, 51';
    const ALMOND_COLOR = '255, 255, 102';
    const MOCHA_COLOR = '255, 204, 153';
    var App = window.App || {};
    var Ds = App.DataStore;
    var $ = window.jQuery;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector ' + selector);
        }
    }

    CheckList.prototype.addRow = function(coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    CheckList.prototype.addClickHandler = function(fn) {
        const DELAY = 2000;
        var clicks = 0;
        var timer = null;
        this.$element.on('click', 'input', function(event) {
            clicks++;
            this.$element
                .find('[value="' + event.target.value + '"]')
                .closest('[data-coffee-order="checkbox"]')
                .css('background-color', 'rgb(240, 240, 240)');
            console.log(event.target);
            var email = event.target.value;
            if (clicks === 1) {
                timer = setTimeout(function() {
                    fn(email)
                        .then(function () {
                            this.removeRow(email);
                        }.bind(this));
                    clicks = 0;
                }.bind(this), DELAY);
            } else {
                clearTimeout(timer);
                clicks = 0;
                var order = Ds.prototype.get(event.target.value);
                console.log(order);
                $('#coffeeOrder').attr('value', order['coffee']);
                $('#emailInput').attr('value', order['emailAddress']);
                $('[value=' + order['size'] +']').attr('checked', true);
                $('[name=flavor]').val(order['flavor']);
                $('#strengthLevel').val(order['strength']);
                $('#strengthLevel').trigger('input');
            }
        }.bind(this));
        this.$element.on('dblclick', function(event) {
            event.preventDefault();
        });
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        var $label = $('<label></label>');
        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });
        var description = '[' + coffeeOrder.strength + 'x] ';
        description += coffeeOrder.size + ' ';
        var color = '';
        var flavor = coffeeOrder.flavor;
        if (flavor) {
            description += coffeeOrder.flavor + ' ';
            if (flavor === 'caramel') {
                color = CARAMEL_COLOR;
            } else if (flavor === 'almond') {
                color = ALMOND_COLOR;
            } else if (flavor === 'mocha') {
                color = MOCHA_COLOR;
            }
            $div.css('background-color', 'rgb(' + color + ')');
        }
        description += coffeeOrder.coffee + ', ';
        description += '(' + coffeeOrder.emailAddress + ') ';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);
        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
