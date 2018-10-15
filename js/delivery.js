'use strict';

(function () {
  var storeMapImg = document.querySelector('.deliver__store-map-img');
  window.order.deliverStore.addEventListener('click', deliverClickHandler);

  function deliverClickHandler(evt) {
    var mapName = window.data.DELIVERY_MAP_NAMES[evt.target.innerText];
    if (mapName) {
      storeMapImg.src = window.data.PATH_PICTURES + mapName + window.data.EXTENDS;
      storeMapImg.alt = window.data.DELIVERY_MAP_NAMES[evt.target.innerText];
    }
  }

})();
