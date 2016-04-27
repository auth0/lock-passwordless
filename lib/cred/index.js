'use strict';

exports.__esModule = true;
exports.fullPhoneNumber = fullPhoneNumber;
exports.fullHumanPhoneNumber = fullHumanPhoneNumber;
exports.setPhoneLocation = setPhoneLocation;
exports.phoneLocationString = phoneLocationString;
exports.phoneDialingCode = phoneDialingCode;
exports.phoneIsoCode = phoneIsoCode;
exports.phoneNumber = phoneNumber;
exports.setPhoneNumber = setPhoneNumber;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validPhoneNumber = validPhoneNumber;
exports.visiblyInvalidPhoneNumber = visiblyInvalidPhoneNumber;
exports.setShowInvalidPhoneNumber = setShowInvalidPhoneNumber;
exports.email = email;
exports.setEmail = setEmail;
exports.validateEmail = validateEmail;
exports.validEmail = validEmail;
exports.visiblyInvalidEmail = visiblyInvalidEmail;
exports.setShowInvalidEmail = setShowInvalidEmail;
exports.vcode = vcode;
exports.setVcode = setVcode;
exports.validateVcode = validateVcode;
exports.validVcode = validVcode;
exports.visiblyInvalidVcode = visiblyInvalidVcode;
exports.setShowInvalidVcode = setShowInvalidVcode;

var _immutable = require('immutable');

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

var _country_codes = require('./country_codes');

var cc = _interopRequireWildcard(_country_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function valid(lock, field) {
  return lock.getIn(["cred", field, "valid"]);
}

function showInvalid(lock, cred) {
  return lock.getIn(["cred", cred, "showInvalid"], false);
}

function setShowInvalid(lock, cred, value) {
  return lock.setIn(["cred", cred, "showInvalid"], value);
}

function visiblyInvalid(lock, cred) {
  return showInvalid(lock, cred) && !valid(lock, cred);
}

// phone number

function fullPhoneNumber(lock) {
  return ('' + (phoneDialingCode(lock) || "") + (phoneNumber(lock) || "")).replace(/[\s-]+/g, '');
}

function fullHumanPhoneNumber(m) {
  var code = phoneDialingCode(m);
  var number = phoneNumber(m);
  return code + ' ' + number;
}

function setPhoneLocation(m, value) {
  return m.setIn(["cred", "phoneNumber", "location"], value);
}

function phoneLocation(m) {
  return m.getIn(["cred", "phoneNumber", "location"], cc.defaultLocation);
}

function phoneLocationString(m) {
  return cc.locationString(phoneLocation(m));
}

function phoneDialingCode(m) {
  return cc.dialingCode(phoneLocation(m));
}

function phoneIsoCode(m) {
  return cc.isoCode(phoneLocation(m));
}

function phoneNumber(lock) {
  return lock.getIn(["cred", "phoneNumber", "number"], "");
}

function setPhoneNumber(lock, value) {
  var prevValue = phoneNumber(lock);
  var prevShowInvalid = showInvalid(lock, "phoneNumber");
  var valid = validatePhoneNumber(value);

  return lock.mergeIn(["cred", "phoneNumber"], (0, _immutable.Map)({
    number: value,
    valid: valid,
    showInvalid: prevShowInvalid && prevValue === value
  }));
}

function validatePhoneNumber(phoneNumber) {
  var regExp = /^[0-9]([0-9 -])*[0-9]$/;
  return regExp.test(phoneNumber);
}

function validPhoneNumber(lock) {
  return valid(lock, "phoneNumber");
}

function visiblyInvalidPhoneNumber(lock) {
  return visiblyInvalid(lock, "phoneNumber");
}

function setShowInvalidPhoneNumber(lock, value) {
  return setShowInvalid(lock, "phoneNumber", value);
}

// email

function email(lock) {
  return lock.getIn(["cred", "email", "email"], "");
}

function setEmail(lock, value) {
  var prevValue = email(lock);
  var prevShowInvalid = showInvalid(lock, "email");
  var valid = !!validateEmail(value);

  return lock.mergeIn(["cred", "email"], (0, _immutable.Map)({
    email: value,
    valid: valid,
    showInvalid: prevShowInvalid && prevValue === value
  }));
}

function validateEmail(email) {
  var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var result = regExp.exec((0, _trim2.default)(email.toLowerCase()));
  return result && result[0];
}

function validEmail(lock) {
  return valid(lock, "email");
}

function visiblyInvalidEmail(lock) {
  return visiblyInvalid(lock, "email");
}

function setShowInvalidEmail(lock) {
  var value = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  return setShowInvalid(lock, "email", value);
}

// vcode

function vcode(lock) {
  return lock.getIn(["cred", "vcode", "vcode"], "");
}

function setVcode(lock, value) {
  var prevValue = vcode(lock);
  var prevShowInvalid = showInvalid(lock, "vcode");
  var valid = validateVcode(value);

  return lock.mergeIn(["cred", "vcode"], (0, _immutable.Map)({
    vcode: value,
    valid: valid,
    showInvalid: prevShowInvalid && prevValue === value
  }));
}

function validateVcode(vcode) {
  return (0, _trim2.default)(vcode).length > 0;
}

function validVcode(lock) {
  return valid(lock, "vcode");
}

function visiblyInvalidVcode(lock) {
  return visiblyInvalid(lock, "vcode");
}

function setShowInvalidVcode(lock) {
  var value = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  return setShowInvalid(lock, "vcode", value);
}
