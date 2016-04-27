'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _background = require('./background');

var _background2 = _interopRequireDefault(_background);

var _welcome = require('./welcome');

var _welcome2 = _interopRequireDefault(_welcome);

var _button = require('../icon/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var _props = this.props;
    var backHandler = _props.backHandler;
    var backgroundColor = _props.backgroundColor;
    var backgroundUrl = _props.backgroundUrl;
    var logoUrl = _props.logoUrl;
    var name = _props.name;
    var title = _props.title;


    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-header' },
      backHandler && _react2.default.createElement(_button2.default, { name: 'back', onClick: backHandler }),
      _react2.default.createElement(_background2.default, { imageUrl: backgroundUrl, backgroundColor: backgroundColor, grayScale: !!name }),
      _react2.default.createElement(_welcome2.default, { title: title, name: name, imageUrl: name ? undefined : logoUrl })
    );
  };

  return Header;
}(_react2.default.Component);

exports.default = Header;


Header.propTypes = {
  backgroundUrl: _react2.default.PropTypes.string,
  logoUrl: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string
};
