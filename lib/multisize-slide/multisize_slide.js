'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { children: { current: props.children } };
    return _this;
  }

  Slider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.state.children.current.key != nextProps.children.key) {
      this.setState({
        children: {
          current: nextProps.children,
          prev: this.state.children.current
        }
      });
      this.animate = true;
    } else {
      this.setState({ children: { current: nextProps.children } });
    }
  };

  Slider.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    if (this.animate) {
      (function () {
        _this2.animate = false;

        var _state$children = _this2.state.children;
        var current = _state$children.current;
        var prev = _state$children.prev;
        var transitionName = _this2.props.transitionName;

        var currentComponent = _this2.refs[current.key];
        var prevComponent = _this2.refs[prev.key];

        var transition = function transition(component, className, delay) {
          var node = _reactDom2.default.findDOMNode(component);
          var activeClassName = className + '-active';

          _CSSCore2.default.addClass(node, className);

          setTimeout(function () {
            return _CSSCore2.default.addClass(node, activeClassName);
          }, 17);

          if (delay) {
            setTimeout(function () {
              _CSSCore2.default.removeClass(node, className);
              _CSSCore2.default.removeClass(node, activeClassName);
            }, delay);
          }
        };

        var callback = function callback(slide) {
          currentComponent.componentWillSlideIn(slide);
          var classNamePrefix = slide.reverse ? "reverse-" : "";
          transition(currentComponent, '' + classNamePrefix + transitionName + '-enter', _this2.props.delay);
          transition(prevComponent, '' + classNamePrefix + transitionName + '-leave');

          _this2.timeout = setTimeout(function () {
            _this2.setState({ children: { current: _this2.state.children.current } });
            currentComponent.componentDidSlideIn();
            _this2.timeout = null;
          }, _this2.props.delay);
        };

        prevComponent.componentWillSlideOut(callback);
      })();
    }
  };

  Slider.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  };

  Slider.prototype.render = function render() {
    var _state$children2 = this.state.children;
    var current = _state$children2.current;
    var prev = _state$children2.prev;

    var children = prev ? [current, prev] : [current];

    var childrenToRender = children.map(function (child) {
      return _react2.default.cloneElement(child, { ref: child.key });
    });

    return _react2.default.createElement(this.props.component, {}, childrenToRender);
  };

  return Slider;
}(_react2.default.Component);

exports.default = Slider;


Slider.propTypes = {
  component: _react2.default.PropTypes.string,
  delay: _react2.default.PropTypes.number.isRequired,
  transitionName: _react2.default.PropTypes.string.isRequired
};

Slider.defaultProps = {
  component: "span"
};
