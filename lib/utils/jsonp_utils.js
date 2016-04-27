'use strict';

exports.__esModule = true;

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONPUtils = function () {
  function JSONPUtils() {
    _classCallCheck(this, JSONPUtils);
  }

  JSONPUtils.prototype.get = function get() {
    return _jsonp2.default.apply(undefined, arguments);
  };

  return JSONPUtils;
}();

exports.default = new JSONPUtils();
