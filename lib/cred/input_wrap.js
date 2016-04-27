"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputWrap = function (_React$Component) {
  _inherits(InputWrap, _React$Component);

  function InputWrap() {
    _classCallCheck(this, InputWrap);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  InputWrap.prototype.render = function render() {
    var _props = this.props;
    var focused = _props.focused;
    var icon = _props.icon;
    var isValid = _props.isValid;

    var blockClassName = "auth0-lock-input-block auth0-lock-input-" + this.props.name;
    if (!isValid) {
      blockClassName += " auth0-lock-error animated pulse";
    }

    var wrapClassName = "auth0-lock-input-wrap";
    if (focused && isValid) {
      wrapClassName += " auth0-lock-focused";
    }

    var fallbackIcon = _react2.default.createElement("i", { className: "auth0-lock-icon" });

    return _react2.default.createElement(
      "div",
      { className: blockClassName },
      _react2.default.createElement(
        "div",
        { className: wrapClassName },
        icon || fallbackIcon,
        this.props.children
      )
    );
  };

  return InputWrap;
}(_react2.default.Component);

exports.default = InputWrap;


InputWrap.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  isValid: _react2.default.PropTypes.bool.isRequired,
  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element.isRequired, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element).isRequired])
};
