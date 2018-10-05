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
    var allInputBlock = el.querySelectorAll('input');
    for (var k = 0; k < allInputBlock.length; k++) {
      allInputBlock[k].disabled = bool;
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

  var MESSAGE_ERRORS = {
    contactDataName: {
      tooShort: 'Имя должно состоять минимум из 2-х символов',
      tooLong: 'Имя не должно превышать 25-ти символов',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    contactDataTel: {
      tooShort: 'Номер телефона должен состоять из 11 цифр',
      tooLong: 'Номер телефона должен состоять из 11 цифр',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    paymentCardNumber: {
      tooShort: 'Номер банковской карты должен состоять из 16 цифр',
      tooLong: 'Номер банковской карты должен состоять из 16 цифр',
      patternMismatch: 'Номер банковской карты не должен содержать буквы и знаки препинания',
      customError: 'Данные карты не прошли проверку подлинности',
      valueMissing: 'Обязательное поле'
    },
    paymentCardDate: {
      tooShort: 'Формат даты должен состоять из 5 символов',
      tooLong: 'Формат даты должен состоять из 5 символов',
      patternMismatch: 'Формат даты должен быть мм/ГГ и состоять только из цифр',
      valueMissing: 'Обязательное поле'
    },
    paymentСardСvc: {
      tooShort: 'Номер CVC должен состоять из трёх цифр',
      tooLong: 'Номер CVC должен состоять из трёх цифр',
      patternMismatch: 'Поле CVC содержит только цифры (100-999)',
      valueMissing: 'Обязательное поле'
    },
    paymentCardholder: {
      tooShort: 'Имя держателя карты должно состоять минимум из 4-х символов',
      tooLong: 'Имя держателя карты не должно превышать 50-ти символов',
      patternMismatch: 'Имя держателя карты должно быть написано латиницей',
      valueMissing: 'Обязательное поле'
    },
    deliverStreet: {
      tooShort: '',
      tooLong: 'Название улицы не должно превышать 50-ти символов',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    deliverHouse: {
      tooShort: '',
      tooLong: '',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    },
    deliverFloor: {
      tooShort: '',
      tooLong: 'Этаж не должен превышать 3-х символов',
      patternMismatch: 'Поле Этаж содержит только цифры',
      valueMissing: ''
    },
    deliverRoom: {
      tooShort: '',
      tooLong: '',
      patternMismatch: '',
      valueMissing: 'Обязательное поле'
    }
  };

  function getCustomErrors(el, obj) {
    if (el.validity.tooShort) {
      el.setCustomValidity(obj.tooShort);
    } else if (el.validity.tooLong) {
      el.setCustomValidity(obj.toLong);
    } else if (el.validity.patternMismatch) {
      el.setCustomValidity(obj.patternMismatch);
    } else if (el.validity.valueMissing) {
      el.setCustomValidity(obj.valueMissing);
    } else if (el === paymentCardNumber && !checkLuhn(paymentCardNumber.value)) {
      el.setCustomValidity(obj.customError);
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
      getCustomErrors(contactDataName, MESSAGE_ERRORS['contactDataName']);
    } else if (contactDataTel === target) {
      getCustomErrors(contactDataTel, MESSAGE_ERRORS['contactDataTel']);
    } else if (paymentCardNumber === target) {
      getCustomErrors(paymentCardNumber, MESSAGE_ERRORS['paymentCardNumber']);
    } else if (paymentCardDate === target) {
      getCustomErrors(paymentCardDate, MESSAGE_ERRORS['paymentCardDate']);
    } else if (paymentСardСvc === target) {
      getCustomErrors(paymentСardСvc, MESSAGE_ERRORS['paymentСardСvc']);
    } else if (paymentCardholder === target) {
      getCustomErrors(paymentCardholder, MESSAGE_ERRORS['paymentCardholder']);
    } else if (deliverStreet === target) {
      getCustomErrors(deliverStreet, MESSAGE_ERRORS['deliverStreet']);
    } else if (deliverHouse === target) {
      getCustomErrors(deliverHouse, MESSAGE_ERRORS['deliverHouse']);
    } else if (deliverFloor === target) {
      getCustomErrors(deliverFloor, MESSAGE_ERRORS['deliverFloor']);
    } else if (deliverRoom === target) {
      getCustomErrors(deliverRoom, MESSAGE_ERRORS['deliverRoom']);
    }
  }, true);

  function inputKeyupHandler(evt) {
    if (evt.keyCode !== 8) {
      if (paymentCardDate.value.length === 2) {
        paymentCardDate.value += '/';
      }
    }
  }

  paymentCardDate.addEventListener('keyup', inputKeyupHandler);

  form.addEventListener('change', dataValiditySubmitHandler);

  var paymentCardStatus = document.querySelector('.payment__card-status');

  function dataValiditySubmitHandler() {
    if (paymentCardNumber.validity.valid &&
        checkLuhn(paymentCardNumber.value) &&
        paymentCardDate.validity.valid &&
        paymentСardСvc.validity.valid &&
        paymentCardholder.validity.valid) {
      paymentCardStatus.textContent = 'Одобрен';
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
    evt.preventDefault();
  });
})();
