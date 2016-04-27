'use strict';

exports.__esModule = true;
exports.renderSignedInConfirmation = renderSignedInConfirmation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _confirmation_pane = require('./confirmation_pane');

var _confirmation_pane2 = _interopRequireDefault(_confirmation_pane);

var _actions = require('./actions');

var _index = require('./index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignedInConfirmation = function (_React$Component) {
  _inherits(SignedInConfirmation, _React$Component);

  function SignedInConfirmation() {
    _classCallCheck(this, SignedInConfirmation);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SignedInConfirmation.prototype.t = function t(keyPath, params) {
    return l.ui.t(this.props.lock, ["signedIn"].concat(keyPath), params);
  };

  SignedInConfirmation.prototype.handleClose = function handleClose() {
    var _props = this.props;
    var closeHandler = _props.closeHandler;
    var lock = _props.lock;

    closeHandler(l.id(lock));
  };

  SignedInConfirmation.prototype.render = function render() {
    var lock = this.props.lock;

    var closeHandler = l.ui.closable(lock) ? this.handleClose.bind(this) : undefined;

    return _react2.default.createElement(
      _confirmation_pane2.default,
      { closeHandler: closeHandler },
      _react2.default.createElement(
        'p',
        null,
        this.t(["success"])
      )
    );
  };

  return SignedInConfirmation;
}(_react2.default.Component);

exports.default = SignedInConfirmation;


SignedInConfirmation.propTypes = {
  closeHandler: _react2.default.PropTypes.func.isRequired,
  lock: _react2.default.PropTypes.object.isRequired
};

function renderSignedInConfirmation(lock) {
  var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  props.closeHandler = _actions.closeLock;
  props.key = "auxiliarypane";
  props.lock = lock;

  return l.signedIn(lock) ? _react2.default.createElement(SignedInConfirmation, props) : null;
}
