'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _media_utils = require('../utils/media_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cssBlurSupport = function () {
  // Check stolen from Modernizr, see https://github.com/Modernizr/Modernizr/blob/29eab707f7a2fb261c8a9c538370e97eb1f86e25/feature-detects/css/filters.js
  var el = global.document.createElement('div');
  el.style.cssText = "filter: blur(2px); -webkit-filter: blur(2px)";
  return !!el.style.length && (global.document.documentMode === undefined || global.document.documentMode > 9);
}();

var Background = function (_React$Component) {
  _inherits(Background, _React$Component);

  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Background.prototype.render = function render() {
    var _props = this.props;
    var backgroundColor = _props.backgroundColor;
    var imageUrl = _props.imageUrl;
    var grayScale = _props.grayScale;


    var props = {
      className: "auth0-lock-header-bg"
    };

    if (cssBlurSupport) {
      props.className += " auth0-lock-blur-support";
    }

    var blurProps = {
      className: 'auth0-lock-header-bg-blur',
      style: { backgroundImage: 'url(\'' + imageUrl + '\')' }
    };

    if (grayScale) {
      blurProps.className += ' auth0-lock-no-grayscale';
    }

    var solidProps = {
      className: "auth0-lock-header-bg-solid",
      style: { backgroundColor: backgroundColor }
    };

    return _react2.default.createElement(
      'div',
      props,
      _react2.default.createElement('div', blurProps),
      _react2.default.createElement('div', solidProps)
    );
  };

  return Background;
}(_react2.default.Component);

exports.default = Background;


Background.propTypes = {
  backgorundColor: _react2.default.PropTypes.string,
  grayScale: _react2.default.PropTypes.bool,
  imageUrl: _react2.default.PropTypes.string
};
