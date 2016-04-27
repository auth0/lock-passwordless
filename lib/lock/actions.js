'use strict';

exports.__esModule = true;
exports.setupLock = setupLock;
exports.openLock = openLock;
exports.closeLock = closeLock;
exports.removeLock = removeLock;
exports.updateLock = updateLock;
exports.registerMode = registerMode;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _web_api = require('./web_api');

var _web_api2 = _interopRequireDefault(_web_api);

var _index = require('../store/index');

var _index2 = require('./index');

var l = _interopRequireWildcard(_index2);

var _storage = require('../cred/storage');

var cs = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setupLock(id, clientID, domain) {
  var lock = l.setup({ id: id, clientID: clientID, domain: domain });
  (0, _index.swap)(_index.setEntity, "lock", id, lock);

  _web_api2.default.setupClient(id, clientID, domain);

  // TODO: only modes with a phone number are making use of the user's location
  var user = (0, _index.read)(_index.getEntity, "user");
  var location = user && user.get("location");

  if (!location) {
    _web_api2.default.getUserCountry(id, function (err, isoCode) {
      if (!err) {
        (0, _index.swap)(_index.updateEntity, "user", 0, function (m) {
          return m.set("location", isoCode);
        });
      }
    });
  }
}

function openLock(id, modeName, options) {
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  if (!lock) {
    throw new Error("The Lock can't be opened again after it has been destroyed");
  }

  if (l.show(lock)) {
    return false;
  }

  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    lock = l.render(lock, modeName, options);

    return l.ui.rememberLastLogin(lock) ? cs.restore(lock, l.modeName(lock)) : lock;
  });

  setTimeout(function () {
    return (0, _index.swap)(_index.updateEntity, "lock", id, l.setShow, true);
  }, 17);
  return true;
}

function closeLock(id) {
  var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

  // Do nothing when the Lock can't be closed, unless closing is forced.
  var lock = (0, _index.read)(_index.getEntity, "lock", id);
  if (!l.ui.closable(lock) && !force) {
    return;
  }

  // Close the Lock. Also, stop rendering when in inline mode. In modal mode we
  // need to wait for the close animation to finish before stop rendering the
  // Lock.
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    if (!l.ui.appendContainer(lock)) {
      lock = lock.remove("render");
    }

    return l.close(lock);
  });

  // If we are still rendering (modal mode), schedule a function that will
  // execute the callback and destroy the Lock (liberate its resources). If we
  // are not rendering (inline mode), do both things immediately.
  lock = (0, _index.read)(_index.getEntity, "lock", id);

  if (l.rendering(lock)) {
    setTimeout(function () {
      // swap(updateEntity, "lock", id, m => m.remove("render"));
      callback((0, _index.read)(_index.getEntity, "lock", id));
      setTimeout(function () {
        return (0, _index.swap)(_index.updateEntity, "lock", id, l.reset);
      }, 17);
    }, 1000);
  } else {
    (0, _index.swap)(_index.updateEntity, "lock", id, l.reset);
    callback(lock);
  }
}

function removeLock(id) {
  (0, _index.swap)(_index.updateEntity, "lock", id, function (lock) {
    return lock.remove("render");
  });
  (0, _index.swap)(_index.removeEntity, "lock", id);
}

function updateLock(id, f) {
  return (0, _index.swap)(_index.updateEntity, "lock", id, f);
}

function registerMode(spec) {
  (0, _index.swap)(_index.setEntity, "mode", spec.name, _immutable2.default.fromJS(spec));
}
