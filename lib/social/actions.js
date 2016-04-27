'use strict';

exports.__esModule = true;
exports.signIn = signIn;

var _immutable = require('immutable');

var _index = require('../store/index');

var _actions = require('../lock/actions');

var _web_api = require('../lock/web_api');

var _web_api2 = _interopRequireDefault(_web_api);

var _index2 = require('../lock/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signIn(id, connection) {
  (0, _index.swap)(_index.updateEntity, "lock", id, l.setSubmitting, true);

  var lock = (0, _index.read)(_index.getEntity, "lock", id);

  var options = l.login.authParams(lock).merge((0, _immutable.Map)({
    connection: connection.name,
    popup: l.ui.popup(lock),
    popupOptions: l.ui.popupOptions(lock),
    redirect: !l.ui.popup(lock),
    responseType: l.login.responseType(lock),
    callbackURL: l.login.callbackURL(lock),
    forceJSONP: l.login.forceJSONP(lock)
  })).toJS();

  if (l.ui.popup(lock) && connection.strategy === "facebook") {
    options.display = "popup";
  }

  _web_api2.default.signIn(id, options, function (error) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (error) {
      setTimeout(function () {
        return signInError(id, error);
      }, 250);
    } else {
      signInSuccess.apply(undefined, [id].concat(args));
    }
  });
}

function signInSuccess(id) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  var autoclose = l.ui.autoclose(lock);

  if (!autoclose) {
    (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
      return l.setSignedIn(l.setSubmitting(lock, false), true);
    });
    l.invokeDoneCallback.apply(l, [lock, null].concat(args));
  } else {
    (0, _actions.closeLock)(id, false, function (lock) {
      return l.invokeDoneCallback.apply(l, [lock, null].concat(args));
    });
  }
}

function signInError(id, error) {
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  var errorMessage = l.ui.t(lock, ["error", "signIn", error.error], { __textOnly: true }) || l.ui.t(lock, ["error", "signIn", "lock.request"], { __textOnly: true });
  (0, _index.swap)(_index.updateEntity, "lock", id, l.setSubmitting, false, errorMessage);

  l.invokeDoneCallback(lock, error);
}
