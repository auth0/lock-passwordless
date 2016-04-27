'use strict';

exports.__esModule = true;
exports.renderAskLocation = renderAskLocation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _location_select = require('./location_select');

var _location_select2 = _interopRequireDefault(_location_select);

var _actions = require('./actions');

var _index = require('./index');

var _index2 = require('../../lock/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AskLocation = function (_React$Component) {
  _inherits(AskLocation, _React$Component);

  function AskLocation() {
    _classCallCheck(this, AskLocation);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  AskLocation.prototype.handleCancel = function handleCancel() {
    (0, _actions.cancelSelectPhoneLocation)(l.id(this.props.lock));
  };

  AskLocation.prototype.handleSelect = function handleSelect(location) {
    (0, _actions.changePhoneLocation)(l.id(this.props.lock), location);
  };

  AskLocation.prototype.t = function t(keyPath, params) {
    return l.ui.t(this.props.lock, ["location"].concat(keyPath), params);
  };

  AskLocation.prototype.render = function render() {
    return _react2.default.createElement(_location_select2.default, {
      cancelHandler: this.handleCancel.bind(this),
      initialLocationSearchStr: this.props.initialLocationSearchStr,
      locationFilterInputPlaceholder: this.t(["locationFilterInputPlaceholder"], { __textOnly: true }),
      selectHandler: this.handleSelect.bind(this)
    });
  };

  return AskLocation;
}(_react2.default.Component);

exports.default = AskLocation;
function renderAskLocation(lock) {
  return (0, _index.selectingLocation)(lock) ? _react2.default.createElement(AskLocation, {
    initialLocationSearchStr: (0, _index.initialLocationSearchStr)(lock),
    key: 'auxiliarypane',
    lock: lock }) : null;
}
