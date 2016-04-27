'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconButton = function (_React$Component) {
  _inherits(IconButton, _React$Component);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  IconButton.prototype.render = function render() {
    var name = this.props.name;

    var className = 'auth0-lock-' + name + '-button';

    return _react2.default.createElement(
      'span',
      { className: className, onClick: this.handleClick.bind(this) },
      _react2.default.createElement(_icon2.default, { name: this.props.name })
    );
  };

  IconButton.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  };

  return IconButton;
}(_react2.default.Component);

exports.default = IconButton;


IconButton.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  onClick: _react2.default.PropTypes.func.isRequired
};
