webpackJsonp([1],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(18);

__webpack_require__(19);

var _swiper = __webpack_require__(5);

var _swiper2 = _interopRequireDefault(_swiper);

var _seAppCommonFunctions = __webpack_require__(7);

var _seAppCommonFunctions2 = _interopRequireDefault(_seAppCommonFunctions);

__webpack_require__(21);

var _mainSlider = __webpack_require__(8);

var _simpleSlider = __webpack_require__(9);

var _homeProducts = __webpack_require__(10);

var _smartbanner = __webpack_require__(11);

var _smartbanner2 = _interopRequireDefault(_smartbanner);

var _Components = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = window.jQuery = __webpack_require__(1);


var mainSlider = new _swiper2.default('.main-slider .swiper-container', _mainSlider.sliderConfig);
var simpleSlider = new _swiper2.default('.simple-slider .swiper-container', _simpleSlider.simpleSliderConfig);
var homeProductsSlider = new _swiper2.default('.home-products .swiper-container', _homeProducts.homeProductsSliderConfig);

var videoContainerSelector = document.querySelector('.main-slider');
var subscribeBtn = document.querySelector('.js-subscribe-btn');
var closeModalBtn = document.querySelector('.js-close-popup');

// subscribeBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   modal.open();
// });
// closeModalBtn.addEventListener('click', () => {
//   modal.close();
// });

videoContainerSelector.addEventListener('click', function (e) {
  var target = e.target;
  if (target.classList.contains('video-button')) {
    var url = target.getAttribute('data-video-source-url');
    _Components.videoPlayer.appendVideoPlayer(url, this);
  }
  target.classList.contains('js-video-container__close-btn') && _Components.videoPlayer.closeVideoPlayer();
});

_seAppCommonFunctions2.default.showCookieMessage();

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace SVGtoLocalStorage
 * @description
 * On the very first load of the website this code reads the contents of a SVG file and inserts the data into the document,
 * puts the data into localStorage, on every following load it reads the data from localStorage and inserts the SVG data in the document.
 *
 * If localStorage is not supported, is disabled or overfilled, the script still reads the contents of a SVG file and inserts the data in the document.
 *
 * Source URL: https://osvaldas.info/caching-svg-sprite-in-localstorage
 */

/**
 * @memberOf SVGtoLocalStorage
 * @function
 * @name Immediately Invoked Function Expressions
 * @param {Object} window object represents the browser's window
 * @param {Object} document object represents loaded web page in the browser
 */

(function (window, document) {
  'use strict';

  /** Creates path to the SVG symbol spite depends on environment(INT,SQE,PRD or php prototype) */

  var fileURL = window.sdltfoRootUrl ? window.sdltfoRootUrl.replace(/\/$/, '') + '/assets-re1/svg/svg-symbols.svg' : '../svg-sprite/svg-symbols/svg-symbols.svg';

  /** Format date, dd mm yy without spaces, of last update for svg sprite symbol */
  var revision = '15032018';
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null;
  var request;
  var data;
  var insertIT = function insertIT() {
    document.body.insertAdjacentHTML('afterbegin', data);
  };
  var insert = function insert() {
    if (document.body) {
      insertIT();
    } else {
      document.addEventListener('DOMContentLoaded', insertIT);
    }
  };

  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
    return true;
  }

  /** Check if SVG sprite symbol in localStorage if yes insert it to the psge  */
  if (isLocalStorage && localStorage.getItem('inlineSVGRevision') === revision) {
    data = localStorage.getItem('inlineSVGSpriteData');
    if (data) {
      insert();
      return true;
    }
  }

  try {
    /**
     * A XHR request to retrieve file and put it into localStorage
     * @memberOf SVGtoLocalStorage
     * @function
     * @name XMLHttpRequest
     * @param {string} method 'GET'
     * @param {string} path to the SVG file
     * @param {boolean} async An optional boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously.
     * If this value is false, the send()method does not return until the response is received.
     */

    request = new XMLHttpRequest();
    request.open('GET', fileURL, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGSpriteData', data);
          localStorage.setItem('inlineSVGRevision', revision);
        }
      }
    };
    request.send();
  } catch (e) {
    console.error('ERROR in svg-localstorage.js : ' + e);
  }
})(window, document);

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var grabMarketoRequestParams = function grabMarketoRequestParams(form) {
  return [].concat(_toConsumableArray(form.find('input[type="hidden"]'))).reduce(function (acc, el) {
    acc[$(el).attr('name')] = $(el).attr('value');
    return acc;
  }, {});
};

var grabFooterFormParams = function grabFooterFormParams(form) {
  var formId = form.find('input[name="pageUri"]').val();
  var eMail = form.find('.footer-subscribe-field').val();
  var iAmDropdwon = form.find('.footer-subscribe-dropdown').val();

  return {
    "pageUri": formId,
    "responsys-settings": formId,
    "email": eMail,
    "MW_CUSTOMER_TYPE": iAmDropdwon
  };
};

$('.js-subscribe-btn').on('click', function (e) {
  e.preventDefault();
  var $form = $('.footer-subscribe-form');
  var responsysParams = grabFooterFormParams($form);
  var marketoParams = grabMarketoRequestParams($form);
  var formFullData = Object.assign(marketoParams, responsysParams);
  var websiteUrl = '//www-int1.schneider-electric.com/us/en/';
  var trimmedUrl = websiteUrl.replace(/\/+$/, "");
  var responsysPostUrl = trimmedUrl + '/sdltfosvc/responsys/submit.request';
  var marketoPostUrl = trimmedUrl + '/sdltfosvc/marketo/submit.request';

  $.post(responsysPostUrl, responsysParams).done(function (result) {
    console.log("responsys request post success");

    $.post(marketoPostUrl, Object.assign(responsysParams, formFullData), null).done(function (result1) {
      console.log("marketo request post success");
    }).fail(function (result1) {
      console.log("marketo request post failed : ");
      console.log(result1);
    });
  }).fail(function (result) {
    console.log("responsys request post failed : ");
    console.log(result);
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

$(function () {
  var $submenuToggler = $('.js-mm-item');
  var $categoryToggler = $('.js-mm-cat');

  $submenuToggler.on('click', function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains('mm-item__title')) {
      $(this).toggleClass('mm-item--expanded');
      $submenuToggler.hasClass('mm-item--expanded') ? $submenuToggler.not('.mm-item--expanded').hide() : $submenuToggler.show();
    }
  });

  $categoryToggler.on('click', function (e) {
    e.preventDefault();
    var target = e.target;
    var svgIconId = $(this).find('.mm-cat__title svg use');
    if (target.classList.contains('mm-cat__title')) {
      $(this).toggleClass('mm-cat--expanded');
      $(this).hasClass('mm-cat--expanded') ? svgIconId.attr('xlink:href', '#minus') : svgIconId.attr('xlink:href', '#plus');
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })

},[15]);
//# sourceMappingURL=index.js.map