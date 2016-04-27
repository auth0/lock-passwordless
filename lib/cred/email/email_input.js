'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input_wrap = require('../input_wrap');

var _input_wrap2 = _interopRequireDefault(_input_wrap);

var _icon = require('../../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _actions = require('../../gravatar/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailInput = function (_React$Component) {
  _inherits(EmailInput, _React$Component);

  function EmailInput(props) {
    _classCallCheck(this, EmailInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {};
    return _this;
  }

  EmailInput.prototype.componentDidMount = function componentDidMount() {
    var email = this.refs.input.value;
    if (email && this.props.gravatar) {
      (0, _actions.requestGravatar)(email);
    }
  };

  EmailInput.prototype.render = function render() {
    var _props = this.props;
    var isValid = _props.isValid;
    var onChange = _props.onChange;
    var gravatar = _props.gravatar;

    var props = _objectWithoutProperties(_props, ['isValid', 'onChange', 'gravatar']);

    var focused = this.state.focused;


    return _react2.default.createElement(
      _input_wrap2.default,
      { name: 'email', isValid: isValid, icon: _react2.default.createElement(_icon2.default, { name: 'email' }), focused: focused },
      _react2.default.createElement('input', _extends({ ref: 'input',
        type: 'text',
        name: 'email',
        className: 'auth0-lock-input',
        placeholder: 'yours@example.com',
        autoComplete: 'off',
        autoCapitalize: 'off',
        onChange: this.handleOnChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this)
      }, props))
    );
  };

  EmailInput.prototype.handleOnChange = function handleOnChange(e) {
    if (this.props.gravatar) {
      (0, _actions.debouncedRequestGravatar)(e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  EmailInput.prototype.handleFocus = function handleFocus() {
    this.setState({ focused: true });
  };

  EmailInput.prototype.handleBlur = function handleBlur() {
    this.setState({ focused: false });
  };

  return EmailInput;
}(_react2.default.Component);

// TODO: specify propTypes


exports.default = EmailInput;
