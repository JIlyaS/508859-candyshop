'use strict';

(function () {
  // Константы - имя функции обратного вызова для получения JSONP
  // - URL, по которому получаем данные по JSON
  var CALLBACK_NAME = '__jsonpCallback';
  var DATA_URL = 'https://js.dump.academy/candyshop/data';
  var CANDYSHOP_URL = 'https://js.dump.academy/candyshop';

  // Функция обратного вызова, оборачиваем JSON данные с помощью JSONP
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        window[CALLBACK_NAME] = function (data) {
          onLoad(data);
        };
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', DATA_URL, true);

    xhr.send(null);
  };

  // Загрузка данных на сервер
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responceType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        onLoad();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', CANDYSHOP_URL, true);
    xhr.send(data);
  };

  window.backend = {
    CALLBACK_NAME: CALLBACK_NAME,
    DATA_URL: DATA_URL
  };
})();
