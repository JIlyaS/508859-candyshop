'use strict';

(function () {
  // Массив товаров в корзине
  var basketCards = [];
  // Уберите у блока catalog__cards класс catalog__cards--load
  var cardLists = document.querySelector('.catalog__cards');
  // Добавлением класса visually-hidden блок catalog__load
  var catalogLoad = document.querySelector('.catalog__load');
  // Итоговая сумма корзины
  var goodsTotal = document.querySelector('.goods__total');
  var goodsOrderLink = goodsTotal.querySelector('.goods__order-link');
  catalogLoad.parentNode.removeChild(catalogLoad);
  var loadData = document.querySelector('#load-data').content.querySelector('.catalog__load');
  cardLists.appendChild(loadData);

  // Находим шаблон, который будем копировать
  var goodElements = document.querySelector('#card').content.querySelector('.catalog__card');

  // Избранное
  var favorites = [];
  var countBasket = 0;
  var costBasket = 0;

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
    var consistCharacteristic = goodElement.querySelector('.card__composition-list');
    consistCharacteristic.textContent = good.nutritionFacts.contents;

    // Добавляем класс рейтинга в зависимоти от значения
    var starsRating = goodElement.querySelector('.stars__rating');
    starsRating.classList.remove('stars__rating--five');
    starsRating.classList.add(window.data.RATING_ARRAY[good.rating.value]);

    // Рейтинг
    var starCount = goodElement.querySelector('.star__count');
    starCount.textContent = good.rating.number;

    writeContentSugar(goodElement, good);

    // Показываем состав
    var cardBtnComposition = goodElement.querySelector('.card__btn-composition');

    cardBtnComposition.addEventListener('click', function () {
      var cardComposition = goodElement.querySelector('.card__composition');
      cardComposition.classList.toggle('card__composition--hidden');
    });

    var cardBtnFavorite = goodElement.querySelector('.card__btn-favorite');
    cardBtnFavorite.addEventListener('click', clickBtnFavoriteHandler);

    // Показываем и убираем класс при нажатие на кнопку "Добавить в Избранное"
    function clickBtnFavoriteHandler(evt) {
      var cardFavotireElement = evt.currentTarget;
      cardFavotireElement.classList.toggle('card__btn-favorite--selected');
      if (cardFavotireElement.classList.contains('card__btn-favorite--selected')) {
        good.favorite = true;
        favorites.push(good);
        window.filter.generateCountGoods();
      } else {
        delete good.favorite;
        var index = favorites.indexOf(good);
        favorites.splice(index, 1);
        window.filter.generateCountGoods();
      }
    }

    if (good.favorite) {
      cardBtnFavorite.classList.add('card__btn-favorite--selected');
    }
    // Кнопка - Добавить товар в корзину
    var cardBtn = goodElement.querySelector('.card__btn');
    cardBtn.addEventListener('click', btnCardClickHandler);

    // Функция добавления товара в корзину
    function btnCardClickHandler() {
      if (good.amount > 0) {
        goodsCards.classList.remove('goods__cards--empty');
        goodsCardEmpty.classList.add('visually-hidden');
        // Копируем товар
        var goodCard = Object.assign({}, good);

        setCountInBasket(window.data.UNIT_GOODS, true);
        setCostInBasket(good.price, window.data.UNIT_GOODS, true);
        // Если количество больше 0, то добавляем товар в корзину
        // Если товар уже содержится в корзине, увеличиваем количество товара
        var containsObject = getContainsObject(basketCards, goodCard);
        if (containsObject) {
          addGoodAmount(basketCards, goodCard);
        } else {
          goodCard.orderedAmount = 1;
          basketCards.push(goodCard);
          showTotalBlock();
        }
        getContentTotal();
        // Показать количество товара в корзине
        mainHeaderBasket.textContent = getCountBasket(basketCards);
        // Уменьшить количество товара на единицу при добавлении товара
        good.amount--;
        // При уменьшении количества генерируем показатель товара
        window.filter.generateCountGoods();
        window.filter.generateGoods();
        showBasket(basketCards, goodsCards, addElementsCard);
        checkEmptyBasket();
      }
    }

    return goodElement;
  }

  // Есть ли сахар
  function writeContentSugar(goodElement, good) {
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

  // Добавить количество заказа в header
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

  // Массив товаров
  var arrayGoods = [];
  // Показать товары в каталоге
  function successHandler(dataCards) {
    cardLists.classList.remove('catalog__cards--load');
    cardLists.removeChild(loadData);
    arrayGoods = dataCards;
    renderCards(arrayGoods);
    checkEmptyBasket();
    window.filter.updateCatalog(dataCards);
  }

  function renderCards(goods) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < goods.length; i++) {
      fragment.appendChild(renderGood(goods[i]));
    }
    cardLists.appendChild(fragment);
  }

  // Очищаю корзину перед следующим рендерингом
  function cleanAllCards() {
    while (cardLists.firstChild) {
      cardLists.removeChild(cardLists.firstChild);
    }
  }

  function errorHandler(errorMessage) {
    var modalError = document.querySelector('.modal--error');
    modalError.classList.remove('modal--hidden');
    var modalMessage = modalError.querySelector('.modal__message');
    modalMessage.textContent = errorMessage;

    var modalСlose = modalError.querySelector('.modal__close');
    modalСlose.addEventListener('click', function () {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', window.utils.modalKeydownHandler);
    });

    document.addEventListener('keydown', window.utils.modalKeydownHandler);
  }

  window.load(successHandler, errorHandler);

  var mainHeaderBasket = document.querySelector('.main-header__basket');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');

  var cardElements = document.querySelector('#card-order').content.querySelector('.goods_card');

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

    var btnDecrease = cardElement.querySelector('.card-order__btn--decrease');
    var btnIncrease = cardElement.querySelector('.card-order__btn--increase');

    btnDecrease.addEventListener('click', decreaseCardBasket);
    btnIncrease.addEventListener('click', increaseCardBasket);

    function decreaseCardBasket() {
      if (good.orderedAmount > window.data.UNIT_GOODS) {
        cardOrderCount.value = +cardOrderCount.value - window.data.UNIT_GOODS;
        good.orderedAmount--;
        // Показать количество товара в корзине
        mainHeaderBasket.textContent = getCountBasket(basketCards);
        setCountInBasket(window.data.UNIT_GOODS, false);
        setCostInBasket(good.price, window.data.UNIT_GOODS, false);
        getContentTotal();

        // При уменьшении количества генерируем показатель товара
        window.filter.generateCountGoods();
        window.filter.generateGoods();
      } else {
        setCountInBasket(window.data.UNIT_GOODS, false);
        setCostInBasket(good.price, good.orderedAmount, false);
        getContentTotal();
        deleteGood(basketCards, good, goodsCards, cardElement);
      }
    }

    function increaseCardBasket() {
      if (good.orderedAmount < good.amount) {
        cardOrderCount.value = +cardOrderCount.value + window.data.UNIT_GOODS;
        good.orderedAmount++;
        // Показать количество товара в корзине
        mainHeaderBasket.textContent = getCountBasket(basketCards);
        setCountInBasket(window.data.UNIT_GOODS, true);
        setCostInBasket(good.price, window.data.UNIT_GOODS, true);
        getContentTotal();

        // При увеличении количества генерируем показатель товара
        window.filter.generateCountGoods();
        window.filter.generateGoods();
      }
    }

    // Функция удаления товара в магазине
    var btnClose = cardElement.querySelector('.card-order__close');
    btnClose.addEventListener('click', btnCloseClickHandler);

    function btnCloseClickHandler() {
      deleteGood(basketCards, good, goodsCards, cardElement);
      setCountInBasket(good.orderedAmount, false);
      setCostInBasket(good.price, good.orderedAmount, false);
      getContentTotal();
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
        checkEmptyHeaderBasket();
        checkEmptyBasket();
      }
    }
  }

  // Если количество товара равно нулю
  function checkEmptyHeaderBasket() {
    if (parseInt(mainHeaderBasket.textContent, 10) === 0) {
      mainHeaderBasket.textContent = 'В корзине ничего нет';
    }
  }

  var orderForm = document.querySelector('.order');

  // Проверка, пуста ли корзина
  function checkEmptyBasket() {
    var buySubmitBtn = document.querySelector('.buy__submit-btn');
    if (!basketCards.length) {
      goodsCards.classList.add('goods__cards--empty');
      goodsCards.appendChild(goodsCardEmpty);
      goodsCardEmpty.classList.remove('visually-hidden');
      hiddenTotalBlock();
      window.order.disabledInput(orderForm, true);
      buySubmitBtn.disabled = true;
    } else {
      window.order.disabledInput(orderForm, false);
      checkSelectedButtons();
      buySubmitBtn.disabled = false;
    }
  }

  function getContentTotal() {
    var goodsTotalCount = goodsTotal.querySelector('.goods__total-count');
    goodsTotalCount.textContent = 'Итого за ' + countBasket + ' товаров: ';
    var spanCost = document.createElement('span');
    spanCost.className = 'goods__price';
    spanCost.textContent = costBasket + ' ₽';
    goodsTotalCount.appendChild(spanCost);
  }

  function showTotalBlock() {
    goodsTotal.classList.remove('visually-hidden');
    goodsOrderLink.classList.remove('goods__order-link--disabled');
  }

  function hiddenTotalBlock() {
    goodsTotal.classList.add('visually-hidden');
    goodsOrderLink.classList.add('goods__order-link--disabled');
  }

  // Проверка, выбран ли тот или иной способ оплаты или доставки в форме
  function checkSelectedButtons() {
    var deliverStoreInput = document.querySelector('#deliver__store');
    var deliverCourierInput = document.querySelector('#deliver__courier');

    window.order.disabledInput(window.order.paymentCardWrap, window.order.paymentCash.checked);
    window.order.disabledInput(window.order.paymentCashWrap, window.order.paymentCard.checked);
    window.order.disabledInput(window.order.deliverStore, deliverCourierInput.checked);
    window.order.disabledInput(window.order.deliverCourier, deliverStoreInput.checked);
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
  function getContainsObject(basket, goodCard) {
    for (var m = 0; m < basket.length; m++) {
      if (basket[m].name === goodCard.name) {
        return true;
      }
    }
    return false;
  }

  function setCountInBasket(count, operatorBool) {
    if (operatorBool) {
      countBasket = countBasket + count;
    } else if (!operatorBool) {
      countBasket = countBasket - count;
    }
  }

  function setCostInBasket(cost, count, operatorBool) {
    if (operatorBool) {
      costBasket = costBasket + (cost * count);
    } else if (!operatorBool) {
      costBasket = costBasket - (cost * count);
    }
  }

  function clearBasket() {
    basketCards = [];
    countBasket = 0;
    costBasket = 0;
  }

  // Создаем скрипт загрузки данных по JSONP и выводим его в index.html
  var loader = document.createElement('script');
  loader.src = window.backend.DATA_URL + '?callback=' + window.backend.CALLBACK_NAME;
  document.body.append(loader);

  window.catalog = {
    renderCards: renderCards,
    arrayGoods: arrayGoods,
    cleanAllCards: cleanAllCards,
    cardLists: cardLists,
    favorites: favorites,
    checkEmptyBasket: checkEmptyBasket,
    checkEmptyHeaderBasket: checkEmptyHeaderBasket,
    removeBasket: removeBasket,
    clearBasket: clearBasket,
    mainHeaderBasket: mainHeaderBasket
  };

})();
