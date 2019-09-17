(function (window) {
  'use strict';
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const SLIDER_SELECTOR = '[data-coffee-order="slider"]';
  const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var SlideHandler = App.SlideHandler;
  var CheckList = App.CheckList;

  var myTruck = new Truck('Nebuchadnezzar', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var slideHandler = new SlideHandler(SLIDER_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);

  formHandler.addSubmitHandler(function (data) {
      myTruck.createOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
  });
  slideHandler.addSlideHandler();

})(window);
