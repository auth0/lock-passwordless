'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../lock/screen');

var _screen2 = _interopRequireDefault(_screen);

var _phone_number_pane = require('./phone_number_pane');

var _phone_number_pane2 = _interopRequireDefault(_phone_number_pane);

var _ask_location = require('./ask_location');

var _actions = require('./actions');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskPhoneNumber = function (_Screen) {
  _inherits(AskPhoneNumber, _Screen);

  function AskPhoneNumber() {
    _classCallCheck(this, AskPhoneNumber);

    return _possibleConstructorReturn(this, _Screen.call(this, "phone"));
  }

  AskPhoneNumber.prototype.escHandler = function escHandler(lock) {
    return (0, _index.selectingLocation)(lock) ? _actions.cancelSelectPhoneLocation : null;
  };

  AskPhoneNumber.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _ask_location.renderAskLocation)(lock);
  };

  AskPhoneNumber.prototype.render = function render(_ref) {
    var focusSubmit = _ref.focusSubmit;
    var lock = _ref.lock;

    return _react2.default.createElement(_phone_number_pane2.default, {
      focusSubmit: focusSubmit,
      lock: lock,
      placeholder: this.t(lock, ["phoneNumberInputPlaceholder"], { __textOnly: true })
    });
  };

  return AskPhoneNumber;
}(_screen2.default);

exports.default = AskPhoneNumber;
