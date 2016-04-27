'use strict';

exports.__esModule = true;
exports.debouncedRequestGravatar = undefined;
exports.requestGravatar = requestGravatar;

var _index = require('../store/index');

var _index2 = require('./index');

var g = _interopRequireWildcard(_index2);

var _web_api = require('./web_api');

var webAPI = _interopRequireWildcard(_web_api);

var _fn_utils = require('../utils/fn_utils');

var f = _interopRequireWildcard(_fn_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function requestGravatar(email) {
  email = g.normalizeGravatarEmail(email);

  if (!(0, _index.read)(_index.getEntity, "gravatar", email)) {
    requestGravatarImage(email);
    requestGravatarDisplayName(email);
  }
}

var debouncedRequestGravatar = exports.debouncedRequestGravatar = f.debounce(requestGravatar, 300);

function requestGravatarDisplayName(email) {
  var success = function success(email, entry) {
    return requestGravatarDisplayNameSuccess(email, entry.displayName);
  };
  var error = function error(email) {
    return requestGravatarDisplayNameError(email);
  };
  webAPI.profile(email, success, error);
}

function requestGravatarImage(email) {
  var success = function success(email, img) {
    return requestGravatarImageSuccess(email, img.src);
  };
  var error = function error(email) {
    return requestGravatarImageError(email);
  };
  webAPI.img(email, success, error);
}

function requestGravatarDisplayNameSuccess(email, displayName) {
  (0, _index.swap)(_index.updateEntity, "gravatar", email, g.setDisplayName, displayName);
}

function requestGravatarDisplayNameError(email) {}

function requestGravatarImageSuccess(email, imageUrl) {
  (0, _index.swap)(_index.updateEntity, "gravatar", email, g.setImageUrl, imageUrl);
}

function requestGravatarImageError(email) {}
