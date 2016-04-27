'use strict';

exports.__esModule = true;
exports.changePhoneNumber = changePhoneNumber;
exports.changePhoneLocation = changePhoneLocation;
exports.setInitialPhoneLocation = setInitialPhoneLocation;
exports.selectPhoneLocation = selectPhoneLocation;
exports.cancelSelectPhoneLocation = cancelSelectPhoneLocation;

var _index = require('../../store/index');

var _index2 = require('../index');

var c = _interopRequireWildcard(_index2);

var _country_codes = require('../country_codes');

var cc = _interopRequireWildcard(_country_codes);

var _index3 = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function changePhoneNumber(id, phoneNumber) {
  (0, _index.swap)(_index.updateEntity, "lock", id, c.setPhoneNumber, phoneNumber);
}

function changePhoneLocation(id, location) {
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    lock = (0, _index3.closeLocationSelect)(lock);
    lock = c.setPhoneLocation(lock, location);
    return lock;
  });
}

// TODO: move this to another place since is not really an action.
function setInitialPhoneLocation(m, options) {
  var defaultLocation = options.defaultLocation;


  if (defaultLocation && typeof defaultLocation === "string") {
    var location = cc.findByIsoCode(defaultLocation);
    if (!location) {
      throw new Error('Unable to set the default location, can\'t find any country with the code "' + defaultLocation + '".');
    }
    return c.setPhoneLocation(m, location);
  } else {
    var user = (0, _index.read)(_index.getEntity, "user");
    var _location = cc.findByIsoCode(user && user.get("location"));
    return _location ? c.setPhoneLocation(m, _location) : m;
  }
}

function selectPhoneLocation(id, searchStr) {
  (0, _index.swap)(_index.updateEntity, "lock", id, _index3.openLocationSelect, searchStr);
}

function cancelSelectPhoneLocation(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, _index3.closeLocationSelect);
}
