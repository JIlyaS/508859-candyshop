'use strict';

(function () {
  // 3. Переключение вкладок в форме оформления заказа
  var deliver = document.querySelector('.deliver');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverCourier = document.querySelector('.deliver__courier');

  disabledInput(deliverCourier, true);

  deliver.addEventListener('click', deliverClickHandler);

  function deliverClickHandler(evt) {
    var target = evt.target;
    var inputClass = target.closest('.toggle-btn__input');
    if (!inputClass) {
      return;
    }

    var deliverId = target.getAttribute('id');

    if (deliverId === 'deliver__store') {
      document.querySelector('.' + deliverId).classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
      disabledInput(deliverCourier, true);
    } else if (deliverId === 'deliver__courier') {
      document.querySelector('.' + deliverId).classList.remove('visually-hidden');
      deliverStore.classList.add('visually-hidden');
      disabledInput(deliverCourier, false);
    }
  }

  // Заблокирвовать input у скрытых полей формы
  function disabledInput(el, bool) {
    // Для полей input
    var blockAllInputs = el.querySelectorAll('input');
    for (var k = 0; k < blockAllInputs.length; k++) {
      blockAllInputs[k].disabled = bool;
    }

    var blockAllTextAreas = el.querySelectorAll('textarea');
    for (var l = 0; l < blockAllTextAreas.length; l++) {
      blockAllTextAreas[l].disabled = bool;
    }
  }

  // Проверка номера банковской карты по алгоритму Луна
  function checkLuhn(num) {
    if (num === null && typeof num === 'undefined' && num.trim() === '') {
      return false;
    }
    // Разделяет строку на отдельные символы
    var newArrNumber = num.split('').map(function (element, index) {
      // Преобразуем каждую строку в число
      var mapElement = parseInt(element, 10);
      // Производим операцию с каждым нечётным числом - начинается с 0, значит индексы 0,2,4... - нечётные
      if (index % 2 === 0) {
        mapElement = mapElement * 2 > 9 ? (mapElement * 2) - 9 : mapElement * 2;
      }

      return mapElement;
    });
    // Суммируем каждый элемент друг с другом
    var result = newArrNumber.reduce(function (previous, current) {
      return previous + current;
    });
    // Если результат больше 10 и кратен 10 то возвращаем истину
    return !!(result >= 10 && result % 10 === 0);
  }

  function getCustomErrors(el, obj) {
    if (el.validity.tooShort) {
      el.setCustomValidity(obj.tooShort);
    } else if (el.validity.tooLong) {
      el.setCustomValidity(obj.toLong);
    } else if (el.validity.patternMismatch) {
      el.setCustomValidity(obj.patternMismatch);
    } else if (el.validity.valueMissing) {
      el.setCustomValidity(obj.valueMissing);
    } else if (el === paymentCardNumber) {
      if (paymentCardNumber.disabled === false && !checkLuhn(paymentCardNumber.value)) {
        el.setCustomValidity(obj.customError);
      }
    } else {
      el.setCustomValidity('');
    }
  }

  // Обработчик событий на форме
  var form = document.querySelector('form:nth-child(2)');
  var contactDataName = form.querySelector('#contact-data__name');
  var contactDataTel = form.querySelector('#contact-data__tel');
  var paymentCardNumber = form.querySelector('#payment__card-number');
  var paymentCardDate = form.querySelector('#payment__card-date');
  var paymentСardСvc = form.querySelector('#payment__card-cvc');
  var paymentCardholder = form.querySelector('#payment__cardholder');
  var deliverStreet = form.querySelector('#deliver_street');
  var deliverHouse = form.querySelector('#deliver_house');
  var deliverFloor = form.querySelector('#deliver__floor');
  var deliverRoom = form.querySelector('#deliver__room');

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (contactDataName === target) {
      getCustomErrors(contactDataName, window.data.MESSAGE_ERRORS['contactDataName']);
    } else if (contactDataTel === target) {
      getCustomErrors(contactDataTel, window.data.MESSAGE_ERRORS['contactDataTel']);
    } else if (paymentCardNumber === target) {
      getCustomErrors(paymentCardNumber, window.data.MESSAGE_ERRORS['paymentCardNumber']);
    } else if (paymentCardDate === target) {
      getCustomErrors(paymentCardDate, window.data.MESSAGE_ERRORS['paymentCardDate']);
    } else if (paymentСardСvc === target) {
      getCustomErrors(paymentСardСvc, window.data.MESSAGE_ERRORS['paymentСardСvc']);
    } else if (paymentCardholder === target) {
      getCustomErrors(paymentCardholder, window.data.MESSAGE_ERRORS['paymentCardholder']);
    } else if (deliverStreet === target) {
      getCustomErrors(deliverStreet, window.data.MESSAGE_ERRORS['deliverStreet']);
    } else if (deliverHouse === target) {
      getCustomErrors(deliverHouse, window.data.MESSAGE_ERRORS['deliverHouse']);
    } else if (deliverFloor === target) {
      getCustomErrors(deliverFloor, window.data.MESSAGE_ERRORS['deliverFloor']);
    } else if (deliverRoom === target) {
      getCustomErrors(deliverRoom, window.data.MESSAGE_ERRORS['deliverRoom']);
    }
  }, true);

  function inputKeyupHandler(evt) {
    if (evt.keyCode !== 8) {
      if (paymentCardDate.value.length === 2) {
        paymentCardDate.value += '/';
      }
    }
  }

  var payment = form.querySelector('.payment__inner');
  var paymentCash = form.querySelector('#payment__cash');
  var paymentCard = form.querySelector('#payment__card');
  var paymentCardWrap = payment.querySelector('.payment__card-wrap');
  var paymentCashWrap = payment.querySelector('.payment__cash-wrap');
  paymentCash.addEventListener('click', selectPaymentCash);
  paymentCard.addEventListener('click', selectPaymentCard);

  function selectPaymentCash() {
    paymentCardWrap.classList.add('visually-hidden');
    paymentCashWrap.classList.remove('visually-hidden');
    disabledInput(paymentCardWrap, true);
  }

  function selectPaymentCard() {
    paymentCardWrap.classList.remove('visually-hidden');
    paymentCashWrap.classList.add('visually-hidden');
    disabledInput(paymentCardWrap, false);
  }

  paymentCardDate.addEventListener('keyup', inputKeyupHandler);

  form.addEventListener('change', dataValiditySubmitHandler);

  var paymentCardStatus = document.querySelector('.payment__card-status');

  function dataValiditySubmitHandler() {
    if (paymentCardNumber.disabled === false) {
      if (paymentCardNumber.validity.valid &&
          checkLuhn(paymentCardNumber.value) &&
          paymentCardDate.validity.valid &&
          paymentСardСvc.validity.valid &&
          paymentCardholder.validity.valid) {
        paymentCardStatus.textContent = 'Одобрен';
      }
    }
  }

  function successFormHandler() {
    var modalSuccess = document.querySelector('.modal--success');
    modalSuccess.classList.remove('modal--hidden');

    var modalСlose = modalSuccess.querySelector('.modal__close');
    modalСlose.addEventListener('click', function () {
      modalSuccess.classList.add('modal--hidden');
    });

    document.addEventListener('keydown', successModalKeydownHandler);

    function successModalKeydownHandler() {
      modalSuccess.classList.add('modal--hidden');
      document.removeEventListener('keydown', successModalKeydownHandler);
    }
  }

  var modalError = document.querySelector('.modal--error');

  function errorFormHandler(errorMessage) {
    modalError.classList.remove('modal--hidden');
    var modalMessage = modalError.querySelector('.modal__message');
    modalMessage.textContent = errorMessage;

    var modalСlose = modalError.querySelector('.modal__close');
    modalСlose.addEventListener('click', function () {
      modalError.classList.add('modal--hidden');
    });

    document.addEventListener('keydown', window.utils.modalKeydownHandler);
  }

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), successFormHandler, errorFormHandler);
    document.querySelectorAll('input').forEach(function (inputElement) {
      inputElement.value = inputElement.defaultValue;
    });

    window.catalog.mainHeaderBasket.textContent = 0;
    window.catalog.removeBasket();
    window.catalog.checkEmptyHeaderBasket();

    window.catalog.clearBasket();
    window.catalog.checkEmptyBasket();
    evt.preventDefault();
  });

  window.order = {
    disabledInput: disabledInput,
    paymentCash: paymentCash,
    paymentCashWrap: paymentCashWrap,
    paymentCard: paymentCard,
    paymentCardWrap: paymentCardWrap,
    deliverCourier: deliverCourier,
    deliverStore: deliverStore
  };
})();
