'use strict';

exports.__esModule = true;
exports.Mode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _index = require('../store/index');

var _actions = require('../lock/actions');

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mode = exports.Mode = function () {
  function Mode(name) {
    _classCallCheck(this, Mode);

    this.name = name;
  }

  Mode.prototype.open = function open(id) {
    var name = this.name;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _openFunctionArgsReso = openFunctionArgsResolver(name, args);

    var options = _openFunctionArgsReso[0];
    var callback = _openFunctionArgsReso[1];


    warnScopeOpenidProfile(options);
    options.signInCallback = callback;
    options.mode = {};

    this.id = id;
    this.options = options; // TODO: should clone
    var model = (0, _index.read)(_index.getEntity, "lock", id);

    this.willOpen(model, options);

    var result = (0, _actions.openLock)(id, name, this.options);

    delete this.id;
    delete this.options;

    return result;
  };

  // render must be implemented in each mode

  Mode.prototype.close = function close(id, force) {
    (0, _actions.closeLock)(id, force);
  };

  Mode.prototype.setModel = function setModel(m) {
    // TODO: unnecessary swap, should pass along the model
    (0, _index.swap)(_index.setEntity, "lock", this.id, m);
  };

  Mode.prototype.setOptions = function setOptions(options) {
    this.options = options; // TODO: should clone
  };

  return Mode;
}();

function openFunctionArgsResolver(fnName, args) {
  var defaultOptions = {};
  var defaultCallback = function defaultCallback() {};

  if (args.length == 0) {
    return [defaultOptions, defaultCallback];
  }

  if (args.length == 1) {
    if (_typeof(args[0]) == "object") {
      return [args[0], defaultCallback];
    } else if (typeof args[0] == "function") {
      return [defaultOptions, args[0]];
    } else {
      throw new Error("When `" + fnName + "` is called with one argument, it must be an `options` object or a `callback` function.");
    }
  }

  if (args.length == 2) {
    if (_typeof(args[0]) != "object") {
      throw new Error("When `" + fnName + "` is called with two arguments, an `options` object must be provided as the first argument.");
    }
    if (typeof args[1] != "function") {
      throw new Error("When `" + fnName + "` is called with two arguments, a `callback` function must be provided as the second argument.");
    }
    return args;
  }

  throw new Error("`" + fnName + "` must be called with two arguments at most.");
}

function warnScopeOpenidProfile(options) {
  // TODO: abstract warning output (should receive a message and emit the
  // warning unless they are disabled).
  var authParams = options.authParams;
  var disableWarnings = options.disableWarnings;

  if (authParams && (typeof authParams === 'undefined' ? 'undefined' : _typeof(authParams)) === "object" && (0, _trim2.default)(authParams.scope || "") === "openid profile" && !disableWarnings && console && console.warn) {
    console.warn("Usage of scope 'openid profile' is not recommended. See https://auth0.com/docs/scopes for more details.");
  }
}
