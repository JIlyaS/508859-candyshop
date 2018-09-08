'use strict';
// Массив названия товаров
var NAME_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина',
  'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
// Массив ингридиентов
var CONTENTS_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
// Расширения файлов
var PICTURE_GOODS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg',
  'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

// Генерируем строку ингридиентов
function generateString() {
  var composition = '';

  for (var j = 0; j < Math.floor(Math.random() * CONTENTS_GOODS.length); j++) {
    composition += CONTENTS_GOODS[Math.floor(Math.random() * CONTENTS_GOODS.length)] + ', '; // Генерируем строку списка ингридиентов
  }

  return composition.slice(0, -2) + '.';
}

// Генерируем 26 объектов описания товара
function generateGoods() {
  return {
    name: NAME_GOODS[Math.floor(Math.random() * NAME_GOODS.length)], // Название товара
    picture: 'img/cards/' + PICTURE_GOODS[Math.floor(Math.random() * PICTURE_GOODS.length)], // Адрес изображения товара
    amount: Math.floor(Math.random() * 20), // Количество
    price: Math.floor(Math.random() * 1400) + 100, // Стоимость
    weight: Math.floor(Math.random() * 270) + 30, // Вес
    rating: { // Рейтинг
      value: Math.floor(Math.random() * 4) + 1, // Оценка
      number: Math.floor(Math.random() * 890) + 10 // Количество оценок
    },
    nutritionFacts: { // Состав
      sugar: !!Math.round(Math.random()), // Содержание сахара
      energy: Math.floor(Math.random() * 430) + 70, // Энергетическая ценность
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
var goodElements = document.querySelector('#card')
                           .content
                           .querySelector('.catalog__card');

// Генерируем товар - создаем DOM-элементы и заполняем данными из массива
function renderGood(good) {
  var goodElement = goodElements.cloneNode(true); // Клонируем товар

  // В зависимости от количества обавляем класс
  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount > 1 && good.amount < 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }

  var cardTitle = goodElement.querySelector('.card__title');
  cardTitle.textContent = good.name; // Вставим название в блок
  var cardImg = goodElement.querySelector('.card__img');
  cardImg.src = good.picture;
  var cardPrice = goodElement.querySelector('.card__price');
  cardPrice.innerHTML = good.price + '&nbsp;<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

  // Добавляем класс рейтинга в зависимоти от значения
  var starsRating = goodElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');

  if (good.rating.value === 1) {
    starsRating.classList.add('stars__rating--one');
  } else if (good.rating.value === 2) {
    starsRating.classList.add('stars__rating--two');
  } else if (good.rating.value === 3) {
    starsRating.classList.add('stars__rating--three');
  } else if (good.rating.value === 4) {
    starsRating.classList.add('stars__rating--four');
  } else if (good.rating.value === 5) {
    starsRating.classList.add('stars__rating--five');
  }

  // Рейтинг
  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = good.rating.number;
  // Характеристики сахара и состав
  var cardCharacteristic = goodElement.querySelector('.card__characteristic');

  if (good.nutritionFacts.sugar === true) {
    cardCharacteristic.textContent = 'Содержит сахар';
  } else {
    cardCharacteristic.textContent = 'Без сахара';
  }

  return goodElement;
}

function showGoods(callback, catalog, length) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < length; i++) {
    fragment.appendChild(callback(generateGoods()));
  }

  catalog.appendChild(fragment);
}

var cardElements = document.querySelector('#card-order')
                          .content
                          .querySelector('.goods_card');

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');

function addElementsCard(good) {

  var cardElement = cardElements.cloneNode(true);

  var cardOrderTitle = cardElement.querySelector('.card-order__title');
  cardOrderTitle.textContent = good.name;
  var cardOrderImg = cardElement.querySelector('.card-order__img');
  cardOrderImg.src = good.picture;
  var cardOrderPrice = cardElement.querySelector('.card-order__price');
  cardOrderPrice.innerHTML = good.price + '&nbsp;₽';
  var cardOrderCount = cardElement.querySelector('.card-order__count');
  cardOrderCount.value = good.amount;

  return cardElement;
}

goodsCards.classList.remove('goods__cards--empty');
goodsCardEmpty.classList.add('visually-hidden');

showGoods(renderGood, catalogCards, 26);
showGoods(addElementsCard, goodsCards, 3);