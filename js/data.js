'use strict';

(function () {
  var RATING_ARRAY = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--five'
  };
  var MIN = 0;
  var MAX = 245;
  var MIN_INDEX = 0;
  var MAX_INDEX = 1;
  var ELEMENT_WIDTH = 245;
  var CATALOG_LENGTH_GOODS = 26;
  var UNIT_GOODS = 1;

  var DELIVERY_MAP_NAMES = {
    'Академическая': 'academicheskaya',
    'Чернышевская': 'chernishevskaya',
    'Фрунзенская': 'frunzenskaya',
    'Петроградская': 'petrogradskaya',
    'Пролетарская': 'proletarskaya',
    'Проспект Просвещения': 'prosvesheniya',
    'Черная речка': 'rechka',
    'Технологический институт': 'tehinstitute',
    'Василеостровская': 'vasileostrovskaya',
    'Площадь Восстания': 'vostaniya'
  };

  var PATH_PICTURES = 'img/map/';
  var EXTENDS = '.jpg';

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

  window.data = {
    RATING_ARRAY: RATING_ARRAY,
    CATALOG_LENGTH_GOODS: CATALOG_LENGTH_GOODS,
    MIN: MIN,
    MAX: MAX,
    ELEMENT_WIDTH: ELEMENT_WIDTH,
    MIN_INDEX: MIN_INDEX,
    MAX_INDEX: MAX_INDEX,
    MESSAGE_ERRORS: MESSAGE_ERRORS,
    UNIT_GOODS: UNIT_GOODS,
    DELIVERY_MAP_NAMES: DELIVERY_MAP_NAMES,
    PATH_PICTURES: PATH_PICTURES,
    EXTENDS: EXTENDS
  };

})();
