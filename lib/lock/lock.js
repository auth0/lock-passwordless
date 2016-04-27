'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _chrome = require('./chrome');

var _chrome2 = _interopRequireDefault(_chrome);

var _multisize_slide = require('../multisize-slide/multisize_slide');

var _multisize_slide2 = _interopRequireDefault(_multisize_slide);

var _avatar = require('./avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _button = require('../icon/button');

var _button2 = _interopRequireDefault(_button);

var _badge = require('./badge');

var _badge2 = _interopRequireDefault(_badge);

var _index = require('./index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../gravatar/index');

var g = _interopRequireWildcard(_index2);

var _esc_keydown_utils = require('../utils/esc_keydown_utils');

var _esc_keydown_utils2 = _interopRequireDefault(_esc_keydown_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lock = function (_React$Component) {
  _inherits(Lock, _React$Component);

  function Lock() {
    _classCallCheck(this, Lock);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Lock.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.escKeydown = new _esc_keydown_utils2.default(function () {
      return _this2.handleEsc();
    });
  };

  Lock.prototype.componentWillUnmount = function componentWillUnmount() {
    this.escKeydown.release();
  };

  Lock.prototype.render = function render() {
    var _props = this.props;
    var auxiliaryPane = _props.auxiliaryPane;
    var backHandler = _props.backHandler;
    var closeHandler = _props.closeHandler;
    var contentRender = _props.contentRender;
    var disallowClose = _props.disallowClose;
    var footerText = _props.footerText;
    var headerText = _props.headerText;
    var lock = _props.lock;
    var screenName = _props.screenName;
    var submitHandler = _props.submitHandler;


    var overlay = l.ui.appendContainer(lock) ? _react2.default.createElement('div', { className: 'auth0-lock-overlay' }) : null;

    var gravatar = l.gravatar(lock);
    var showCloseButton = l.ui.closable(lock) && !disallowClose;

    var className = "auth0-lock";
    if (!l.ui.appendContainer(lock)) {
      className += " auth0-lock-opened-in-frame";
    } else if (lock.get("show")) {
      className += " auth0-lock-opened";
    }

    if (l.ui.mobile(lock)) {
      className += " auth0-lock-mobile";
    }

    if (l.submitting(lock)) {
      className += " auth0-lock-mode-loading";
    }

    if (auxiliaryPane) {
      className += " auth0-lock-auxiliary";
    }

    return _react2.default.createElement(
      'div',
      { className: className, ref: 'lock' },
      overlay,
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-center' },
        _react2.default.createElement(
          'form',
          { className: 'auth0-lock-widget', onSubmit: this.handleSubmit.bind(this) },
          gravatar && _react2.default.createElement(_avatar2.default, { imageUrl: g.imageUrl(gravatar) }),
          showCloseButton && _react2.default.createElement(_button2.default, { name: 'close', onClick: this.handleClose.bind(this) }),
          _react2.default.createElement(
            'div',
            { className: 'auth0-lock-widget-container' },
            _react2.default.createElement(
              _multisize_slide2.default,
              { delay: 400, transitionName: 'horizontal-fade' },
              _react2.default.createElement(_chrome2.default, {
                auxiliaryPane: auxiliaryPane,
                backHandler: backHandler,
                contentRender: contentRender,
                footerText: footerText,
                headerText: headerText,
                key: screenName,
                lock: lock,
                showSubmitButton: !!submitHandler
              })
            )
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'auth0-lock-badge-bottom' },
          _react2.default.createElement(_badge2.default, null)
        )
      )
    );
  };

  Lock.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var _props2 = this.props;
    var lock = _props2.lock;
    var submitHandler = _props2.submitHandler;

    if (submitHandler) {
      submitHandler(l.id(lock));
    }
  };

  Lock.prototype.handleClose = function handleClose() {
    var _props3 = this.props;
    var closeHandler = _props3.closeHandler;
    var lock = _props3.lock;

    if (!l.submitting(lock)) {
      closeHandler(l.id(lock));
    }
  };

  Lock.prototype.handleEsc = function handleEsc() {
    var _props4 = this.props;
    var closeHandler = _props4.closeHandler;
    var escHandler = _props4.escHandler;
    var lock = _props4.lock;

    escHandler ? escHandler(l.id(lock)) : this.handleClose();
  };

  return Lock;
}(_react2.default.Component);

exports.default = Lock;


Lock.propTypes = {
  auxiliaryPane: _react2.default.PropTypes.element,
  backHandler: _react2.default.PropTypes.func,
  contentRender: _react2.default.PropTypes.func.isRequired,
  footerText: _react2.default.PropTypes.element,
  headerText: _react2.default.PropTypes.element,
  lock: _react2.default.PropTypes.object.isRequired,
  screenName: _react2.default.PropTypes.string.isRequired
};
