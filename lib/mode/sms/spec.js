'use strict';

exports.__esModule = true;

var _index = require('../index');

var _actions = require('../../cred/phone-number/actions');

var _ask_phone_number_vcode = require('../../passwordless/ask_phone_number_vcode');

var _ask_phone_number_vcode2 = _interopRequireDefault(_ask_phone_number_vcode);

var _ask_phone_number = require('../../passwordless/ask_phone_number');

var _ask_phone_number2 = _interopRequireDefault(_ask_phone_number);

var _index2 = require('../../passwordless/index');

var m = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sms = function (_Mode) {
  _inherits(Sms, _Mode);

  function Sms() {
    _classCallCheck(this, Sms);

    return _possibleConstructorReturn(this, _Mode.call(this, "sms"));
  }

  Sms.prototype.willOpen = function willOpen(model, options) {
    this.setModel((0, _actions.setInitialPhoneLocation)(model, options));
    options.mode.send = "sms";
    this.setOptions(options);
  };

  Sms.prototype.render = function render(lock) {
    return m.passwordlessStarted(lock) ? new _ask_phone_number_vcode2.default() : new _ask_phone_number2.default();
  };

  return Sms;
}(_index.Mode);

exports.default = Sms;
