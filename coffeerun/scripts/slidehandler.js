(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function SlideHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided!');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    SlideHandler.prototype.addSlideHandler = function () {
        this.$formElement.on('change', function (event) {
            event.preventDefault();
            let value = this.value;
            let scaledValue = 0;
            let r = '';
            let g = '';
            if (value > 50) {
                scaledValue = (value - 50) * (255/50);
                r = '255';
                g = 255 - scaledValue.toString();
            } else {
                scaledValue = value * (255/50)
                g = '255';
                r = scaledValue.toString();
            }
            $('#rangeLabel').css('color', 'rgb(' + r + ', ' + g + ', 0)');
            console.log(this.value);
        });
    };

    App.SlideHandler = SlideHandler;
    window.App = App;

})(window);
