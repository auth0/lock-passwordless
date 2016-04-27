'use strict';

exports.__esModule = true;

var _index = require('../index');

var _ask_social_network = require('../../cred/social/ask_social_network');

var _ask_social_network2 = _interopRequireDefault(_ask_social_network);

var _index2 = require('../../social/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Social = function (_Mode) {
  _inherits(Social, _Mode);

  function Social() {
    _classCallCheck(this, Social);

    return _possibleConstructorReturn(this, _Mode.call(this, "social"));
  }

  Social.prototype.willOpen = function willOpen(model, options) {
    this.setOptions((0, _index2.processSocialOptions)(options));
    this.setModel(model.set("forceRedirect", !options.popup));
  };

  Social.prototype.render = function render() {
    return new _ask_social_network2.default();
  };

  return Social;
}(_index.Mode);

exports.default = Social;
