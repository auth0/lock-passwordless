"use strict";

exports.__esModule = true;
exports.setDisplayName = setDisplayName;
exports.displayName = displayName;
exports.setImageUrl = setImageUrl;
exports.imageUrl = imageUrl;
exports.loaded = loaded;
exports.normalizeGravatarEmail = normalizeGravatarEmail;

var _trim = require("trim");

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDisplayName(m, value) {
  return m.set("displayName", value);
}

function displayName(m) {
  return m.get("displayName");
}

function setImageUrl(m, value) {
  return m.set("imageUrl", value);
}

function imageUrl(m) {
  return m.get("imageUrl");
}

function loaded(m) {
  return !!(displayName(m) && imageUrl(m));
}

function normalizeGravatarEmail(str) {
  return typeof str === "string" ? (0, _trim2.default)(str.toLowerCase()) : "";
}
