"use strict";

exports.__esModule = true;
exports.store = store;
exports.restore = restore;

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixKey(key) {
  return key + "Cred";
}

function store(m, cred, key) {
  try {
    var value = (0, _immutable.Map)().set(cred, m.getIn(["cred", cred])).toJS();
    global.localStorage.setItem(prefixKey(key), global.JSON.stringify(value));
  } catch (e) {
    // silently fail for now...
  }
}

function restore(m, key) {
  try {
    var item = global.localStorage.getItem(prefixKey(key));
    if (item) {
      var cred = _immutable2.default.fromJS(global.JSON.parse(item));
      return m.set("cred", cred);
    }
  } catch (e) {
    // silently fail for now...
  }

  return m;
}
