'use strict';

(function () {
  // Массив с результатами фильтрации и сортировки
  var arrFilters;
  // Объект с сортировками
  var arrFilterSort = {
    kinds: [],
    nutritionFacts: {},
    prices: [],
    sorts: ''
  };
  // Элементы фильтров по категориям
  var catalogFilter = document.querySelector('.catalog__filter');
  var filterForIcecream = catalogFilter.querySelector('#filter-icecream');
  var filterSoda = catalogFilter.querySelector('#filter-soda');
  var filterGum = catalogFilter.querySelector('#filter-gum');
  var filterMarmalade = catalogFilter.querySelector('#filter-marmalade');
  var filterMarshmallows = catalogFilter.querySelector('#filter-marshmallows');
  // Элементы фильтров по составу
  var filterSugarFree = document.querySelector('#filter-sugar-free');
  var filterVegetarian = document.querySelector('#filter-vegetarian');
  var filterGlutenFree = document.querySelector('#filter-gluten-free');

  // Избранное
  var filterFavorite = document.querySelector('#filter-favorite');
  // В наличии
  var filterАvailability = document.querySelector('#filter-availability');

  // Сортировка
  var filterPopular = document.querySelector('#filter-popular');
  var filterExpencive = document.querySelector('#filter-expensive');
  var filterCheep = document.querySelector('#filter-cheep');
  var filterRating = document.querySelector('#filter-rating');

  // Минимальная цена
  var priceMin = document.querySelector('.range__price--min');
  // Макимальная цена
  var priceMax = document.querySelector('.range__price--max');
  // Слайдер
  var sliderLine = document.querySelector('.range__filter');
  // Заполнитель
  var sliderFillLine = document.querySelector('.range__fill-line');
  // Левый ползунок
  var rangeMin = document.querySelector('.range__btn--left');
  // Правый ползунок
  var rangeMax = document.querySelector('.range__btn--right');
  var min = window.data.MIN;
  var max = window.data.MAX;

  // Кнопка "Показать всё"
  var showAll = document.querySelector('.catalog__submit');

  // Фильтры категорий товара
  function updateCatalog(goods) {

    arrFilters = goods.slice(0);

    generateCountGoods();
    // Добавить событие по категориям товара
    generateFilterKind(filterForIcecream);
    generateFilterKind(filterSoda);
    generateFilterKind(filterGum);
    generateFilterKind(filterMarmalade);
    generateFilterKind(filterMarshmallows);
    generateFilterNutritionFacts(filterSugarFree);
    generateFilterNutritionFacts(filterVegetarian);
    generateFilterNutritionFacts(filterGlutenFree);
    generateFilterPrice();
    generateFilterFavorites(filterFavorite);
    generateFilterInStocks(filterАvailability);
    generateSort(filterPopular);
    generateSort(filterExpencive);
    generateSort(filterCheep);
    generateSort(filterRating);
    generateShowAll(showAll);
  }

  // Показать количество товара подходящими по фильтрацию
  function generateCountGoods() {
    var filterCountIcecream = document.querySelector('label[for="filter-icecream"] + .input-btn__item-count');
    var filterCountSoda = document.querySelector('label[for="filter-soda"] + .input-btn__item-count');
    var filterCountGum = document.querySelector('label[for="filter-gum"] + .input-btn__item-count');
    var filterCountMarmalade = document.querySelector('label[for="filter-marmalade"] + .input-btn__item-count');
    var filterCountMarshmallows = document.querySelector('label[for="filter-marshmallows"] + .input-btn__item-count');
    var filterCountSugarFree = document.querySelector('label[for="filter-sugar-free"] + .input-btn__item-count');
    var filterCountVegetarian = document.querySelector('label[for="filter-vegetarian"] + .input-btn__item-count');
    var filterCountGlutenFree = document.querySelector('label[for="filter-gluten-free"] + .input-btn__item-count');
    var filterCountPrice = document.querySelector('.range__price-count > .range__count');
    var filterCountFavorite = document.querySelector('label[for="filter-favorite"] + .input-btn__item-count');
    var filterCountAvailability = document.querySelector('label[for="filter-availability"] + .input-btn__item-count');
    var countIcecream = 0;
    var countSoda = 0;
    var countGum = 0;
    var countMarmalade = 0;
    var countMarshmallows = 0;
    var countSugarFree = 0;
    var countVegetarian = 0;
    var countGlutenFree = 0;
    var countPrice = 0;
    var countFavorite = 0;
    var countAvailability = 0;

    for (var i = 0; i < arrFilters.length; i++) {
      if (arrFilters[i].kind === 'Мороженое') {
        countIcecream += 1;
      }
      if (arrFilters[i].kind === 'Газировка') {
        countSoda += 1;
      }
      if (arrFilters[i].kind === 'Жевательная резинка') {
        countGum += 1;
      }
      if (arrFilters[i].kind === 'Мармелад') {
        countMarmalade += 1;
      }
      if (arrFilters[i].kind === 'Зефир') {
        countMarshmallows += 1;
      }
      if (!arrFilters[i].nutritionFacts.sugar) {
        countSugarFree += 1;
      }
      if (arrFilters[i].nutritionFacts.vegetarian) {
        countVegetarian += 1;
      }
      if (!arrFilters[i].nutritionFacts.gluten) {
        countGlutenFree += 1;
      }
      if (arrFilters[i].amount > 0) {
        countAvailability += 1;
      }
      if (arrFilterSort.prices.length) {
        if (arrFilters[i].price >= arrFilterSort.prices[window.data.MIN_INDEX] && arrFilters[i].price <= arrFilterSort.prices[window.data.MAX_INDEX]) {
          countPrice += 1;
        }
      } else {
        if (arrFilters[i].price >= window.data.MIN && arrFilters[i].price <= window.data.MAX) {
          countPrice += 1;
        }
      }
    }

    for (var j = 0; j < window.catalog.favorites.length; j++) {
      countFavorite += 1;
    }

    filterCountIcecream.textContent = '(' + countIcecream + ')';
    filterCountSoda.textContent = '(' + countSoda + ')';
    filterCountGum.textContent = '(' + countGum + ')';
    filterCountMarmalade.textContent = '(' + countMarmalade + ')';
    filterCountMarshmallows.textContent = '(' + countMarshmallows + ')';
    filterCountSugarFree.textContent = '(' + countSugarFree + ')';
    filterCountVegetarian.textContent = '(' + countVegetarian + ')';
    filterCountGlutenFree.textContent = '(' + countGlutenFree + ')';
    filterCountGlutenFree.textContent = '(' + countGlutenFree + ')';
    filterCountPrice.textContent = '(' + countPrice + ')';
    filterCountFavorite.textContent = '(' + countFavorite + ')';
    filterCountAvailability.textContent = '(' + countAvailability + ')';
  }
  // Выводим товары по фильтрам
  function generateGoods() {
    window.catalog.cleanAllCards();
    var arrayFilterGoods = [];
    // Один раз проходим по массиву объектов продуктов
    arrFilters.forEach(function (it) {
      var emptyFilterKinds = arrFilterSort.kinds.length === 0;
      var noEmptyFilterKinds = !emptyFilterKinds && arrFilterSort.kinds.indexOf(it.kind) !== -1;

      var emptyFilterFacts = Object.keys(arrFilterSort.nutritionFacts).length === 0;
      var noEmptyFilterFacts = !emptyFilterFacts && checkNutritionFacts(it.nutritionFacts);

      var emptyFilterPrices = arrFilterSort.prices.length === 0;
      var noEmptyFilterPrices = !emptyFilterPrices && (it.price >= arrFilterSort.prices[window.data.MIN_INDEX] && it.price <= arrFilterSort.prices[window.data.MAX_INDEX]);

      var emptyFilterSort = arrFilterSort.sorts.length === 0;
      var noEmptyFilterSort = !emptyFilterSort;

      if ((emptyFilterKinds || noEmptyFilterKinds) &&
          (emptyFilterFacts || noEmptyFilterFacts) &&
          (emptyFilterPrices || noEmptyFilterPrices) &&
          (emptyFilterSort || noEmptyFilterSort)) {
        arrayFilterGoods.push(it);
      }
    });
    sortElements(arrayFilterGoods);
    if (arrayFilterGoods.length === 0) {
      var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      var emptyFilter = blockEmptyFilter.cloneNode(true);
      window.catalog.cardLists.appendChild(emptyFilter);
    }
    window.catalog.renderCards(arrayFilterGoods);
  }
  // Функция - показать всё
  function generateShowAll(element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.catalog.cleanAllCards();
      arrFilterSort.sort = 'Сначала популярные';
      filterPopular.checked = true;
      resetAllFilters();
      resetCheckbox();
      initSliderCoordinates();
      generateCountGoods();
      window.catalog.renderCards(arrFilters);
    });
  }

  // Очищаем все фильтры в объекте фильтров
  function resetAllFilters() {
    arrFilterSort.kinds = [];
    arrFilterSort.nutritionFacts = {};
    arrFilterSort.prices = [];
    arrFilterSort.sort = '';
  }

  // Убираем галочки со всех чекбоксов
  function resetCheckbox() {
    var inputCheckbox = document.querySelectorAll('.input-btn__input--checkbox');
    inputCheckbox.forEach(function (it) {
      it.checked = false;
    });
  }
  // Функция инициализации координат слайдера и установка его цены
  function initSliderCoordinates() {
    sliderFillLine.style.left = window.data.MIN + 'px';
    sliderFillLine.style.right = window.data.ELEMENT_WIDTH - window.data.MAX + 'px';
    rangeMin.style.left = window.data.MIN + 'px';
    rangeMax.style.left = window.data.MAX + 'px';
    min = window.data.MIN;
    max = window.data.MAX;
    setResultMinMax(min, max);
  }

  function getFunctionsForFilters(element) {
    window.catalog.cleanAllCards();
    resetAllFilters();
    resetCheckbox();
    element.checked = 'true';
    initSliderCoordinates();
    generateCountGoods();
  }

  function checkNutritionFacts(goodFact) {
    var isSugarFactActive = arrFilterSort.nutritionFacts.sugar === false;
    var isVegetarianFactActive = arrFilterSort.nutritionFacts.vegetarian === true;
    var isGlutenFactActive = arrFilterSort.nutritionFacts.gluten === false;
    var sugarCurrentActive = isSugarFactActive && !goodFact.sugar;
    var vegetarianCurrentActive = isVegetarianFactActive && goodFact.vegetarian;
    var glutenCurrentActive = isGlutenFactActive && !goodFact.gluten;
    return (
      (!isSugarFactActive || sugarCurrentActive) &&
      (!isVegetarianFactActive || vegetarianCurrentActive) &&
      (!isGlutenFactActive || glutenCurrentActive)
    );
  }

  function generateFilterKind(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'icecream':
            arrFilterSort.kinds.push('Мороженое');
            break;
          case 'soda':
            arrFilterSort.kinds.push('Газировка');
            break;
          case 'gum':
            arrFilterSort.kinds.push('Жевательная резинка');
            break;
          case 'marmalade':
            arrFilterSort.kinds.push('Мармелад');
            break;
          case 'marshmallows':
            arrFilterSort.kinds.push('Зефир');
            break;
        }
      } else {
        switch (evt.target.value) {
          case 'icecream':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Мороженое'), 1);
            break;
          case 'soda':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Газировка'), 1);
            break;
          case 'gum':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Жевательная резинка'), 1);
            break;
          case 'marmalade':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Мармелад'), 1);
            break;
          case 'marshmallows':
            arrFilterSort.kinds.splice(arrFilterSort.kinds.indexOf('Зефир'), 1);
            break;
        }
      }
      window.catalog.cleanAllCards();
      generateGoods();
    });
  }

  function generateFilterNutritionFacts(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'sugar-free':
            arrFilterSort.nutritionFacts.sugar = false;
            break;
          case 'vegetarian':
            arrFilterSort.nutritionFacts.vegetarian = true;
            break;
          case 'gluten-free':
            arrFilterSort.nutritionFacts.gluten = false;
            break;
        }
      } else {
        switch (evt.target.value) {
          case 'sugar-free':
            delete arrFilterSort.nutritionFacts.sugar;
            break;
          case 'vegetarian':
            delete arrFilterSort.nutritionFacts.vegetarian;
            break;
          case 'gluten-free':
            delete arrFilterSort.nutritionFacts.gluten;
            break;
        }
      }
      window.catalog.cleanAllCards();
      generateGoods();
    });
  }

  function setResultMinMax(minValue, maxValue) {
    priceMin.textContent = parseInt(minValue, 10);
    priceMax.textContent = parseInt(maxValue, 10);
  }

  function generateFilterPrice() {
    initSliderCoordinates();

    function addFilterPrice(minPrice, maxPrice) {
      arrFilterSort.prices[window.data.MIN_INDEX] = minPrice;
      arrFilterSort.prices[window.data.MAX_INDEX] = maxPrice;
    }

    setResultMinMax(min, max);

    // Координаты слайдера
    var sliderLineCoords = getCoords(sliderLine);

    rangeMin.addEventListener('mousedown', rangeMinMouseDownHandler);
    rangeMax.addEventListener('mousedown', rangeMaxMouseDownHandler);

    function rangeMinMouseDownHandler(evt) {
      // Выведем текущее координатное значение ползунка
      var elMinCoords = getCoords(rangeMin);
      // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
      var shiftX = evt.pageX - elMinCoords.left;
      document.addEventListener('mousemove', rangeMinMouseMoveHandler);

      function rangeMinMouseMoveHandler(e) {
        getLeftSliderCoords(e, shiftX);
      }

      document.addEventListener('mouseup', rangeMinMouseUpHandler);

      function rangeMinMouseUpHandler(event) {
        getLeftSliderCoords(event, shiftX);
        setResultMinMax(min, max);
        addFilterPrice(min, max);

        document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMinMouseUpHandler);

        generateGoods();
        generateCountGoods();
      }

      return false;
    }

    function getLeftSliderCoords(e, shiftX) {
      var newLeft = e.pageX - shiftX - sliderLineCoords.left;

      if (newLeft < window.data.MIN) {
        newLeft = window.data.MIN;
      }

      if (newLeft > max - rangeMin.offsetWidth / 2) {
        newLeft = max - rangeMin.offsetWidth / 2;
      }

      min = newLeft;
      rangeMin.style.left = newLeft + 'px';
      sliderFillLine.style.left = (newLeft + rangeMin.offsetWidth / 2) + 'px';
    }

    function rangeMaxMouseDownHandler(evt) {
      // Выведем текущее координатное значение ползунка
      var elMaxCoords = getCoords(rangeMax);
      // MouseEvent.pageX - возвращает значение равное горизонтальной координате, относительно всего документа
      var shiftX = evt.pageX - elMaxCoords.left;
      document.addEventListener('mousemove', rangeMaxMouseMoveHandler);

      function rangeMaxMouseMoveHandler(e) {
        getRightSliderCoords(e, shiftX);
      }

      document.addEventListener('mouseup', rangeMaxMouseUpHandler);

      function rangeMaxMouseUpHandler(event) {
        getRightSliderCoords(event, shiftX);
        setResultMinMax(min, max);
        addFilterPrice(min, max);

        document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
        document.removeEventListener('mouseup', rangeMaxMouseUpHandler);

        generateGoods();
        generateCountGoods();
      }

      return false;
    }

    function getRightSliderCoords(e, shiftX) {
      var newRight = e.pageX - shiftX - sliderLineCoords.left;

      if (newRight > window.data.MAX) {
        newRight = window.data.MAX;
      }

      if (newRight < min + rangeMin.offsetWidth / 2) {
        newRight = min + rangeMin.offsetWidth / 2;
      }

      max = newRight;
      rangeMax.style.left = newRight + 'px';
      sliderFillLine.style.right = window.data.ELEMENT_WIDTH - newRight + 'px';
    }

    function getCoords(elem) {
      var elCoords = elem.getBoundingClientRect();

      return {
        top: elCoords.top + pageYOffset,
        left: elCoords.left + pageXOffset,
      };
    }
  }

  // Функция - фильтрация "Избранное"
  function generateFilterFavorites(element) {
    element.addEventListener('click', function () {
      if (element.checked) {
        getFunctionsForFilters(element);
        if (!window.catalog.favorites.length) {
          var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
          var emptyFilter = blockEmptyFilter.cloneNode(true);
          window.catalog.cardLists.appendChild(emptyFilter);
        } else {
          window.catalog.renderCards(window.catalog.favorites);
        }
      } else {
        window.catalog.cleanAllCards();
        resetCheckbox();
        window.catalog.renderCards(arrFilters);
      }
    });
  }

  // Функция - товар в наличии
  function generateFilterInStocks(element) {
    element.addEventListener('click', function () {
      if (element.checked) {
        getFunctionsForFilters(element);
        var arrFilterInStocks = arrFilters.filter(function (it) {
          return it.amount !== 0;
        });
        window.catalog.renderCards(arrFilterInStocks);
      } else {
        window.catalog.cleanAllCards();
        resetCheckbox();
        window.catalog.renderCards(arrFilters);
      }
    });
  }

  // Функция создания события сортировки
  function generateSort(element) {
    element.addEventListener('click', function (evt) {
      if (element.checked) {
        switch (evt.target.value) {
          case 'popular':
            arrFilterSort.sort = 'Сначала популярные';
            break;
          case 'expensive':
            arrFilterSort.sort = 'Сначала дорогие';
            break;
          case 'cheep':
            arrFilterSort.sort = 'Сначала дешёвые';
            break;
          case 'rating':
            arrFilterSort.sort = 'По рейтингу';
            break;
        }
      } else {
        arrFilterSort.sort = '';
      }
      window.catalog.cleanAllCards();
      generateGoods();
    });
  }

  // Сортировка
  function sortElements(elements) {
    switch (arrFilterSort.sort) {
      case 'Сначала дорогие':
        elements.sort(function (first, second) {
          if (first.price < second.price) {
            return 1;
          } else if (first.price > second.price) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'Сначала дешёвые':
        elements.sort(function (first, second) {
          if (first.price > second.price) {
            return 1;
          } else if (first.price < second.price) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'По рейтингу':
        elements.sort(function (first, second) {
          if (first.rating.value > second.rating.value) {
            return -1;
          } else if (first.rating.value < second.rating.value) {
            return 1;
          } else if (first.rating.value === second.rating.value && first.rating.number > second.rating.number) {
            return -1;
          } else if (first.rating.value === second.rating.value && first.rating.number < second.rating.number) {
            return 1;
          }
          return 0;
        });
        break;
      case 'Сначала популярные':
        return elements;
    }
    return 0;
  }

  window.filter = {
    updateCatalog: updateCatalog,
    generateGoods: generateGoods,
    generateCountGoods: generateCountGoods
  };
})();
