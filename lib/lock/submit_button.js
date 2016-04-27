'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitButton = function (_React$Component) {
  _inherits(SubmitButton, _React$Component);

  function SubmitButton() {
    _classCallCheck(this, SubmitButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SubmitButton.prototype.render = function render() {
    var _props = this.props;
    var color = _props.color;
    var disabled = _props.disabled;
    var tabIndex = _props.tabIndex;


    return _react2.default.createElement(
      'button',
      { type: 'submit', className: 'auth0-lock-submit', style: { backgroundColor: color }, disabled: disabled, tabIndex: tabIndex },
      _react2.default.createElement(
        'div',
        { className: 'auth0-loading-container' },
        _react2.default.createElement('div', { className: 'auth0-loading' })
      ),
      _react2.default.createElement(_icon2.default, { name: 'submit' })
    );
  };

  SubmitButton.prototype.focus = function focus() {
    _reactDom2.default.findDOMNode(this).focus();
  };

  return SubmitButton;
}(_react2.default.Component);

exports.default = SubmitButton;


SubmitButton.propTypes = {
  disabled: _react2.default.PropTypes.bool
};
