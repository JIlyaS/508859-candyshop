'use strict';

var NAME_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина',
'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var CONTENTS_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var PICTURE_GOODS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg',
'marhmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda.russian.jpg'];

function generateString() {
  var composition = '';
  for (var j = 0; j < Math.floor(Math.random() * CONTENTS_GOODS.length); j++) {
    composition += CONTENTS_GOODS[Math.floor(Math.random() * CONTENTS_GOODS.length)] + ', ';
  }

  return composition.slice(0, -2);
}

function generateGoods() {
  return {
    name: NAME_GOODS[Math.floor(Math.random() * NAME_GOODS.length)],
    picture: 'img/cards/' + PICTURE_GOODS[Math.floor(Math.random() * PICTURE_GOODS.length)],
    amount: Math.floor(Math.random() * 20),
    price: Math.floor(Math.random() * 1400) + 100,
    weight: Math.floor(Math.random() * 270) + 30,
    rating: {
      value: Math.floor(Math.random() * 4) + 1,
      number: Math.floor(Math.random() * 890) + 10
    },
    nutritionFacts: {
      sugar: !!Math.round(Math.random()),
      energy: Math.floor(Math.random() * 430) + 70,
      contents: generateString()
    }
  };
}

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = document.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');

function renderGood(good) {
  var goodElement = goodElements.cloneNode(true);

  if (good.amount > 5) {
    goodElement.classList.add('card--in-stock');
  } else if (good.amount < 1 && good.amount < 5) {
    goodElement.classList.add('card--little');
  } else if (good.amount === 0) {
    goodElement.classList.add('card--soon');
  }
  var cardTitle = goodElement.querySelector('.card__title');
  cardTitle.textContent = good.name;
  var cardPrice = goodElement.querySelector('.card__price');
  // var cardCurrency = goodElement.querySelector('.card__currency');
  var cardWeight = goodElement.querySelector('.card__weight');
  cardPrice.textContent = good.price;
  cardWeight.textContent = good.weight;

  var starsRating = goodElement.querySelector('.stars__rating');
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

  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = good.rating.number;

  var cardCharacteristic = goodElement.querySelector('.card__characteristic');

  if (good.nutritionFacts.sugar === true) {
    cardCharacteristic.textContent = 'Содержит сахар';
  } else {
    cardCharacteristic.textContent = 'Без сахара';
  }

  return goodElement;
}

function showGoods(length) {
  var arrayGoods = [];
  for (var i = 0; i < length; i++) {
    arrayGoods.push(generateGoods());
  }

  return arrayGoods;
}

var cardElements = document.querySelector('#card-order')
                          .content
                          .querySelector('.goods_card');

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');

function addElementsCard(elements) {

  var fragment = document.createDocumentFragment();

  for (var k = 0; k < elements.length; k++) {

    var cardElement = cardElements.cloneNode(true);

    var cardOrderTitle = cardElement.querySelector('.card-order__title');
    cardOrderTitle.textContent = elements[k].name;
    var cardOrderImg = cardElement.querySelector('.card-order__img');
    cardOrderImg.src = elements[k].picture;
    var cardOrderPrice = cardElement.querySelector('.card-order__price');
    cardOrderPrice.textContent = elements[k].price;
    var cardOrderCount = cardElement.querySelector('.card-order__count');
    cardOrderCount.value = elements[k].amount;

    fragment.appendChild(cardElement);
  }

  goodsCards.appendChild(fragment);
}

addElementsCard(showGoods(3));

goodsCards.classList.remove('goods__cards--empty');
goodsCardEmpty.classList.add('visually-hidden');
