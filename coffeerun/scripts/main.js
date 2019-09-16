(function (window) {
  'use strict';
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const SLIDER_SELECTOR = '[data-coffee-order="slider"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var SlideHandler = App.SlideHandler;

  var myTruck = new Truck('Nebuchadnezzar', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var slideHandler = new SlideHandler(SLIDER_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  slideHandler.addSlideHandler();

})(window);
