'use strict';

exports.__esModule = true;
exports.setResendSuccess = setResendSuccess;
exports.resendSuccess = resendSuccess;
exports.setResendFailed = setResendFailed;
exports.resendFailed = resendFailed;
exports.resendOngoing = resendOngoing;
exports.resend = resend;
exports.resendAvailable = resendAvailable;
exports.reset = reset;
exports.send = send;
exports.isSendLink = isSendLink;
exports.setPasswordlessStarted = setPasswordlessStarted;
exports.passwordlessStarted = passwordlessStarted;

var _immutable = require('immutable');

var _index = require('../lock/index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setResendStatus(m, value) {
  // TODO: check value
  return m.set("resendStatus", value);
}

function setResendSuccess(m) {
  return setResendStatus(m, "success");
}

function resendSuccess(m) {
  return resendStatus(m) == "success";
}

function setResendFailed(m) {
  return setResendStatus(m, "failed");
}

function resendFailed(m) {
  return resendStatus(m) == "failed";
}

function resendOngoing(m) {
  return resendStatus(m) == "ongoing";
}

function resend(m) {
  if (resendAvailable(m)) {
    return setResendStatus(m, "ongoing");
  } else {
    return m;
  }
}

function resendStatus(m) {
  return m.get("resendStatus", "waiting");
}

function resendAvailable(m) {
  return resendStatus(m) == "waiting" || resendStatus(m) == "failed";
}

function reset(m) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var keyPaths = (0, _immutable.List)([["passwordlessStarted"], ["resendStatus"], ["selectingLocation"], ["signedIn"]]);

  // TODO `signedIn` should be handled at the lock level, later instead of
  // calling l.clearGlobalError we should call something like l.reset.

  var clearCred = opts.clearCred;


  if (!clearCred) {
    keyPaths = keyPaths.push(["cred"]);
  } else {
    var credKeyPaths = (0, _immutable.List)(clearCred).map(function (x) {
      return ["cred", x];
    });
    keyPaths = keyPaths.concat(credKeyPaths);
  }

  m = keyPaths.reduce(function (r, v) {
    return r.removeIn(v);
  }, m);

  return l.clearGlobalError(m);
}

function send(m) {
  return l.modeOptions(m).get("send", "link");
}

function isSendLink(m) {
  return send(m) === "link";
}

function setPasswordlessStarted(m, value) {
  return m.set("passwordlessStarted", value);
}

function passwordlessStarted(m) {
  return m.get("passwordlessStarted", false);
}
