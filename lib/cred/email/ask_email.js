'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../lock/screen');

var _screen2 = _interopRequireDefault(_screen);

var _email_pane = require('./email_pane');

var _email_pane2 = _interopRequireDefault(_email_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskEmail = function (_Screen) {
  _inherits(AskEmail, _Screen);

  function AskEmail() {
    _classCallCheck(this, AskEmail);

    return _possibleConstructorReturn(this, _Screen.call(this, "email"));
  }

  AskEmail.prototype.render = function render(_ref) {
    var lock = _ref.lock;

    return _react2.default.createElement(_email_pane2.default, {
      lock: lock,
      placeholder: this.t(lock, ["emailInputPlaceholder"], { __textOnly: true })
    });
  };

  return AskEmail;
}(_screen2.default);

exports.default = AskEmail;
