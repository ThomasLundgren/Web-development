(function (window) {
  'use strict';
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const SLIDER_SELECTOR = '[data-coffee-order="slider"]';
  const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  const SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const FormHandler = App.FormHandler;
  const SlideHandler = App.SlideHandler;
  const CheckList = App.CheckList;
  const Validation = App.Validation;
  const RemoteDataStore = App.RemoteDataStore;

  var slideHandler = new SlideHandler(SLIDER_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var formHandler = new FormHandler(FORM_SELECTOR);
  /*
    OBS! Omöjligt att injicera DataStore istället för RemoteDataStore i myTruck
    på grund av funktionsanropet till remoteDS i Formhandler.addInputHandler
  */
  var myTruck = new Truck('Nebuchadnezzar', remoteDS);
  window.myTruck = myTruck;

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  formHandler.addSubmitHandler(function (data) {
      return myTruck.createOrder.call(myTruck, data)
        .then(function () {
            checkList.addRow.call(checkList, data);
        });
  });
  slideHandler.addSlideHandler();
  formHandler.addInputHandler(Validation.isCompanyEmail, Validation.isDecaf, remoteDS);
  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
