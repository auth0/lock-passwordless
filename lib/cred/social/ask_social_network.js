'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _screen = require('../../lock/screen');

var _screen2 = _interopRequireDefault(_screen);

var _social_buttons_pane = require('./social_buttons_pane');

var _social_buttons_pane2 = _interopRequireDefault(_social_buttons_pane);

var _index = require('../../social/index');

var _signed_in_confirmation = require('../../lock/signed_in_confirmation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskSocialNetwork = function (_Screen) {
  _inherits(AskSocialNetwork, _Screen);

  function AskSocialNetwork() {
    _classCallCheck(this, AskSocialNetwork);

    return _possibleConstructorReturn(this, _Screen.call(this, "network"));
  }

  AskSocialNetwork.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  AskSocialNetwork.prototype.render = function render(_ref) {
    var lock = _ref.lock;

    return _react2.default.createElement(_social_buttons_pane2.default, {
      lock: lock,
      showLoading: true,
      smallButtonsHeader: this.t(lock, ["smallSocialButtonsHeader"], { __textOnly: true })
    });
  };

  return AskSocialNetwork;
}(_screen2.default);

exports.default = AskSocialNetwork;
