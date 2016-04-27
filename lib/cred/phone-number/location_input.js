'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('../input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

var _icon = require('../../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationInput = function (_React$Component) {
  _inherits(LocationInput, _React$Component);

  function LocationInput(props) {
    _classCallCheck(this, LocationInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  LocationInput.prototype.render = function render() {
    var _props = this.props;
    var onClick = _props.onClick;
    var tabIndex = _props.tabIndex;
    var value = _props.value;
    var focused = this.state.focused;


    var limitedValue = value.length > 23 ? value.substr(0, 20) + '...' : value;

    return _react2.default.createElement(
      _input_wrap2.default,
      { name: 'location', isValid: true, icon: _react2.default.createElement(_icon2.default, { name: 'location' }), focused: focused },
      _react2.default.createElement('input', { type: 'button',
        name: 'location',
        className: 'auth0-lock-input auth0-lock-input-location',
        value: limitedValue,
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onKeyDown: this.handleKeyDown.bind(this),
        onClick: onClick,
        tabIndex: tabIndex }),
      _react2.default.createElement(_icon2.default, { name: 'arrow' })
    );
  };

  LocationInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  LocationInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  LocationInput.prototype.handleKeyDown = function handleKeyDown(e) {
    if (e.key !== "Tab") {
      e.preventDefault();
    }

    if (e.key === "ArrowDown") {
      return this.props.onClick();
    }

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      return this.props.onClick(String.fromCharCode(e.keyCode).toLowerCase());
    }
  };

  return LocationInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = LocationInput;
