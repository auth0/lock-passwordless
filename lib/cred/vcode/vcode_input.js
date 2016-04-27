'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('../input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

var _icon = require('../../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _media_utils = require('../../utils/media_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VcodeInput = function (_React$Component) {
  _inherits(VcodeInput, _React$Component);

  function VcodeInput(props) {
    _classCallCheck(this, VcodeInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  VcodeInput.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!(0, _media_utils.isSmallScreen)()) {
      // TODO: We can't set the focus immediately because we have to wait for
      // the input to be visible. Use a more robust solution (Placeholder should
      // notify it children when they are being shown).
      setTimeout(function () {
        return _this2.refs.input.focus();
      }, 1200);
    }
  };

  VcodeInput.prototype.render = function render() {
    var _props = this.props;
    var isValid = _props.isValid;

    var props = _objectWithoutProperties(_props, ['isValid']);

    var focused = this.state.focused;


    return _react2.default.createElement(
      _input_wrap2.default,
      { name: 'vcode', isValid: isValid, icon: _react2.default.createElement(_icon2.default, { name: 'vcode' }), focused: focused },
      _react2.default.createElement('input', _extends({ ref: 'input',
        type: 'tel',
        name: 'vcode',
        className: 'auth0-lock-input auth0-lock-input-code',
        autoComplete: 'off',
        autoCapitalize: 'off',
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this)
      }, props))
    );
  };

  VcodeInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  VcodeInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return VcodeInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = VcodeInput;
