'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalError = function (_React$Component) {
  _inherits(GlobalError, _React$Component);

  function GlobalError() {
    _classCallCheck(this, GlobalError);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  GlobalError.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'auth0-global-grobal-error' },
      _react2.default.createElement(
        'span',
        { className: 'animated fadeInUp' },
        this.props.message
      )
    );
  };

  // componentWillAppear(callback) {
  //   console.log("componentWillAppear")
  //   callback();
  // }
  //
  // componentDidAppear() {
  //   console.log("componentDidAppear");
  // }

  GlobalError.prototype.componentWillEnter = function componentWillEnter(callback) {
    // console.log("componentWillEnter");
    var node = _reactDom2.default.findDOMNode(this);
    var computedStyle = window.getComputedStyle(node, null);
    var height = computedStyle.height;
    var paddingTop = computedStyle.paddingTop;
    var paddingBottom = computedStyle.paddingBottom;
    node.style.height = "0px";
    node.style.paddingTop = "0px";
    node.style.paddingBottom = "0px";
    setTimeout(function () {
      node.style.transition = "all 0.2s";
      node.style.height = height;
      node.style.paddingTop = paddingTop;
      node.style.paddingBottom = paddingBottom;
      callback();
    }, 17);
  };

  // componentDidEnter() {
  //   console.log("componentDidEnter");
  // }

  GlobalError.prototype.componentWillLeave = function componentWillLeave(callback) {
    // console.log("componentWillLeave");
    var node = _reactDom2.default.findDOMNode(this);
    node.style.transition = "all 0.2s";
    node.style.height = "0px";
    node.style.paddingTop = "0px";
    node.style.paddingBottom = "0px";
    setTimeout(function () {
      node.style.removeProperty("transition");
      node.style.removeProperty("height");
      node.style.removeProperty("padding-top");
      node.style.removeProperty("padding-bottom");
      callback();
    }, 250);
  };

  // componentDidLeave() {
  //   console.log("componentDidLeave");
  // }


  return GlobalError;
}(_react2.default.Component);

exports.default = GlobalError;


GlobalError.propTypes = {
  message: _react2.default.PropTypes.string.isRequired
};
