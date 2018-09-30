'use strict';

(function () {
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

  function getResultMinMax(minValue, maxValue) {
    priceMin.textContent = parseInt(minValue, 10);
    priceMax.textContent = parseInt(maxValue, 10);
  }

  getResultMinMax(min, max);

  // sliderFillLine.style.left = sliderFillLine.offsetLeft + rangeMin.offsetWidth / 2 + 'px';
  // sliderFillLine.style.right = (ELEMENT_WIDTH + sliderFillLine.offsetWidth - rangeMax.offsetWidth / 2) + 'px';

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
      getResultMinMax(min, max);

      document.removeEventListener('mousemove', rangeMinMouseMoveHandler);
      document.removeEventListener('mouseup', rangeMinMouseUpHandler);
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
      getResultMinMax(min, max);

      document.removeEventListener('mousemove', rangeMaxMouseMoveHandler);
      document.removeEventListener('mouseup', rangeMaxMouseUpHandler);
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
})();
