'use strict';

exports.__esModule = true;
exports.build = build;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _dicts = require('./dicts');

var _dicts2 = _interopRequireDefault(_dicts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dict = function () {
  function Dict(dict) {
    _classCallCheck(this, Dict);

    this.dict = dict;
  }

  Dict.prototype.get = function get(keyPath) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return _immutable2.default.fromJS(params).reduce(function (r, v, k) {
      return r.replace('{' + k + '}', v);
    }, this.dict.getIn(keyPath, ""));
  };

  return Dict;
}();

function build(dictName, overrides) {
  overrides = _immutable2.default.fromJS(overrides);
  var dict = _immutable2.default.fromJS(_dicts2.default).get(dictName, (0, _immutable.Map)()).set("error", _immutable2.default.fromJS(_dicts2.default.error));
  return new Dict(dict.mergeDeep(overrides));
}
