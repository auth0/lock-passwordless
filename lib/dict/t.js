"use strict";

exports.__esModule = true;

exports.default = function (dict, keyPath) {
  var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var html = dict.get(keyPath, params);
  if (!html) {
    return null;
  }

  if (params.__textOnly) {
    return html;
  }

  return _react2.default.createElement("span", { dangerouslySetInnerHTML: { __html: html } });
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
