'use strict';

exports.__esModule = true;

var _ask_email = require('./ask_email');

var _ask_email2 = _interopRequireDefault(_ask_email);

var _email_sent_confirmation = require('./email_sent_confirmation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Magiclink = function (_Base) {
  _inherits(Magiclink, _Base);

  function Magiclink() {
    _classCallCheck(this, Magiclink);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Magiclink.prototype.renderAuxiliaryPane = function renderAuxiliaryPane(lock) {
    return (0, _email_sent_confirmation.renderEmailSentConfirmation)(lock);
  };

  return Magiclink;
}(_ask_email2.default);

exports.default = Magiclink;
