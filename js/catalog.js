'use strict';

(function () {
  // Массив товаров
  var arrayGoods = [];
  // Массив товаров в корзине
  var basketCards = [];
  // Уберите у блока catalog__cards класс catalog__cards--load
  var catalogCards = document.querySelector('.catalog__cards');

  // Находим шаблон, который будем копировать
  var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');

  // Генерируем товар - создаем DOM-элементы и заполняем данными из массива
  function renderGood(good) {
    var goodElement = goodElements.cloneNode(true); // Клонируем товар

    getAmountClass(good, goodElement);

    var cardTitle = goodElement.querySelector('.card__title');
    cardTitle.textContent = good.name; // Вставим название в блок
    var cardImg = goodElement.querySelector('.card__img');
    cardImg.src = 'img/cards/' + good.picture;
    var cardPrice = goodElement.querySelector('.card__price');
    cardPrice.innerHTML = good.price + '&nbsp;<span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

    // Добавляем класс рейтинга в зависимоти от значения
    var starsRating = goodElement.querySelector('.stars__rating');
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add(window.data.RATING_ARRAY[good.rating.value]);

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

  // Показываем и убираем класс при нажатие на кнопку "Добавить в Избранное"
  function clickBtnFavoriteHandler(evt) {
    var cardFavotireElement = evt.currentTarget;
    cardFavotireElement.classList.toggle('card__btn-favorite--selected');
  }

  // Показать товары в каталоге
  function successHandler(dataCards) {
    catalogCards.classList.remove('catalog__cards--load');

    arrayGoods = dataCards;

    // Добавлением класса visually-hidden блок catalog__load
    var catalogLoad = document.querySelector('.catalog__load');
    catalogLoad.classList.add('visually-hidden');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataCards.length; i++) {
      fragment.appendChild(renderGood(dataCards[i]));
    }
    catalogCards.appendChild(fragment);
  }

  function errorHandler(errorMessage) {
    var modalError = document.querySelector('.modal--error');
    modalError.classList.remove('modal--hidden');
    var modalMessage = modalError.querySelector('.modal__message');
    modalMessage.textContent = errorMessage;

    var modalСlose = modalError.querySelector('.modal__close');
    modalСlose.addEventListener('click', function () {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', errorModalKeydownHandler);
    });

    function errorModalKeydownHandler(evt) {
      if (evt.keyCode === 27) {
        modalError.classList.add('modal--hidden');
        document.removeEventListener('keydown', errorModalKeydownHandler);
      }
    }
    document.addEventListener('keydown', errorModalKeydownHandler);
  }

  window.load(successHandler, errorHandler);

  var mainHeaderBasket = document.querySelector('.main-header__basket');

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

  var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');

  // Шаблонизируем товары в корзине
  function addElementsCard(good) {
    var cardElement = cardElements.cloneNode(true);
    var cardOrderTitle = cardElement.querySelector('.card-order__title');
    cardOrderTitle.textContent = good.name;
    var cardOrderImg = cardElement.querySelector('.card-order__img');
    cardOrderImg.src = 'img/cards/' + good.picture;
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
        for (var k = 0; k < arrayGoods.length; k++) {
          if (arrayGoods[k].name === good.name) {
            arrayGoods[k].amount += good.orderedAmount;
          }
        }
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

  // Создаем скрипт загрузки данных по JSONP и выводим его в index.html
  var loader = document.createElement('script');
  loader.src = window.backend.DATA_URL + '?callback=' + window.backend.CALLBACK_NAME;
  document.body.append(loader);

})();
