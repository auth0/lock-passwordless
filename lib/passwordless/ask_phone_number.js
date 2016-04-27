'use strict';

exports.__esModule = true;

var _ask_phone_number = require('../cred/phone-number/ask_phone_number');

var _ask_phone_number2 = _interopRequireDefault(_ask_phone_number);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskPhoneNumber = function (_Base) {
  _inherits(AskPhoneNumber, _Base);

  function AskPhoneNumber() {
    _classCallCheck(this, AskPhoneNumber);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AskPhoneNumber.prototype.submitHandler = function submitHandler() {
    return _actions.sendSMS;
  };

  return AskPhoneNumber;
}(_ask_phone_number2.default);

exports.default = AskPhoneNumber;
