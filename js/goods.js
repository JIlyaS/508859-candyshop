'use strict';

// Массив названия товаров
var NAME_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина',
  'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
// Массив ингридиентов
var CONTENTS_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
// Расширения файлов
var PICTURE_GOODS = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour',
  'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
// Рейтинг
var RATING_ARRAY = {
  1: 'stars__rating--one',
  2: 'stars__rating--two',
  3: 'stars__rating--three',
  4: 'stars__rating--four',
  5: 'stars__rating--five'
};

var MIN = 0;
var MAX = 245;
var ELEMENT_WIDTH = 240;

// Магические переменные
var catalogGoods = 26;

// Генерируем строку ингридиентов
function generateString() {
  var composition = '';

  for (var j = 0; j < Math.floor(Math.random() * CONTENTS_GOODS.length); j++) {
    composition += CONTENTS_GOODS[Math.floor(Math.random() * CONTENTS_GOODS.length)] + ', '; // Генерируем строку списка ингридиентов
  }

  return composition.slice(0, -2) + '.';
}

function randomMath(length, start) {
  start = typeof start !== 'undefined' ? start : 0;

  return Math.floor(Math.random() * length) + start;
}

// Генерируем рандомные объекты описания товара
function generateGoods(i) {
  return {
    name: NAME_GOODS[i], // Название товара
    picture: 'img/cards/' + PICTURE_GOODS[i] + '.jpg', // Адрес изображения товара
    amount: randomMath(20), // Количество
    price: randomMath(1400, 100), // Стоимость
    weight: randomMath(270, 30), // Вес
    rating: { // Рейтинг
      value: randomMath(5, 1), // Оценка
      number: randomMath(890, 10) // Количество оценок
    },
    nutritionFacts: { // Состав
      sugar: !!Math.round(Math.random()), // Содержание сахара
      energy: randomMath(430, 70), // Энергетическая ценность
      contents: generateString() // Состав
    }
  };
}

// Уберите у блока catalog__cards класс catalog__cards--load
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

// Добавлением класса visually-hidden блок catalog__load
var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

// Находим шаблон, который будем копировать
var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');

// Есть ли сахар
function isSugar(goodElement, good) {
// Характеристики сахара и состав
  var cardCharacteristic = goodElement.querySelector('.card__characteristic');

  cardCharacteristic.textContent = good.nutritionFacts.sugar === true ? 'Содержит сахар' : 'Без сахара';
}

function getAmountClass(good, goodElement) {
  // В зависимости от количества добавляем класс
  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount >= 1 && good.amount <= 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }
}

// Корзина
var basketCards = [];

var mainHeaderBasket = document.querySelector('.main-header__basket');

// Генерируем товар - создаем DOM-элементы и заполняем данными из массива
function renderGood(good) {
  var goodElement = goodElements.cloneNode(true); // Клонируем товар

  getAmountClass(good, goodElement);

  var cardTitle = goodElement.querySelector('.card__title');
  cardTitle.textContent = good.name; // Вставим название в блок
  var cardImg = goodElement.querySelector('.card__img');
  cardImg.src = good.picture;
  var cardPrice = goodElement.querySelector('.card__price');
  cardPrice.innerHTML = good.price + '&nbsp;<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

  // Добавляем класс рейтинга в зависимоти от значения
  var starsRating = goodElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  starsRating.classList.add(RATING_ARRAY[good.rating.value]);

  // Рейтинг
  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = good.rating.number;

  isSugar(goodElement, good);

  var cardBtnFavorite = goodElement.querySelector('.card__btn-favorite');
  cardBtnFavorite.addEventListener('click', clickBtnFavoriteHandler);

  var cardBtn = goodElement.querySelector('.card__btn');
  cardBtn.addEventListener('click', btnCardClickHandler);

  // Функция добавления товара в корзину
  function btnCardClickHandler() {
    if (good.amount > 0) {
      goodsCards.classList.remove('goods__cards--empty');
      goodsCardEmpty.classList.add('visually-hidden');
      // Копируем товар
      var goodCard = Object.assign({}, good);
      // Если количество больше 0, то добавляем товар в корзину
      // Если товар уже содержится в корзине, увеличиваем количество товара
      if (contains(basketCards, goodCard)) {
        addGoodAmount(basketCards, goodCard);
      } else {
        goodCard.orderedAmount = 1;
        delete goodCard.amount;
        basketCards.push(goodCard);
      }
      // Показать количество товара в корзине
      mainHeaderBasket.textContent = getCountBasket(basketCards);
      // Уменьшить количество товара на единицу при добавлении товара
      good.amount--;

      showBasket(basketCards, goodsCards, addElementsCard);
    }
  }

  return goodElement;
}

// Добавить количество ззаказа в header
function getCountBasket(basket) {
  var basketCountOrder = 0;
  for (var m = 0; m < basket.length; m++) {
    basketCountOrder += basket[m].orderedAmount;
  }
  return basketCountOrder;
}

// Добавить единицу, если товар уже лежит в корзине
function addGoodAmount(basket, goodCard) {
  for (var m = 0; m < basket.length; m++) {
    if (basket[m].name === goodCard.name) {
      basket[m].orderedAmount++;
    }
  }
}

// Отобразить товар в корзине
function showBasket(basket, catalog, callback) {
  removeBasket();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < basket.length; i++) {
    fragment.appendChild(callback(basket[i]));
  }

  catalog.appendChild(fragment);
}

// Очищаю корзину перед следующим рендерингом
function removeBasket() {
  while (goodsCards.firstChild) {
    goodsCards.removeChild(goodsCards.firstChild);
  }
}

// Функция проверки - есть ли объект в массиве
function contains(basket, goodCard) {
  for (var m = 0; m < basket.length; m++) {
    if (basket[m].name === goodCard.name) {
      return true;
    }
  }
  return false;
}

// Показываем и убираем класс при нажатие на кнопку "Добавить в Избранное"
function clickBtnFavoriteHandler(evt) {
  var cardFavotireElement = evt.currentTarget;
  cardFavotireElement.classList.toggle('card__btn-favorite--selected');
}

// Массив товаров
var arrayGoods = [];

// Показать товары в каталоге
function showGoods(callback, catalog, length) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < length; i++) {
    var elGood = generateGoods(i);
    arrayGoods.push(elGood);
    fragment.appendChild(callback(elGood));
  }

  catalog.appendChild(fragment);
}

var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');
var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');

// Шаблонизируем товары в корзине
function addElementsCard(good) {
  var cardElement = cardElements.cloneNode(true);
  var cardOrderTitle = cardElement.querySelector('.card-order__title');
  cardOrderTitle.textContent = good.name;
  var cardOrderImg = cardElement.querySelector('.card-order__img');
  cardOrderImg.src = good.picture;
  var cardOrderPrice = cardElement.querySelector('.card-order__price');
  cardOrderPrice.textContent = good.price + ' ₽';
  var cardOrderCount = cardElement.querySelector('.card-order__count');
  cardOrderCount.value = good.orderedAmount;

  //  Функция удаления товара в магазине
  var btnClose = cardElement.querySelector('.card-order__close');
  btnClose.addEventListener('click', btnCloseClickHandler);

  var goodCards = document.querySelector('.goods__cards');

  function btnCloseClickHandler() {
    deleteGood(basketCards, good, goodCards, cardElement);
  }

  return cardElement;
}

// Удалить товар из корзины
function deleteGood(basket, good, goodCards, cardElement) {
  for (var m = 0; m < basket.length; m++) {
    if (basket[m].name === good.name) {
      // Убрать товар из массива корзины
      basket.splice(m, 1);
      goodCards.removeChild(cardElement);
      // Убрать количество товара в корзине
      mainHeaderBasket.textContent -= good.orderedAmount;

      // Прибавить элементу количество
      // good.amount += good.orderedAmount;
      isEmptyHeaderBasket();
      isEmptyBasket();
    }
  }
}

// Если количество товара равно нулю
function isEmptyHeaderBasket() {
  if (parseInt(mainHeaderBasket.textContent, 10) === 0) {
    mainHeaderBasket.textContent = 'В корзине ничего нет';
  }
}

// Проверка, пуста ли корзина
function isEmptyBasket() {

  if (basketCards.length === 0) {
    goodsCards.classList.add('goods__cards--empty');
    goodsCards.appendChild(goodsCardEmpty);
    goodsCardEmpty.classList.remove('visually-hidden');
  }
}

showGoods(renderGood, catalogCards, catalogGoods);
// showGoods(addElementsCard, goodsCards, basketGoods);

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
    // disabledInput(deliverCourier);
    disabledInput(deliverCourier, true);
  } else if (deliverId === 'deliver__courier') {
    document.querySelector('.' + deliverId).classList.remove('visually-hidden');
    deliverStore.classList.add('visually-hidden');
    // disabledInput(deliverStore, 'true');
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

// 4. Первая фаза работы фильтра по цене
// Слайдер
var sliderLine = document.querySelector('.range__filter');
// Заполнитель
var sliderFillLine = document.querySelector('.range__fill-line');
// Левый ползунок
var rangeMin = document.querySelector('.range__btn--left');
// Правый ползунок
var rangeMax = document.querySelector('.range__btn--right');
// Минимальная цена
var priceMin = document.querySelector('.range__price--min');
// Макимальная цена
var priceMax = document.querySelector('.range__price--max');

var min = parseInt(getComputedStyle(rangeMin).left, 10);
var max = parseInt(getComputedStyle(rangeMax).left, 10);

// Координаты слайдера
var sliderLineCoords = getCoords(sliderLine);

rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);

function rangeMinMouseDownHandler(evt) {
  // Выведем текущее координатное значение ползунка
  var elMinCoords = getCoords(rangeMin);
  // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
  var shiftX = evt.pageX - elMinCoords.left;
  document.addEventListener('mousemove', rangeMouseMoveHandler);

  function rangeMouseMoveHandler(e) {
    var newLeft = e.pageX - shiftX - sliderLineCoords.left;

    if (newLeft < MIN) {
      newLeft = MIN;
    }

    if (newLeft > max - rangeMin.offsetWidth / 2) {
      newLeft = max - rangeMin.offsetWidth / 2;
    }

    min = newLeft;
    rangeMin.style.left = newLeft + 'px';

    sliderFillLine.style.left = newLeft + 'px';
  }

  document.addEventListener('mouseup', rangeMouseUpHandler);

  function rangeMouseUpHandler() {

    priceMin.textContent = parseInt(min, 10);
    priceMax.textContent = parseInt(max, 10);

    document.removeEventListener('mousemove', rangeMouseMoveHandler);
    document.removeEventListener('mouseup', rangeMouseUpHandler);
  }

  return false;
}

function rangeMaxMouseDownHandler(evt) {
  // Выведем текущее координатное значение ползунка
  var elMaxCoords = getCoords(rangeMax);
  // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
  var shiftX = evt.pageX - elMaxCoords.left;
  document.addEventListener('mousemove', rangeMouseMoveHandler);

  function rangeMouseMoveHandler(e) {
    var newRight = e.pageX - shiftX - sliderLineCoords.left;

    if (newRight > MAX) {
      newRight = MAX;
    }

    if (newRight < min + rangeMin.offsetWidth / 2) {
      newRight = min + rangeMin.offsetWidth / 2;
    }

    max = newRight;
    rangeMax.style.left = newRight + 'px';

    sliderFillLine.style.right = ELEMENT_WIDTH - newRight + 'px';
  }

  document.addEventListener('mouseup', rangeMouseUpHandler);

  function rangeMouseUpHandler() {

    priceMin.textContent = parseInt(min, 10);
    priceMax.textContent = parseInt(max, 10);

    document.removeEventListener('mousemove', rangeMouseMoveHandler);
    document.removeEventListener('mouseup', rangeMouseUpHandler);
  }

  return false;
}

function getCoords(elem) {
  var elCoords = elem.getBoundingClientRect();

  return {
    top: elCoords.top + pageYOffset,
    left: elCoords.left + pageXOffset,
  };
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


// События

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
    patternMismatch: 'Поле CVC содержит только цифры',
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
  el.addEventListener('invalid', function () {
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
  });
}

// Обработчик событий на форме
var form = document.querySelector('form:nth-child(2)');
var contactDataName = document.querySelector('#contact-data__name');
var contactDataTel = document.querySelector('#contact-data__tel');
var paymentCardNumber = document.querySelector('#payment__card-number');
var paymentCardDate = document.querySelector('#payment__card-date');
var paymentСardСvc = document.querySelector('#payment__card-cvc');
var paymentCardholder = document.querySelector('#payment__cardholder');
var deliverStreet = document.querySelector('#deliver_street');
var deliverHouse = document.querySelector('#deliver_house');
var deliverFloor = document.querySelector('#deliver__floor');
var deliverRoom = document.querySelector('#deliver__room');


// Автодополнение символа /
function inputKeyupHandler(evt) {
  if (evt.keyCode !== 8) {
    if (paymentCardDate.value.length === 2) {
      paymentCardDate.value += '/';
    }
  }
}

paymentCardDate.addEventListener('keyup', inputKeyupHandler);

form.addEventListener('invalid', function (evt) {
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
