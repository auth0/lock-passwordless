'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _global_error = require('./global_error');

var _global_error2 = _interopRequireDefault(_global_error);

var _submit_button = require('./submit_button');

var _submit_button2 = _interopRequireDefault(_submit_button);

var _header = require('../header/header');

var _header2 = _interopRequireDefault(_header);

var _index = require('./index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../gravatar/index');

var g = _interopRequireWildcard(_index2);

var _terms = require('../lock/terms');

var _terms2 = _interopRequireDefault(_terms);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chrome = function (_React$Component) {
  _inherits(Chrome, _React$Component);

  function Chrome(props) {
    _classCallCheck(this, Chrome);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { height: "", show: true };
    return _this;
  }

  Chrome.prototype.componentDidMount = function componentDidMount() {
    this.reverse = false;
  };

  Chrome.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!l.globalError(this.props.lock) && l.globalError(nextProps.lock)) {
      this.setState({ height: "auto" });
    }
  };

  Chrome.prototype.render = function render() {
    var _props = this.props;
    var auxiliaryPane = _props.auxiliaryPane;
    var backHandler = _props.backHandler;
    var contentRender = _props.contentRender;
    var headerText = _props.headerText;
    var footerText = _props.footerText;
    var lock = _props.lock;
    var showSubmitButton = _props.showSubmitButton;
    var _state = this.state;
    var height = _state.height;
    var show = _state.show;


    var gravatar = l.gravatar(lock);
    var icon = l.ui.icon(lock);
    var globalError = l.globalError(lock) || null;
    var disableSubmit = l.submitting(lock);

    var backgroundUrl = void 0,
        name = void 0;
    if (gravatar) {
      backgroundUrl = g.imageUrl(gravatar);
      name = this.t(["welcome"], { name: g.displayName(gravatar), __textOnly: true });
    } else {
      backgroundUrl = icon;
      name = "";
    }
    var primaryColor = l.ui.primaryColor(lock);

    var header = headerText && _react2.default.createElement(
      'p',
      null,
      headerText
    );
    var footer = footerText && _react2.default.createElement(
      _terms2.default,
      null,
      footerText
    );

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-cred-pane' },
      _react2.default.createElement(_header2.default, { title: this.t(["title"], { __textOnly: true }), name: name, backHandler: backHandler && show && this.handleBack.bind(this), backgroundUrl: backgroundUrl, backgroundColor: primaryColor, logoUrl: icon }),
      _react2.default.createElement(
        Placeholder,
        { delay: 800, height: height, show: show, ref: 'content' },
        _react2.default.createElement(
          _reactAddonsTransitionGroup2.default,
          null,
          globalError && _react2.default.createElement(_global_error2.default, { key: 'global-error', message: globalError })
        ),
        _react2.default.createElement(
          'div',
          { className: 'auth0-lock-content' },
          _react2.default.createElement(
            'div',
            { className: 'auth0-lock-form' },
            header,
            contentRender({ focusSubmit: this.focusSubmit.bind(this), lock: lock })
          )
        ),
        footer
      ),
      showSubmitButton && _react2.default.createElement(_submit_button2.default, { ref: 'submit', color: primaryColor, disabled: disableSubmit, tabIndex: l.tabIndex(lock, 10) }),
      _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        { transitionName: 'slide', transitionEnterTimeout: 350, transitionLeaveTimeout: 350 },
        auxiliaryPane
      )
    );
  };

  Chrome.prototype.focusSubmit = function focusSubmit() {
    this.refs.submit.focus();
  };

  Chrome.prototype.handleBack = function handleBack() {
    var _props2 = this.props;
    var backHandler = _props2.backHandler;
    var lock = _props2.lock;

    this.reverse = true;
    backHandler(l.id(lock));
  };

  Chrome.prototype.componentWillSlideIn = function componentWillSlideIn(slide) {
    var node = _reactDom2.default.findDOMNode(this.refs.content);
    this.originalHeight = parseInt(window.getComputedStyle(node, null).height, 10);
    this.setState({ height: slide.height, show: false });
  };

  Chrome.prototype.componentDidSlideIn = function componentDidSlideIn() {
    var _this2 = this;

    this.setState({ height: this.originalHeight });
    setTimeout(function () {
      return _this2.setState({ show: true });
    }, 500);
  };

  Chrome.prototype.componentWillSlideOut = function componentWillSlideOut(callback) {
    var node = _reactDom2.default.findDOMNode(this.refs.content);
    var size = window.getComputedStyle(node, null).height;
    callback({ height: parseInt(size, 10), reverse: this.reverse });
  };

  Chrome.prototype.t = function t(keyPath, params) {
    return l.ui.t(this.props.lock, keyPath, params);
  };

  return Chrome;
}(_react2.default.Component);

exports.default = Chrome;


Chrome.propTypes = {
  auxiliaryPane: _react2.default.PropTypes.element,
  backHandler: _react2.default.PropTypes.func,
  contentRender: _react2.default.PropTypes.func.isRequired,
  footerText: _react2.default.PropTypes.element,
  headerText: _react2.default.PropTypes.element,
  lock: _react2.default.PropTypes.object.isRequired,
  showSubmitButton: _react2.default.PropTypes.bool.isRequired
};

Chrome.defaultProps = {
  showSubmitButton: true
};

var Placeholder = function (_React$Component2) {
  _inherits(Placeholder, _React$Component2);

  function Placeholder(props) {
    _classCallCheck(this, Placeholder);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.state = {};
    return _this3;
  }

  Placeholder.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this4 = this;

    if (nextProps.height) {

      if (!this.state.height || nextProps.height === "auto") {
        this.setState({ height: nextProps.height });
        return;
      }

      // TODO: Instead of storing a flag to indicate whether or not we are
      // performing an animation, we should store the height we are going to.
      // Also use rAF.
      if (this.state.height != nextProps.height && !this.state.animating) {
        (function () {
          var frames = 10;
          var count = 0;
          var current = parseInt(_this4.state.height, 10);
          var last = parseInt(nextProps.height, 10);
          var step = Math.abs(current - last) / frames;
          var dir = current < last ? 1 : -1;
          var dh = step * dir;

          _this4.t = setInterval(function () {
            if (count < frames - 1) {
              _this4.setState({ height: current, animating: true });
              current += dh;
              count++;
            } else {
              clearInterval(_this4.t);
              delete _this4.t;
              _this4.setState({ height: last, animating: false });
            }
          }, 17);
        })();
      }
    }
  };

  Placeholder.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.t) {
      clearInterval(this.t);
    }
  };

  Placeholder.prototype.render = function render() {
    var _props3 = this.props;
    var children = _props3.children;
    var delay = _props3.delay;
    var height = _props3.height;
    var show = _props3.show;

    var style = this.state.height ? { height: this.state.height } : {};

    return _react2.default.createElement(
      'div',
      { style: style },
      _react2.default.createElement(
        'div',
        { style: { visibility: show ? "visible" : "hidden" } },
        children
      )
    );
  };

  return Placeholder;
}(_react2.default.Component);
