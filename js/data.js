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

  window.data = {
    RATING_ARRAY: RATING_ARRAY,
    CATALOG_LENGTH_GOODS: CATALOG_LENGTH_GOODS,
    MIN: MIN,
    MAX: MAX,
    ELEMENT_WIDTH: ELEMENT_WIDTH,
    MIN_INDEX: MIN_INDEX,
    MAX_INDEX: MAX_INDEX
  };

})();
