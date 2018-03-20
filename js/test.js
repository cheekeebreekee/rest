webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(36)['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(3);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(37);

var _decorators = __webpack_require__(45);

var _logger = __webpack_require__(47);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(33);

var _common = __webpack_require__(34);

var headTemplate = __webpack_require__(35);
var pageTemplate = __webpack_require__(54);

var jsonData = __webpack_require__(55);

(0, _common.createHTML)(headTemplate, jsonData, 'head');
(0, _common.createHTML)(pageTemplate, jsonData, 'body');

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _swiper = __webpack_require__(5);

var _swiper2 = _interopRequireDefault(_swiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(2);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<meta charset=\"UTF-8\">\r\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n<meta name=\"keywords\" content=\"\">\r\n<meta name=\"description\" content=\"\">\r\n<meta charset=\"utf-8\">\r\n"
    + ((stack1 = container.invokePartial(__webpack_require__(51),depth0,{"name":"../smartbanner/smartbanner.hbs","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(__webpack_require__(52),depth0,{"name":"../seo-meta-tags/og.hbs","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(__webpack_require__(53),depth0,{"name":"../seo-meta-tags/twitter.hbs","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<title>Single page country</title>\r\n";
},"usePartial":true,"useData":true});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _handlebarsBase = __webpack_require__(14);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(48);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(3);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(49);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(50);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(38);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(39);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(40);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(41);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(42);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(43);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(44);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(3);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(3);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(46);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function ret(context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(3);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(14);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(2);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<meta name=\"smartbanner:title\" content=\"mySchneider\">\r\n<meta name=\"smartbanner:author\" content=\"Schneider Electric SA\">\r\n<meta name=\"smartbanner:price\" content=\"Free\">\r\n<meta name=\"smartbanner:price-suffix-apple\" content=\" - On the App Store\">\r\n<meta name=\"smartbanner:price-suffix-google\" content=\" - Google Play\">\r\n<meta name=\"smartbanner:icon-apple\" content=\"//lh3.googleusercontent.com/BMxSlP5At_-wT4Na-tjusBNqLr1Er1TlCMMODziyge67kNPrl05Cy488kIjuXn1sxCA=w300-rw\">\r\n<meta name=\"smartbanner:icon-google\" content=\"//lh3.googleusercontent.com/BMxSlP5At_-wT4Na-tjusBNqLr1Er1TlCMMODziyge67kNPrl05Cy488kIjuXn1sxCA=w300-rw\">\r\n<meta name=\"smartbanner:button\" content=\"VIEW\">\r\n<meta name=\"smartbanner:button-url-apple\" content=\"http://m.onelink.me/e5bff3e5\">\r\n<meta name=\"smartbanner:button-url-google\" content=\"https://app.appsflyer.com/com.schneider.qrcode.tocase?pid=Web&amp;c=Smart_app_bannerUS\">\r\n<meta name=\"smartbanner:enabled-platforms\" content=\"android\">\r\n<meta name=\"apple-itunes-app\" content=\"app-id=714825126\">";
},"useData":true});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(2);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <meta property=\"og:"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" content=\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.htmlWebpackPlugin : depth0)) != null ? stack1.options : stack1)) != null ? stack1.page : stack1)) != null ? stack1.og : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(2);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <meta property=\"twitter:"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" content=\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.htmlWebpackPlugin : depth0)) != null ? stack1.options : stack1)) != null ? stack1.page : stack1)) != null ? stack1.twitter : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(2);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {"cookieMessage":{"paragraph":"This website uses cookies to store information on your computer. If you continue your browsing, we assume that you accept our use of cookies. Some are essential to make our site work others help us improve your user experience. Find out on how we use cookies and how to change your settings to refuse them by <a href'#'>clicking here</a>.","confirmationLink":"OK"},"twitter":[{"type":"card","content":"summary_large_image"},{"type":"site","content":"@SchneiderNA"},{"type":"title","content":"Global Specialist"},{"type":"description","content":"Global Specialist in Energy Management and Automation"},{"type":"image","content":"https://www.schneider-electric.us/en/Images/20131127-490x490.jpg"}],"og":[{"type":"title","content":"Global Specialist"},{"type":"type","content":"website"},{"type":"description","content":"Global Specialist in Energy Management and Automation"},{"type":"image","content":"https://www.schneider-electric.us/en/Images/20131127-490x490.jpg"},{"type":"url","content":"https://www.schneider-electric.us/en/"}],"tips":[{"heading":"EcoStruxure™","imageUrl":"https://www.schneider-electric.by/ru/Images/CUP0021758-490x280.jpg","description":"With Innovation At Every Level, we are redefining power and automation for a new world of energy.","ctaButton":{"text":"Learn how","url":"http://www.schneider-electric.ru/ru/work/solutions/"}},{"heading":"Investors","imageUrl":"https://www.schneider-electric.by/ru/Images/42-40950424-490x280.jpg","description":"We operate in over 100 countries with around 144,000 employees worldwide.","ctaButton":{"text":"Read more","url":"http://www.schneider-electric.ru/ru/home/house-electrical-products/"}},{"heading":"Careers","imageUrl":"https://www.schneider-electric.by/ru/Images/FAN2013876-490x280.jpg","description":"Discover opportunities that offer meaningful purpose and continual skills growth.","ctaButton":{"text":"Join us","url":"http://www.schneider-electric.ru/ru/home/how-to-contact-schneider-electric/"}}],"homeProducts":{"heading":"Featured products","ctaLink":{"text":"See all products","url":"https://www.schneider-electric.us/en/all-products"},"sliderItems":[{"linkUrl":"http://www.schneider-electric.us/en/work/solutions/system/s4/data-center-and-networks-hyperpod/","imageUrl":"http://www.schneider-electric.us/en/Images/Pod_v17-IC-566x566.jpg","name":"Hyperpod Containment System"},{"linkUrl":"http://www.schneider-electric.us/en/product-range/62187-mvp-nq-panelboards?parent-subcategory-id=51060","imageUrl":"http://www.schneider-electric.us/en/product-image/240706-mvp-nq-panelboards?width=100&height=100","name":"MVP NQ Panelboards"},{"linkUrl":"http://www.schneider-electric.us/en/work/solutions/system/s4/data-center-and-networks-hyperpod/","imageUrl":"http://www.schneider-electric.us/en/product-image/219500-qo--load-centers?width=100&height=100","name":"QO™ Load Centers"},{"linkUrl":"http://www.schneider-electric.us/en/product-subcategory/53130-heavy-duty-safety-switches/?filter=business-4-low-voltage-products-and-systems&parent-category-id=53100","imageUrl":"http://www.schneider-electric.us/en/product-image/229661-heavy-duty-safety-switches?width=100&height=100","name":"Heavy Duty Safety Switcher"},{"linkUrl":"http://www.schneider-electric.us/en/product-subcategory/50070-soft-starters/?filter=business-1-industrial-automation-and-control&parent-category-id=50000","imageUrl":"http://www.schneider-electric.us/en/product-image/230454-soft-starters?width=100&height=100","name":"Soft Starters"},{"linkUrl":"http://www.schneider-electric.us/en/work/solutions/system/s4/data-center-and-networks-hyperpod/","imageUrl":"http://www.schneider-electric.us/en/Images/Pod_v17-IC-566x566.jpg","name":"Hyperpod Containment System"},{"linkUrl":"http://www.schneider-electric.us/en/product-range/7278-industrial-control-transformers--machine-tool-?parent-subcategory-id=53710","imageUrl":"http://www.schneider-electric.us/en/product-image/225569-industrial-control-transformers--machine-tool-?width=100&height=100","name":"Industrial Control Transformator"},{"linkUrl":"http://www.schneider-electric.us/en/product-subcategory/50330-molded-case-circuit-breakers/?filter=business-4-low-voltage-products-and-systems&parent-category-id=50300","imageUrl":"http://www.schneider-electric.us/en/product-image/216586-molded-case-circuit-breakers?width=100&height=100","name":"Molded Case Circuit Breaker"}]},"footerBottomBar":{"footerLinkText":{"text":"©2017, Schneider Electric","url":"http://www.schneider-electric.com/en/about-us/legal/legal-information.jsp"},"navigationLinks":[{"text":"Privacy and Cookies Policy ","url":"http://www.schneider-electric.com/en/about-us/legal/data-privacy.jsp"},{"text":"Legal","url":"http://www.schneider-electric.com/en/about-us/legal/legal-information.jsp"},{"text":"Copyright Notice","url":"http://www.schneider-electric.com/en/about-us/legal/legal-information.jsp"}]},"footerLogo":{"imageUrl":"../../svg-sprite/sprite/logo-schneider.svg","linkUrl":"www.schneider-electric.by/en/Images/LIO_SE_footer.png"},"footerSubscribe":{"heading":{"uppercaseText":"sign up for email - ","normalText":"Learn about best practices, new solutions and offers."}},"tipsVertical":[{"heading":"Be aware","imageUrl":"https://www.schneider-electric.by/en/Images/alert-icon-490x280.jpg","description":"Be aware, not all products and services are available in Belarus","ctaButton":{"text":"See product list","url":"http://www.schneider-electric.ru/ru/all-products"}},{"heading":"Associated Brand APC","imageUrl":"https://www.schneider-electric.by/en/Images/pick-APC-490x280.jpg","description":"Visit our website and learn more today.","ctaButton":{"text":"Learn more","url":"http://www.apc.com/by/ru/"}},{"linksOnly":true,"heading":"Quicklinks","links":[{"text":"About the company","url":"http://www.schneider-electric.ru/ru/about-us/company-profile.jsp"},{"text":"Products & Services","url":"http://www.schneider-electric.ru/ru/all-products"},{"text":"Redundant power and cooling systems","url":"http://www.schneider-electric.ru/sites/russia/ru/products-services/critical-power-cooling-services/critical-power-cooling-services.page"},{"text":"Russian SE Site","url":"http://www.schneider-electric.com/ww/en/"},{"text":"Global Site","url":"http://www.schneider-electric.com/ww/en/"},{"text":"Green Premium","url":"http://www.schneider-electric.ru/sites/russia/ru/products-services/green-premium/green-premium.page"}]},{"heading":"Associated Brand Pelco","imageUrl":"https://www.schneider-electric.by/ru/Images/FAN2013876-490x280.jpg","description":"Visit our website and learn more today.","ctaButton":{"text":"Learn more","url":"http://www.pelco.com/"}}],"simpleSlider":[{"heading":"Creating an Efficient Campus","description":"Maximize energy efficiency and security with an integrated university infrastructure.","ctaLink":{"text":"Learn more","url":"http://www.schneider-electric.com/us/en/download/document/WP-EDU-EFFICIENTCAMPUS-US.BU.N.EN.6.2011.0.01.CC"},"imageUrl":"http://www-int1.schneider-electric.com/us/en/Images/42-50142286-980x490.jpg"},{"heading":"Create a sustainable, high-performance university campus","descritpion":null,"ctaLink":{"text":"Learn more","url":"http://www.schneider-electric.com/us/en/download/document/998-1234557_US"},"imageUrl":"http://www-int1.schneider-electric.com/us/en/Images/238536373-980x490.jpg"},{"heading":"Predictive Maintenance Strategy for Building Operations: A Better Approach","descritpion":null,"ctaLink":{"text":"Learn more","url":"http://www.schneider-electric.com/us/en/download/document/998-2095-09-26-14AR0"},"imageUrl":"http://www-int1.schneider-electric.com/us/en/Images/LSR_005-980x490.jpg"}],"megaMenu":[{"title":"Products","mainLink":"See all products","categories":[{"name":"Residental and Small Business","links":["Electrical Protection and Control","Light Switches and Electrical Sockets","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"},{"name":"Building Automation and Control","links":["Building Management","Power Monitoring and Control","Power Quality and Power Factor Correction"],"lastLink":"Learn more"},{"name":"Solar and Energy Storage","links":["Commercial and Industrial","Solar for Residential","Solar Off-Grid and Back-Up"],"lastLink":"Learn more"},{"name":"Low Voltage Products and Systems","links":["Circuit Breakers and Switches","Motor Starters and Protection Components","Pushbuttons, Switches, Pilot Lights and Joysticks"],"lastLink":"Learn more"},{"name":"Medium Voltage Distribution and Grid Automation","links":["Medium-Voltage/Low-Voltage Prefabriated Substations","Protection Relays by Application","Protection Relays by Range"],"lastLink":"Learn more"},{"name":"Access to Energy","links":["Collective Solutions","Home Systems"],"lastLink":"Learn more"},{"name":"Industrial Automation and Control","links":["Interface, Measurement and Control Relays","Motor Starters and Protection Components","Variable Speed Drives and Soft Starters"],"lastLink":"Learn more"},{"name":"Critical Power, Cooling and Racks","links":["Critical Power and Cooling Services","Security and Environmental Monitoring","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"}]},{"title":"Solutions","mainLink":"See all solutions","categories":[{"name":"EcoStruxure: Innovation ar Every Level","links":["Building","IT","Grid"],"lastLink":"Learn more"},{"name":"For Your Home","links":["Electrical Safety","Style","Comfort"],"lastLink":"Learn more"},{"name":"EcoStruxure for Your Businesses","links":["Banking & Finance","Cloud & Service Providers","Data Center & Network"],"lastLink":"Learn more"},{"name":"Solar & Energy Storage"},{"name":"Microgrids"},{"name":"EcoStruxure for Partners","links":["Consultants, Designers & Engineers","Contractors","Distributors"],"lastLink":"Learn more"},{"name":"Access to Energy"},{"name":"Cybersecurity"}]},{"title":"Services","mainLink":"See all services","categories":[{"name":"Residental and Small Business","links":["Electrical Protection and Control","Light Switches and Electrical Sockets","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"},{"name":"Building Automation and Control","links":["Building Management","Power Monitoring and Control","Power Quality and Power Factor Correction"],"lastLink":"Learn more"},{"name":"Solar and Energy Storage","links":["Commercial and Industrial","Solar for Residential","Solar Off-Grid and Back-Up"],"lastLink":"Learn more"},{"name":"Low Voltage Products and Systems","links":["Circuit Breakers and Switches","Motor Starters and Protection Components","Pushbuttons, Switches, Pilot Lights and Joysticks"],"lastLink":"Learn more"},{"name":"Medium Voltage Distribution and Grid Automation","links":["Medium-Voltage/Low-Voltage Prefabriated Substations","Protection Relays by Application","Protection Relays by Range"],"lastLink":"Learn more"},{"name":"Access to Energy","links":["Collective Solutions","Home Systems"],"lastLink":"Learn more"},{"name":"Industrial Automation and Control","links":["Interface, Measurement and Control Relays","Motor Starters and Protection Components","Variable Speed Drives and Soft Starters"],"lastLink":"Learn more"},{"name":"Critical Power, Cooling and Racks","links":["Critical Power and Cooling Services","Security and Environmental Monitoring","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"}]},{"title":"Support","mainLink":"See all support","categories":[{"name":"EcoStruxure: Innovation ar Every Level","links":["Building","IT","Grid"],"lastLink":"Learn more"},{"name":"For Your Home","links":["Electrical Safety","Style","Comfort"],"lastLink":"Learn more"},{"name":"EcoStruxure for Your Businesses","links":["Banking & Finance","Cloud & Service Providers","Data Center & Network"],"lastLink":"Learn more"},{"name":"Solar & Energy Storage"},{"name":"Microgrids"},{"name":"EcoStruxure for Partners","links":["Consultants, Designers & Engineers","Contractors","Distributors"],"lastLink":"Learn more"},{"name":"Access to Energy"},{"name":"Cybersecurity"}]},{"title":"About us","mainLink":"About us","categories":[{"name":"Residental and Small Business","links":["Electrical Protection and Control","Light Switches and Electrical Sockets","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"},{"name":"Building Automation and Control","links":["Building Management","Power Monitoring and Control","Power Quality and Power Factor Correction"],"lastLink":"Learn more"},{"name":"Solar and Energy Storage","links":["Commercial and Industrial","Solar for Residential","Solar Off-Grid and Back-Up"],"lastLink":"Learn more"},{"name":"Low Voltage Products and Systems","links":["Circuit Breakers and Switches","Motor Starters and Protection Components","Pushbuttons, Switches, Pilot Lights and Joysticks"],"lastLink":"Learn more"},{"name":"Medium Voltage Distribution and Grid Automation","links":["Medium-Voltage/Low-Voltage Prefabriated Substations","Protection Relays by Application","Protection Relays by Range"],"lastLink":"Learn more"},{"name":"Access to Energy","links":["Collective Solutions","Home Systems"],"lastLink":"Learn more"},{"name":"Industrial Automation and Control","links":["Interface, Measurement and Control Relays","Motor Starters and Protection Components","Variable Speed Drives and Soft Starters"],"lastLink":"Learn more"},{"name":"Critical Power, Cooling and Racks","links":["Critical Power and Cooling Services","Security and Environmental Monitoring","Uninterruptible Power Supply (UPS)"],"lastLink":"Learn more"}]}],"metabarLinks":[{"name":"My Favorites","icon":{"id":"star-filled","width":"19","height":"18"}},{"name":"My Documents","icon":{"id":"docs-inline","width":"13","height":"17"}},{"name":"Partner Login","icon":{"id":"partner-inline","width":"16","height":"18"}}],"footerLinks":[{"heading":"about us","linksArr":[{"text":"Company Profile","url":"#"},{"text":"Careers","url":"#"},{"text":"Investors","url":"#"},{"text":"Share price","url":"#"},{"text":"Press","url":"#"},{"text":"Sustainability","url":"#"},{"text":"Diversity","url":"#"},{"text":"Events","url":"#"}]},{"heading":"support","linksArr":[{"text":"Customer Care","url":"#"},{"text":"Documents and Downloads","url":"#"},{"text":"FAQs","url":"#"},{"text":"Green Premium Eco label","url":"#"},{"text":"Training","url":"#"},{"text":"Energy University","url":"#"}]},{"heading":"contact us","linksArr":[{"text":"Worldwide","url":"#"},{"text":"Sales","url":"#"},{"text":"Job search","url":"#"},{"text":"Investors","url":"#"},{"text":"Shareholders","url":"#"},{"text":"Press","url":"#"},{"text":"Other Contacts","url":"#"},{"text":"Blog","url":"#"}]}],"countrySelect":{"heading":"Welcome to the Schneider Electric Global website","isRedirected":true,"description":{"common":{"subheading":"Please choose your country or region to view available products.","mainActionButton":"Choose your country","additionalActionButton":"> Stay on the Global site"},"redirected":{"subheading":"You can choose another country to view available products or go to our <a href=\"#\">Global website</a> for company information.","mainActionButton":"Choose your country","additionalActionButton":"Stay on the Global Site"}}},"metabar":{"start":[{}],"end":[{"countrySelect":true,"country":{"code":"BY","language":"EN","name":"Belarus","title":"Website"}}]},"newsLetter":{"title":"Thank you! You will start receiving updates from Schneider Electric.","body":"Your welcome message is on its way! Check your inbox soon to learn what you can expect in the coming weeks."},"sliderItems":[{"image":{"mobile":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","tablet":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","desktop":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg"},"content":{"heading":"DIGITAL movie magic","description":"Creating award-winning effects outside of Hollywood is a bold idea. Schneider installed a ready-made data center in less than five months for Animal Logic and now they make DIGITAL movie magic with Schneider EcoStruxure™ IT.","videoButton":{"text":"Watch now","url":"https://www.youtube.com/embed/dQw4w9WgXcQ"},"ctaButton":{"text":"Discover EcoStruxure","url":"https://www.schneider-electric.com/b2b/en/campaign/innovation/datacenters.jsp"}}},{"image":{"mobile":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","tablet":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","desktop":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg"},"content":{"heading":"DIGITAL movie magic","description":"Creating award-winning effects outside of Hollywood is a bold idea. Schneider installed a ready-made data center in less than five months for Animal Logic and now they make DIGITAL movie magic with Schneider EcoStruxure™ IT.","videoButton":{"text":"Discover EcoStruxure","url":"85bXExZTE61Gfz5zXp6zIaf55CxoiwH5"}}},{"image":{"mobile":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","tablet":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","desktop":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg"},"content":{"heading":"DIGITAL movie magic","description":"Creating award-winning effects outside of Hollywood is a bold idea. Schneider installed a ready-made data center in less than five months for Animal Logic and now they make DIGITAL movie magic with Schneider EcoStruxure™ IT.","videoButton":{"text":"Discover EcoStruxure","url":"dsbjMzZTE68LYrERycwjzMFQrkooIJa5"}}},{"image":{"mobile":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","tablet":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","desktop":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg"},"content":{"heading":"We drive INNOVATION","description":"And we do it at every level with EcoStruxure™. Discover how Schneider Electric makes bold ideas happen with an INNOVATION portfolio of IoT-enabled, connected products, edge control, and apps, analytics, and services.","ctaButton":{"text":"Discover EcoStruxure","url":"http://player.youku.com/embed/XMjcyMDc5OTcyMA=="}}},{"image":{"mobile":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","tablet":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg","desktop":"https://www.schneider-electric.com/ww/en/Images/843864400-DIGITAL-IC-2560x600.jpg"},"content":{"heading":"CONNECTED rain or shine","description":"Keeping 4000 students CONNECTED to a world-class education, whatever the weather, is a bold ambition. With Schneider EcoStruxure™ IT, the Bainbridge Island School District ensures connectivity in its schools so students stay learning, rain or shine.","ctaButton":{"text":"Discover EcoStruxure","url":"https://www.schneider-electric.com/b2b/en/campaign/innovation/datacenters.jsp"}},"videoUrl":"https://www.youtube.com/embed/-Hc2gse-eWg?"}],"footerDropdownItems":[{"value":"","text":"I am a..."},{"value":"Architect, Designer or Engineer","text":"Architect, Designer or Engineer"},{"value":"Business Reseller","text":"Business Reseller"},{"value":"Consumer/Personal Use","text":"Consumer/Personal Use"},{"value":"Contractor","text":"Contractor"},{"value":"Educational Institution","text":"Educational Institution"},{"value":"Electrician","text":"Electrician"},{"value":"Government Agency","text":"Government Agency"},{"value":"Home Office User","text":"Home Office User"},{"value":"Job Seeker/Student","text":"Job Seeker/Student"},{"value":"Large Corporation User","text":"Large Corporation User"},{"value":"Original Equipment Manufacturer","text":"Original Equipment Manufacturer"},{"value":"Panel Builder","text":"Panel Builder"},{"value":"Retailer","text":"Retailer"},{"value":"Service Provider","text":"Service Provider"},{"value":"Small to Medium Business User","text":"Small to Medium Business User"},{"value":"System Integrator","text":"System Integrator"},{"value":"Wholesale Distributor","text":"Wholesale Distributor"}],"externalScripts":[{"src":"//player.ooyala.com/core/1e086a1e733249a6b5dde0040044e06d"}]}

/***/ })
],[32]);
//# sourceMappingURL=test.js.map