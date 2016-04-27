'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../lock/index');

var l = _interopRequireWildcard(_index);

var _actions = require('../../social/actions');

var _index2 = require('../../social/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialButton = function (_React$Component) {
  _inherits(SocialButton, _React$Component);

  function SocialButton() {
    _classCallCheck(this, SocialButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SocialButton.prototype.render = function render() {
    var _props = this.props;
    var connection = _props.connection;
    var disabled = _props.disabled;
    var lock = _props.lock;
    var tabIndex = _props.tabIndex;


    var className = "auth0-lock-social-button";
    if ((0, _index2.useBigButtons)(lock)) className += " auth0-lock-social-big-button";

    return _react2.default.createElement(
      'button',
      {
        className: className,
        'data-provider': connection.strategy,
        disabled: disabled,
        onClick: this.handleClick.bind(this),
        tabIndex: l.tabIndex(lock, tabIndex),
        type: 'button'
      },
      _react2.default.createElement('div', { className: 'auth0-lock-social-button-icon' }),
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-social-button-text' },
        'Login with ',
        (0, _index2.displayName)(connection)
      )
    );
  };

  SocialButton.prototype.handleClick = function handleClick() {
    var _props2 = this.props;
    var lock = _props2.lock;
    var connection = _props2.connection;

    (0, _actions.signIn)(l.id(lock), connection);
  };

  return SocialButton;
}(_react2.default.Component);

exports.default = SocialButton;


SocialButton.propTypes = {
  lock: _react2.default.PropTypes.object.isRequired,
  connection: _react2.default.PropTypes.object.isRequired,
  disabled: _react2.default.PropTypes.bool.isRequired,
  tabIndex: _react2.default.PropTypes.number
};

SocialButton.defaultProps = {
  disabled: false,
  tabIndex: 1
};
