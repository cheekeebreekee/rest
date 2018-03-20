webpackJsonp([2],{

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(57);

var _swiper = __webpack_require__(5);

var _swiper2 = _interopRequireDefault(_swiper);

var _seAppCommonFunctions = __webpack_require__(7);

var _seAppCommonFunctions2 = _interopRequireDefault(_seAppCommonFunctions);

var _mainSlider = __webpack_require__(8);

var _simpleSlider = __webpack_require__(9);

var _homeProducts = __webpack_require__(10);

var _smartbanner = __webpack_require__(11);

var _smartbanner2 = _interopRequireDefault(_smartbanner);

var _Components = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainSlider = new _swiper2.default('.main-slider .swiper-container', _mainSlider.sliderConfig);
//import { createHTML } from './../../components/common.js';

var simpleSlider = new _swiper2.default('.simple-slider .swiper-container', _simpleSlider.simpleSliderConfig);
var homeProductsSlider = new _swiper2.default('.home-products .swiper-container', _homeProducts.homeProductsSliderConfig);

var videoContainerSelector = document.querySelector('.main-slider');
var subscribeBtn = document.querySelector('.js-subscribe-btn');
var closeModalBtn = document.querySelector('.js-close-popup');

subscribeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  _Components.modal.open();
});
closeModalBtn.addEventListener('click', function () {
  _Components.modal.close();
});

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

/***/ 57:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[56]);
//# sourceMappingURL=typography.js.map