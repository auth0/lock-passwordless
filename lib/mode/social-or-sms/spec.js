'use strict';

exports.__esModule = true;

var _index = require('../index');

var _actions = require('../../cred/phone-number/actions');

var _ask_social_network_or_phone_number = require('../../cred/or/ask_social_network_or_phone_number');

var _ask_social_network_or_phone_number2 = _interopRequireDefault(_ask_social_network_or_phone_number);

var _ask_phone_number_vcode = require('../../passwordless/ask_phone_number_vcode');

var _ask_phone_number_vcode2 = _interopRequireDefault(_ask_phone_number_vcode);

var _index2 = require('../../social/index');

var _index3 = require('../../passwordless/index');

var m = _interopRequireWildcard(_index3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialOrSms = function (_Mode) {
  _inherits(SocialOrSms, _Mode);

  function SocialOrSms() {
    _classCallCheck(this, SocialOrSms);

    return _possibleConstructorReturn(this, _Mode.call(this, "socialOrSms"));
  }

  SocialOrSms.prototype.willOpen = function willOpen(model, options) {
    options = (0, _index2.processSocialOptions)(options);
    model = (0, _actions.setInitialPhoneLocation)(model, options);
    this.setModel(model.set("forceRedirect", !options.popup));
    options.mode.send = "sms";
    this.setOptions(options);
  };

  SocialOrSms.prototype.render = function render(lock) {
    return m.passwordlessStarted(lock) ? new _ask_phone_number_vcode2.default() : new _ask_social_network_or_phone_number2.default();
  };

  return SocialOrSms;
}(_index.Mode);

exports.default = SocialOrSms;
