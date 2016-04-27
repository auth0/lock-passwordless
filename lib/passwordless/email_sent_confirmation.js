'use strict';

exports.__esModule = true;
exports.renderEmailSentConfirmation = renderEmailSentConfirmation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _confirmation_pane = require('../lock/confirmation_pane');

var _confirmation_pane2 = _interopRequireDefault(_confirmation_pane);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _actions = require('../lock/actions');

var _index = require('../lock/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../cred/index');

var c = _interopRequireWildcard(_index2);

var _actions2 = require('./actions');

var _index3 = require('./index');

var m = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResendLink = function (_React$Component) {
  _inherits(ResendLink, _React$Component);

  function ResendLink() {
    _classCallCheck(this, ResendLink);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ResendLink.prototype.render = function render() {
    var _props = this.props;
    var label = _props.label;
    var onClick = _props.onClick;

    return _react2.default.createElement(
      'a',
      { className: 'auth0-lock-resend-link', href: '#', onClick: onClick },
      label,
      ' ',
      _react2.default.createElement(_icon2.default, { name: 'retry' })
    );
  };

  return ResendLink;
}(_react2.default.Component);

var Resend = function (_React$Component2) {
  _inherits(Resend, _React$Component2);

  function Resend() {
    _classCallCheck(this, Resend);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Resend.prototype.render = function render() {
    var _props2 = this.props;
    var labels = _props2.labels;
    var lock = _props2.lock;


    var resendLink = m.resendAvailable(lock) && _react2.default.createElement(ResendLink, { onClick: this.handleClick.bind(this),
      label: m.resendFailed(lock) ? labels.retry : labels.resend });

    var resendingLabel = m.resendOngoing(lock) && _react2.default.createElement(
      'a',
      { className: 'auth0-lock-resend-link' },
      labels.resending
    );

    var resendSuccessLabel = m.resendSuccess(lock) && _react2.default.createElement(
      'span',
      { className: 'auth0-lock-sent-label' },
      labels.sent
    );

    var resendFailedLabel = m.resendFailed(lock) && _react2.default.createElement(
      'span',
      { className: 'auth0-lock-sent-failed-label' },
      labels.failed
    );

    return _react2.default.createElement(
      'span',
      null,
      resendLink,
      resendingLabel,
      resendSuccessLabel,
      resendFailedLabel
    );
  };

  Resend.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    (0, _actions2.resendEmail)(l.id(this.props.lock));
  };

  return Resend;
}(_react2.default.Component);

var EmailSentConfirmation = function (_React$Component3) {
  _inherits(EmailSentConfirmation, _React$Component3);

  function EmailSentConfirmation() {
    _classCallCheck(this, EmailSentConfirmation);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  EmailSentConfirmation.prototype.render = function render() {
    var lock = this.props.lock;

    var closeHandler = l.ui.closable(lock) ? this.handleClose.bind(this) : undefined;
    var labels = {
      failed: this.t(["failedLabel"]),
      resend: this.t(["resendLabel"]),
      resending: this.t(["resendingLabel"]),
      retry: this.t(["retryLabel"]),
      sent: this.t(["sentLabel"])
    };

    return _react2.default.createElement(
      _confirmation_pane2.default,
      { backHandler: this.handleBack.bind(this), closeHandler: closeHandler },
      _react2.default.createElement(
        'p',
        null,
        this.t(["success"], { email: c.email(lock) })
      ),
      _react2.default.createElement(Resend, { labels: labels, lock: lock })
    );
  };

  EmailSentConfirmation.prototype.handleBack = function handleBack() {
    (0, _actions2.reset)(l.id(this.props.lock), { clearCred: [] });
  };

  EmailSentConfirmation.prototype.handleClose = function handleClose() {
    (0, _actions.closeLock)(l.id(this.props.lock));
  };

  EmailSentConfirmation.prototype.t = function t(keyPath, params) {
    return l.ui.t(this.props.lock, ["emailSent"].concat(keyPath), params);
  };

  return EmailSentConfirmation;
}(_react2.default.Component);

exports.default = EmailSentConfirmation;
function renderEmailSentConfirmation(lock) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  props.key = "auxiliarypane";
  props.lock = lock;

  return m.passwordlessStarted(lock) ? _react2.default.createElement(EmailSentConfirmation, props) : null;
}
