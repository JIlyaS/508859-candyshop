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

var catalogGoods = 26;
var basketGoods = 3;

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

// Генерируем 26 объектов описания товара
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

  return goodElement;
}

function showGoods(callback, catalog, length) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < length; i++) {
    fragment.appendChild(callback(generateGoods(i)));
  }

  catalog.appendChild(fragment);
}

var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');

function addElementsCard(good) {

  var cardElement = cardElements.cloneNode(true);

  var cardOrderTitle = cardElement.querySelector('.card-order__title');
  cardOrderTitle.textContent = good.name;
  var cardOrderImg = cardElement.querySelector('.card-order__img');
  cardOrderImg.src = good.picture;
  var cardOrderPrice = cardElement.querySelector('.card-order__price');
  cardOrderPrice.textContent = good.price + ' ₽';

  return cardElement;
}

goodsCards.classList.remove('goods__cards--empty');
goodsCardEmpty.classList.add('visually-hidden');

showGoods(renderGood, catalogCards, catalogGoods);
showGoods(addElementsCard, goodsCards, basketGoods);


// Проверка номера банковской карты по алгоритму Луна
// Тестовая строка
// var number = '133567890123456';
var numberBankCard = document.querySelector('#payment__card-number');

function checkLuhn(num) {
  // Разделяет строку на отдельные символы
  var arrNumber = num.split('');

  var newArrNumber = arrNumber.map(function (element, index) {
    // Преобразуем каждую строку в число
    var mapElement = parseInt(element, 10);
    // Производим операцию с каждым нечётным числом
    if (index % 2 === 1) {
      mapElement = (mapElement * 2 > 9) ? (mapElement * 2) - 9 : mapElement * 2;
    }

    return mapElement;
  });
  // Суммируем каждый элемент друг с другом
  var result = newArrNumber.reduce(function (previous, current) {
    return previous + current;
  });
  // Если результат больше 10 и кратен 10 то возвращаем истину
  if (result >= 10 && result % 10 === 0) {
    return true;
  }

  return false;
}

// checkLuhn(number);

numberBankCard.addEventListener('change', function () {
  return checkLuhn(numberBankCard.value);
});


// События

// Обработчик событий на форме
var form = document.querySelector('form');
// var buySubmitBtn = document.querySelector('.buy__submit-btn');
form.addEventListener('click', function (evt) {
  var target = evt.target;
  console.log(target);
}, true);

// Валидация первой подформы
var contactDataName = document.querySelector('#contact-data__name');
contactDataName.addEventListener('invalid', function () {
  console.log('123');
  if (contactDataName.validity.tooShort) {
    contactDataName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (contactDataName.validity.tooLong) {
    contactDataName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (contactDataName.validity.valueMissing) {
    contactDataName.setCustomValidity('Обязательное поле');
  } else {
    contactDataName.setCustomValidity('');
  }
});

var contactDataTel = document.querySelector('#contact-data__tel');
contactDataTel.addEventListener('invalid', function () {
  if (contactDataTel.validity.tooShort || contactDataTel.validity.tooLong) {
    contactDataTel.setCustomValidity('Номер телефона должен состоять из 11 символов');
  } else if (contactDataTel.validity.patternMismatch) {
    contactDataTel.setCustomValidity('Номер телефона должен состоять из 11 цифр');
  } else if (contactDataTel.validity.valueMissing) {
    contactDataTel.setCustomValidity('Обязательное поле');
  } else {
    contactDataTel.setCustomValidity('');
  }
});

var paymentCardNumber = document.querySelector('#payment__card-number');
paymentCardNumber.addEventListener('invalid', function () {
  if (paymentCardNumber.validity.tooShort || paymentCardNumber.validity.tooLong) {
    paymentCardNumber.setCustomValidity('Номер банковской карты должен состоять из 16 цифр');
  } else if (paymentCardNumber.validity.patternMismatch) {
    paymentCardNumber.setCustomValidity('Номер банковской карты не должен содержать буквы и знаки препинания');
  } else if (paymentCardNumber.validity.valueMissing) {
    paymentCardNumber.setCustomValidity('Обязательное поле');
  } else {
    paymentCardNumber.setCustomValidity('');
  }
});

// Автодополнение символа /
var paymentCardDate = document.querySelector('#payment__card-date');

function inputKeyupHandler(evt) {
  if (evt.keyCode !== 8) {
    if (paymentCardDate.value.length === 2) {
      // console.log(paymentCardDate.value);
      paymentCardDate.value += '/';
    }
  }
}

paymentCardDate.addEventListener('keyup', inputKeyupHandler);

paymentCardDate.addEventListener('invalid', function () {
  if (paymentCardDate.validity.tooShort || paymentCardDate.validity.tooLong) {
    paymentCardDate.setCustomValidity('Формат даты должен состоять из 5 символов');
  } else if (paymentCardDate.validity.patternMismatch) {
    paymentCardDate.setCustomValidity('Формат даты должен быть мм/ГГ и состоять только из цифр');
  } else if (paymentCardDate.validity.valueMissing) {
    paymentCardDate.setCustomValidity('Обязательное поле');
  } else {
    paymentCardDate.setCustomValidity('');
  }
});

var paymentСardСvc = document.querySelector('#payment__card-cvc');
paymentСardСvc.addEventListener('invalid', function () {
  if (paymentСardСvc.validity.tooShort || paymentСardСvc.validity.tooLong) {
    paymentСardСvc.setCustomValidity('Номер CVC должен состоять из трёх цифр');
  } else if (paymentСardСvc.validity.patternMismatch) {
    paymentСardСvc.setCustomValidity('Поле CVC содержит только цифры');
  } else if (paymentСardСvc.validity.valueMissing) {
    paymentСardСvc.setCustomValidity('Обязательное поле');
  } else {
    paymentСardСvc.setCustomValidity('');
  }
});

var paymentCardholder = document.querySelector('#payment__cardholder');
paymentCardholder.addEventListener('invalid', function () {
  if (paymentCardholder.validity.tooShort) {
    paymentCardholder.setCustomValidity('Имя держателя карты должно состоять минимум из 4-х символов');
  } else if (paymentCardholder.validity.tooLong) {
    paymentCardholder.setCustomValidity('Имя держателя карты не должно превышать 50-ти символов');
  } else if (paymentCardholder.validity.patternMismatch) {
    paymentCardholder.setCustomValidity('Имя держателя карты должно быть на английском языке');
  } else if (paymentCardholder.validity.valueMissing) {
    paymentCardholder.setCustomValidity('Обязательное поле');
  } else {
    paymentCardholder.setCustomValidity('');
  }
});
