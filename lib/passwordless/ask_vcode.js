'use strict';

exports.__esModule = true;

var _ask_vcode = require('../cred/vcode/ask_vcode');

var _ask_vcode2 = _interopRequireDefault(_ask_vcode);

var _actions = require('./actions');

var _signed_in_confirmation = require('../lock/signed_in_confirmation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskVcode = function (_Base) {
  _inherits(AskVcode, _Base);

  function AskVcode() {
    _classCallCheck(this, AskVcode);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AskVcode.prototype.backHandler = function backHandler() {
    return function (id) {
      return (0, _actions.back)(id, { clearCred: ["vcode"] });
    };
  };

  AskVcode.prototype.submitHandler = function submitHandler() {
    return _actions.signIn;
  };

  AskVcode.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _signed_in_confirmation.renderSignedInConfirmation)(lock);
  };

  return AskVcode;
}(_ask_vcode2.default);

exports.default = AskVcode;
