'use strict';

exports.__esModule = true;
exports.profile = profile;
exports.img = img;

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

var _index = require('../cred/index');

var _jsonp_utils = require('../utils/jsonp_utils');

var _jsonp_utils2 = _interopRequireDefault(_jsonp_utils);

var _index2 = require('../preload/index');

var preload = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = _blueimpMd2.default.md5 || _blueimpMd2.default;

function profile(email, success, error) {
  if ((0, _index.validateEmail)(email)) {
    var url = 'https://secure.gravatar.com/' + md5(email) + '.json';
    _jsonp_utils2.default.get(url, function (err, obj) {
      if (err) {
        error(email, err);
      } else if (obj && obj.entry && obj.entry[0]) {
        success(email, obj.entry[0]);
      } else {
        error(email);
      }
    });
  } else {
    error(email);
  }
}

function img(email, success, error) {
  if ((0, _index.validateEmail)(email)) {
    var url = 'https://secure.gravatar.com/avatar/' + md5(email) + '?d=404';
    preload.img(url, function (err, img) {
      err ? error(email) : success(email, img);
    });
  } else {
    error(email);
  }
}
