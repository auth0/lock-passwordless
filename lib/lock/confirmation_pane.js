'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../icon/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmationPane = function (_React$Component) {
  _inherits(ConfirmationPane, _React$Component);

  function ConfirmationPane() {
    _classCallCheck(this, ConfirmationPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ConfirmationPane.prototype.render = function render() {
    var _props = this.props;
    var backHandler = _props.backHandler;
    var closeHandler = _props.closeHandler;


    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-confirmation' },
      closeHandler && _react2.default.createElement(_button2.default, { name: 'close', onClick: closeHandler }),
      backHandler && _react2.default.createElement(_button2.default, { name: 'back', onClick: backHandler }),
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-confirmation-content' },
        _react2.default.createElement(_icon2.default, { name: 'checkmark' }),
        this.props.children
      )
    );
  };

  return ConfirmationPane;
}(_react2.default.Component);

exports.default = ConfirmationPane;
