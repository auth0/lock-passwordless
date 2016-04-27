'use strict';

exports.__esModule = true;
exports.requestPasswordlessEmail = requestPasswordlessEmail;
exports.requestPasswordlessEmailSuccess = requestPasswordlessEmailSuccess;
exports.requestPasswordlessEmailError = requestPasswordlessEmailError;
exports.sendSMS = sendSMS;
exports.sendSMSSuccess = sendSMSSuccess;
exports.sendSMSError = sendSMSError;
exports.resendEmail = resendEmail;
exports.resendEmailSuccess = resendEmailSuccess;
exports.resendEmailError = resendEmailError;
exports.signIn = signIn;
exports.reset = reset;
exports.back = back;

var _immutable = require('immutable');

var _index = require('../store/index');

var _actions = require('../lock/actions');

var _web_api = require('../lock/web_api');

var _web_api2 = _interopRequireDefault(_web_api);

var _index2 = require('../cred/index');

var c = _interopRequireWildcard(_index2);

var _storage = require('../cred/storage');

var cs = _interopRequireWildcard(_storage);

var _index3 = require('../lock/index');

var l = _interopRequireWildcard(_index3);

var _index4 = require('./index');

var m = _interopRequireWildcard(_index4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requestPasswordlessEmail(id) {
  // TODO: abstract this submit thing.
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    if (c.validEmail(lock)) {
      return l.setSubmitting(lock, true);
    } else {
      return c.setShowInvalidEmail(lock);
    }
  });

  var lock = (0, _index.read)(_index.getEntity, "lock", id);

  if (l.submitting(lock)) {
    var isMagicLink = m.send(lock) === "link";
    var options = {
      authParams: isMagicLink ? l.login.authParams(lock).toJS() : {},
      callbackURL: l.login.callbackURL(lock),
      forceJSONP: l.login.forceJSONP(lock),
      email: c.email(lock),
      send: m.send(lock),
      responseType: l.login.responseType(lock)
    };

    _web_api2.default.startPasswordless(id, options, function (error) {
      if (error) {
        setTimeout(function () {
          return requestPasswordlessEmailError(id, error);
        }, 250);
      } else {
        requestPasswordlessEmailSuccess(id);
      }
    });
  }
}

function requestPasswordlessEmailSuccess(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    return m.setPasswordlessStarted(l.setSubmitting(lock, false), true);
  });
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  cs.store(lock, "email", l.modeName(lock));
  if (m.send(lock) === "link") {
    l.invokeDoneCallback(lock, null, c.email(lock));
  }
}

function requestPasswordlessEmailError(id, error) {
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  var errorMessage = l.ui.t(lock, ["error", "passwordless", error.error], { medium: "email", __textOnly: true }) || l.ui.t(lock, ["error", "passwordless", "lock.request"], { medium: "email", __textOnly: true });
  (0, _index.swap)(_index.updateEntity, "lock", id, l.setSubmitting, false, errorMessage);
  if (m.send(lock) === "link") {
    l.invokeDoneCallback(lock, error);
  }
}

function sendSMS(id) {
  // TODO: abstract this submit thing.
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {

    if (c.validPhoneNumber(lock)) {
      return l.setSubmitting(lock, true);
    } else {
      return c.setShowInvalidPhoneNumber(lock, true);
    }
  });

  var lock = (0, _index.read)(_index.getEntity, "lock", id);

  if (l.submitting(lock)) {
    var options = { phoneNumber: c.fullPhoneNumber(lock) };
    _web_api2.default.startPasswordless(id, options, function (error) {
      if (error) {
        setTimeout(function () {
          return sendSMSError(id, error);
        }, 250);
      } else {
        sendSMSSuccess(id);
      }
    });
  }
}

function sendSMSSuccess(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    lock = l.setSubmitting(lock, false);
    lock = m.setPasswordlessStarted(lock, true);
    return lock;
  });

  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  cs.store(lock, "phoneNumber", l.modeName(lock));
}

function sendSMSError(id, error) {
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  var errorMessage = void 0;
  if (error.error === "sms_provider_error" && (error.description || "").indexOf("(Code: 21211)") > -1) {
    errorMessage = l.ui.t(lock, ["error", "passwordless", "sms_provider_error.bad_phone_number"], { phoneNumber: c.fullPhoneNumber(lock), __textOnly: true });
  } else {
    errorMessage = l.ui.t(lock, ["error", "passwordless", error.error], { medium: "SMS", __textOnly: true }) || l.ui.t(lock, ["error", "passwordless", "lock.request"], { medium: "SMS", __textOnly: true });
  }

  (0, _index.swap)(_index.updateEntity, "lock", id, l.setSubmitting, false, errorMessage);
}

function resendEmail(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, m.resend);

  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  var options = {
    authParams: m.send(lock) === "link" ? l.login.authParams(lock).toJS() : {},
    email: c.email(lock),
    send: m.send(lock),
    responseType: l.login.responseType(lock),
    callbackURL: l.login.callbackURL(lock),
    forceJSONP: l.login.forceJSONP(lock)
  };
  _web_api2.default.startPasswordless(id, options, function (error) {
    if (error) {
      resendEmailError(id, error);
    } else {
      resendEmailSuccess(id);
    }
  });
}

function resendEmailSuccess(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, m.setResendSuccess);
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  l.invokeDoneCallback(lock, null, c.email(lock));
}

function resendEmailError(id, error) {
  (0, _index.swap)(_index.updateEntity, "lock", id, m.setResendFailed);
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  l.invokeDoneCallback(lock, error);
}

function signIn(id) {
  // TODO: abstract this submit thing
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    if (c.validVcode(lock)) {
      return l.setSubmitting(lock, true);
    } else {
      return c.setShowInvalidVcode(lock);
    }
  });

  var lock = (0, _index.read)(_index.getEntity, "lock", id);

  if (l.submitting(lock)) {
    var options = {
      passcode: c.vcode(lock),
      redirect: l.shouldRedirect(lock),
      responseType: l.login.responseType(lock),
      callbackURL: l.login.callbackURL(lock),
      forceJSONP: l.login.forceJSONP(lock)
    };

    if (m.send(lock) === "sms") {
      options.phoneNumber = c.fullPhoneNumber(lock);
    } else {
      options.email = c.email(lock);
    }

    _web_api2.default.signIn(id, (0, _immutable.Map)(options).merge(l.login.authParams(lock)).toJS(), function (error) {
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
  var cred = m.send(lock) === "sms" ? "phone number" : "email";
  var errorMessage = l.ui.t(lock, ["error", "signIn", error.error], { cred: cred, __textOnly: true }) || l.ui.t(lock, ["error", "signIn", "lock.request"], { cred: cred, __textOnly: true });
  (0, _index.swap)(_index.updateEntity, "lock", id, l.setSubmitting, false, errorMessage);

  l.invokeDoneCallback(lock, error);
}

function reset(id) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  (0, _index.swap)(_index.updateEntity, "lock", id, m.reset, opts);
}

function back(id) {
  var resetOpts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  reset(id, resetOpts);
}
