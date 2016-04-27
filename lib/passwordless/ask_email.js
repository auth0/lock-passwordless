'use strict';

exports.__esModule = true;

var _ask_email = require('../cred/email/ask_email');

var _ask_email2 = _interopRequireDefault(_ask_email);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskEmail = function (_Base) {
  _inherits(AskEmail, _Base);

  function AskEmail() {
    _classCallCheck(this, AskEmail);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  AskEmail.prototype.submitHandler = function submitHandler() {
    return _actions.requestPasswordlessEmail;
  };

  return AskEmail;
}(_ask_email2.default);

exports.default = AskEmail;
