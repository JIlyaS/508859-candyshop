'use strict';

(function () {
  // Массив с результатами фильтрации и сортировки
  var arrFilter;
  // Объект с сортировками
  var arrFilterSort = {
    kinds: [],
    nutritionFacts: {},
    prices: [],
    sorts: []
  };

  var catalogFilter = document.querySelector('.catalog__filter');
  var filterForIcecream = catalogFilter.querySelector('#filter-icecream');
  var filterSoda = catalogFilter.querySelector('#filter-soda');
  var filterGum = catalogFilter.querySelector('#filter-gum');
  var filterMarmalade = catalogFilter.querySelector('#filter-marmalade');
  var filterMarshmallows = catalogFilter.querySelector('#filter-marshmallows');

  var filterSugarFree = document.querySelector('#filter-sugar-free');
  var filterVegetarian = document.querySelector('#filter-vegetarian');
  var filterGlutenFree = document.querySelector('#filter-gluten-free');

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
  // Показать всё
  var showAll = document.querySelector('.catalog__submit');

  // Фильтры категорий товара
  function updateCatalog(goods) {

    arrFilter = goods.slice(0);

    generateFilterCount();
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
    generateFavorites();
    generateShowAll(showAll);
  }

  // Показать количество товара подходящими по фильтрацию
  function generateFilterCount() {
    var filterCountIcecream = document.querySelector('label[for="filter-icecream"] + .input-btn__item-count');
    var filterCountSoda = document.querySelector('label[for="filter-soda"] + .input-btn__item-count');
    var filterCountGum = document.querySelector('label[for="filter-gum"] + .input-btn__item-count');
    var filterCountMarmalade = document.querySelector('label[for="filter-marmalade"] + .input-btn__item-count');
    var filterCountMarshmallows = document.querySelector('label[for="filter-marshmallows"] + .input-btn__item-count');
    var filterCountSugarFree = document.querySelector('label[for="filter-sugar-free"] + .input-btn__item-count');
    var filterCountVegetarian = document.querySelector('label[for="filter-vegetarian"] + .input-btn__item-count');
    var filterCountGlutenFree = document.querySelector('label[for="filter-gluten-free"] + .input-btn__item-count');
    var filterCountPrice = document.querySelector('.range__price-count > .range__count');
    var countIcecream = 0;
    var countSoda = 0;
    var countGum = 0;
    var countMarmalade = 0;
    var countMarshmallows = 0;
    var countSugarFree = 0;
    var countVegetarian = 0;
    var countGlutenFree = 0;
    var countPrice = 0;

    for (var i = 0; i < arrFilter.length; i++) {
      if (arrFilter[i].kind === 'Мороженое') {
        countIcecream += 1;
      }
      if (arrFilter[i].kind === 'Газировка') {
        countSoda += 1;
      }
      if (arrFilter[i].kind === 'Жевательная резинка') {
        countGum += 1;
      }
      if (arrFilter[i].kind === 'Мармелад') {
        countMarmalade += 1;
      }
      if (arrFilter[i].kind === 'Зефир') {
        countMarshmallows += 1;
      }
      if (arrFilter[i].nutritionFacts.sugar === false) {
        countSugarFree += 1;
      }
      if (arrFilter[i].nutritionFacts.vegetarian === true) {
        countVegetarian += 1;
      }
      if (arrFilter[i].nutritionFacts.gluten === false) {
        countGlutenFree += 1;
      }
      if (arrFilterSort.prices.length !== 0) {
        if (arrFilter[i].price >= arrFilterSort.prices[window.data.MIN_INDEX] && arrFilter[i].price <= arrFilterSort.prices[window.data.MAX_INDEX]) {
          countPrice += 1;
        }
      } else {
        if (arrFilter[i].price >= window.data.MIN && arrFilter[i].price <= window.data.MAX) {
          countPrice += 1;
        }
      }
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
  }
  // Выводим товары по фильтрам
  function generateFilters() {
    window.catalog.cleanCatalog();
    var arrayFilterGoods = [];
    // Один раз проходим по массиву объектов продуктов
    arrFilter.forEach(function (it) {
      var emptyFilterKinds = arrFilterSort.kinds.length === 0;
      var noEmptyFilterKinds = !emptyFilterKinds && arrFilterSort.kinds.indexOf(it.kind) !== -1;

      var emptyFilterFacts = Object.keys(arrFilterSort.nutritionFacts).length === 0;
      var noEmptyFilterFacts = !emptyFilterFacts && checkNutritionFacts(it.nutritionFacts);

      var emptyFilterPrices = arrFilterSort.prices.length === 0;
      var noEmptyFilterPrices = !emptyFilterPrices && (it.price >= arrFilterSort.prices[window.data.MIN_INDEX] && it.price <= arrFilterSort.prices[window.data.MAX_INDEX]);

      var emptyFilterSort = arrFilterSort.sort.length === 0;
      var noEmptyFilterSort = !emptyFilterSort;

      if ((emptyFilterKinds || noEmptyFilterKinds) && (emptyFilterFacts || noEmptyFilterFacts) && (emptyFilterPrices || noEmptyFilterPrices)) {
        arrayFilterGoods.push(it);
      }
    });
    if (arrayFilterGoods.length === 0) {
      var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      var emptyFilter = blockEmptyFilter.cloneNode(true);
      window.catalog.catalogCards.appendChild(emptyFilter);
    }
    window.catalog.renderCatalog(arrayFilterGoods);
    console.log(arrayFilterGoods);
  }
  // Функция - показать всё
  function generateShowAll(element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.catalog.cleanCatalog();
      resetAllFilters();
      resetCheckbox();
      initSliderCoordinates();
      generateFilterCount();
      window.catalog.renderCatalog(arrFilter);
    });
  }
  // Очищаем все фильтры в объекте фильтров
  function resetAllFilters() {
    arrFilterSort.kinds = [];
    arrFilterSort.nutritionFacts = {};
    arrFilterSort.prices = [];
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

  function generateFavorites() {

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
      window.catalog.cleanCatalog();
      generateFilters();
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
      window.catalog.cleanCatalog();
      generateFilters();
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

    // Подсчёт минимального значения цены в массиве объектов
    // function arrayMinPrice() {
    //   return arrFilter.reduce(function (prevElement, currElement) {
    //     return (prevElement.price < currElement.price ? prevElement : currElement);
    //   });
    // }

    // Подсчёт минимального значения цены в массиве объектов
    // function arrayMaxPrice() {
    //   return arrFilter.reduce(function (prevElement, currElement) {
    //     return (prevElement.price > currElement.price ? prevElement : currElement);
    //   });
    // }

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

        generateFilters();
        generateFilterCount();
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

        generateFilters();
        generateFilterCount();
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

  window.filter = {
    updateCatalog: updateCatalog
  };
})();

// Фильтрация по категориям
// if (arrFilterSort.kind.length !== 0) {
//   arrFilterSort.kind.forEach(function (it) {
//     goods = arrFilter.filter(function (iter) {
//       return iter.kind === it;
//     });
//     goods.forEach(function (iteration) {
//       array.unshift(iteration);
//     });
//   });
//   window.catalog.renderCatalog(array);
// } else {
//   var blockEmptyFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
//   var emptyFilter = blockEmptyFilter.cloneNode(true);
//   window.catalog.catalogCards.appendChild(emptyFilter);
// }
// Фильтрация по составу
// if (Object.keys(arrFilterSort.nutritionFacts).length !== 0) {
//   Object.keys(arrFilterSort.nutritionFacts).forEach(function (it) {
//     goods = arrFilter.filter(function (iter) {
//       return iter.nutritionFacts[it] === arrFilterSort.nutritionFacts[it];
//     });
//     goods.forEach(function (iteration) {
//       array.unshift(iteration);
//     });
//   });
// }
