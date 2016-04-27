'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _social_button = require('./social_button');

var _social_button2 = _interopRequireDefault(_social_button);

var _index = require('../../lock/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../../social/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialButtonsPane = function (_React$Component) {
  _inherits(SocialButtonsPane, _React$Component);

  function SocialButtonsPane() {
    _classCallCheck(this, SocialButtonsPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SocialButtonsPane.prototype.render = function render() {
    var _props = this.props;
    var lock = _props.lock;
    var showLoading = _props.showLoading;
    var smallButtonsHeader = _props.smallButtonsHeader;


    var header = !(0, _index2.useBigButtons)(lock) && smallButtonsHeader && _react2.default.createElement(
      'p',
      { className: 'auth-lock-small-social-buttons-header' },
      smallButtonsHeader
    );

    var buttons = l.ui.connections(lock).map(function (x) {
      return _react2.default.createElement(_social_button2.default, { key: x.name, connection: x, lock: lock });
    });

    var loading = showLoading && _react2.default.createElement(
      'div',
      { className: 'auth0-loading-container' },
      _react2.default.createElement('div', { className: 'auth0-loading' })
    );

    return _react2.default.createElement(
      'div',
      { className: 'auth-lock-social-buttons-pane' },
      header,
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-social-buttons-container' },
        buttons
      ),
      loading
    );
  };

  return SocialButtonsPane;
}(_react2.default.Component);

exports.default = SocialButtonsPane;


SocialButtonsPane.propTypes = {
  lock: _react2.default.PropTypes.object.isRequired,
  showLoading: _react2.default.PropTypes.bool.isRequired,
  smallButtonsHeader: _react2.default.PropTypes.string
};

SocialButtonsPane.defaultProps = {
  showLoading: false
};
