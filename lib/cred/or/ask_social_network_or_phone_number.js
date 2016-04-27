'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ask_phone_number = require('../../passwordless/ask_phone_number');

var _ask_phone_number2 = _interopRequireDefault(_ask_phone_number);

var _phone_number_pane = require('../phone-number/phone_number_pane');

var _phone_number_pane2 = _interopRequireDefault(_phone_number_pane);

var _social_buttons_pane = require('../social/social_buttons_pane');

var _social_buttons_pane2 = _interopRequireDefault(_social_buttons_pane);

var _pane_separator = require('../../lock/pane_separator');

var _pane_separator2 = _interopRequireDefault(_pane_separator);

var _index = require('../../lock/index');

var l = _interopRequireWildcard(_index);

var _signed_in_confirmation = require('../../lock/signed_in_confirmation');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskSocialNetworkOrPhoneNumber = function (_Base) {
  _inherits(AskSocialNetworkOrPhoneNumber, _Base);

  function AskSocialNetworkOrPhoneNumber() {
    _classCallCheck(this, AskSocialNetworkOrPhoneNumber);

    var _this = _possibleConstructorReturn(this, _Base.call(this));

    _this.name = "networkOrPhone";
    return _this;
  }

  AskSocialNetworkOrPhoneNumber.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock) || _Base.prototype.renderAuxiliaryPane.call(this, lock);
  };

  AskSocialNetworkOrPhoneNumber.prototype.render = function render(_ref) {
    var focusSubmit = _ref.focusSubmit;
    var lock = _ref.lock;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_social_buttons_pane2.default, {
        lock: lock,
        smallButtonsHeader: this.t(lock, ["smallSocialButtonsHeader"], { __textOnly: true })
      }),
      _react2.default.createElement(
        _pane_separator2.default,
        null,
        this.t(lock, ["separatorText"])
      ),
      _react2.default.createElement(_phone_number_pane2.default, {
        focusSubmit: focusSubmit,
        lock: lock,
        placeholder: this.t(lock, ["phoneNumberInputPlaceholder"], { __textOnly: true }),
        tabIndex: 2
      })
    );
  };

  return AskSocialNetworkOrPhoneNumber;
}(_ask_phone_number2.default);

exports.default = AskSocialNetworkOrPhoneNumber;
