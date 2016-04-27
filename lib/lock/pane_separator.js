"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaneSeparator = function PaneSeparator(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "p",
    { className: "auth0-lock-pane-separator" },
    children
  );
};

PaneSeparator.propTypes = {
  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]).isRequired
};

PaneSeparator.defaultProps = {
  children: "or"
};

exports.default = PaneSeparator;
