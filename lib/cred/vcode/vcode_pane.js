'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vcode_input = require('./vcode_input');

var _vcode_input2 = _interopRequireDefault(_vcode_input);

var _index = require('../../lock/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../index');

var c = _interopRequireWildcard(_index2);

var _media_utils = require('../../utils/media_utils');

var _actions = require('./actions');

var _actions2 = require('../../passwordless/actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: remove passwordless deps


var VcodePane = function (_React$Component) {
  _inherits(VcodePane, _React$Component);

  function VcodePane() {
    _classCallCheck(this, VcodePane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  VcodePane.prototype.handleVcodeChange = function handleVcodeChange(e) {
    e.preventDefault();
    (0, _actions.changeVcode)(l.id(this.props.lock), e.target.value);
  };

  VcodePane.prototype.handleResendClick = function handleResendClick(e) {
    e.preventDefault();
    (0, _actions2.back)(l.id(this.props.lock), { clearCred: ["vcode"] });
  };

  VcodePane.prototype.render = function render() {
    var _props = this.props;
    var lock = _props.lock;
    var placeholder = _props.placeholder;
    var resendLabel = _props.resendLabel;
    var tabIndex = _props.tabIndex;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_vcode_input2.default, { value: c.vcode(lock),
        isValid: !c.visiblyInvalidVcode(lock) && !l.globalError(lock),
        onChange: this.handleVcodeChange.bind(this),
        autoFocus: !(0, _media_utils.isSmallScreen)(),
        placeholder: placeholder,
        disabled: l.submitting(lock),
        tabIndex: l.tabIndex(lock, tabIndex) }),
      _react2.default.createElement(
        'p',
        { className: 'auth0-lock-did-not-receive-code' },
        _react2.default.createElement(
          'a',
          { href: '#', className: 'auth0-lock-did-not-receive-code-link', onClick: this.handleResendClick.bind(this) },
          resendLabel
        )
      )
    );
  };

  return VcodePane;
}(_react2.default.Component);

exports.default = VcodePane;


VcodePane.propTypes = {
  lock: _react2.default.PropTypes.object.isRequired,
  placeholder: _react2.default.PropTypes.string.isRequired,
  resendLabel: _react2.default.PropTypes.string.isRequired,
  tabIndex: _react2.default.PropTypes.number.isRequired
};

VcodePane.defaultProps = {
  tabIndex: 1
};
