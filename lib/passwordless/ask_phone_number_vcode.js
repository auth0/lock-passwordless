'use strict';

exports.__esModule = true;

var _ask_vcode = require('./ask_vcode');

var _ask_vcode2 = _interopRequireDefault(_ask_vcode);

var _index = require('../cred/index');

var c = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskPhoneNumberVcode = function (_Base) {
  _inherits(AskPhoneNumberVcode, _Base);

  function AskPhoneNumberVcode() {
    _classCallCheck(this, AskPhoneNumberVcode);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AskPhoneNumberVcode.prototype.renderHeaderText = function renderHeaderText(lock) {
    return this.t(lock, ["headerText"], { phoneNumber: c.fullHumanPhoneNumber(lock) });
  };

  return AskPhoneNumberVcode;
}(_ask_vcode2.default);

exports.default = AskPhoneNumberVcode;
