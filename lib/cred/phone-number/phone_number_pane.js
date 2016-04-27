'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _phone_number_input = require('./phone_number_input');

var _phone_number_input2 = _interopRequireDefault(_phone_number_input);

var _location_input = require('./location_input');

var _location_input2 = _interopRequireDefault(_location_input);

var _index = require('../index');

var c = _interopRequireWildcard(_index);

var _index2 = require('../../lock/index');

var l = _interopRequireWildcard(_index2);

var _actions = require('./actions');

var _index3 = require('./index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneNumberPane = function (_React$Component) {
  _inherits(PhoneNumberPane, _React$Component);

  function PhoneNumberPane() {
    _classCallCheck(this, PhoneNumberPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PhoneNumberPane.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    if ((0, _index3.selectingLocation)(this.props.lock) && !(0, _index3.selectingLocation)(nextProps.lock)) {
      setTimeout(function () {
        if (c.phoneNumber(nextProps.lock)) {
          _this2.props.focusSubmit();
        } else {
          _this2.focusPhoneNumberInput();
        }
      }, 17);
    }
  };

  PhoneNumberPane.prototype.focusPhoneNumberInput = function focusPhoneNumberInput() {
    this.refs.phoneNumberInput.focus();
  };

  PhoneNumberPane.prototype.handlePhoneNumberChange = function handlePhoneNumberChange(e) {
    (0, _actions.changePhoneNumber)(l.id(this.props.lock), e.target.value);
  };

  PhoneNumberPane.prototype.handleLocationClick = function handleLocationClick(searchStr) {
    (0, _actions.selectPhoneLocation)(l.id(this.props.lock), searchStr);
  };

  PhoneNumberPane.prototype.render = function render() {
    var _props = this.props;
    var lock = _props.lock;
    var placeholder = _props.placeholder;
    var tabIndex = _props.tabIndex;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_location_input2.default, { value: c.phoneLocationString(lock),
        onClick: this.handleLocationClick.bind(this),
        tabIndex: l.tabIndex(lock, tabIndex) }),
      _react2.default.createElement(_phone_number_input2.default, { ref: 'phoneNumberInput',
        value: c.phoneNumber(lock),
        isValid: !c.visiblyInvalidPhoneNumber(lock),
        onChange: this.handlePhoneNumberChange.bind(this),
        autoFocus: l.ui.focusInput(lock),
        placeholder: placeholder,
        tabIndex: l.tabIndex(lock, tabIndex + 1),
        disabled: l.submitting(lock) })
    );
  };

  return PhoneNumberPane;
}(_react2.default.Component);

exports.default = PhoneNumberPane;


PhoneNumberPane.propTypes = {
  focusSubmit: _react2.default.PropTypes.func.isRequired,
  lock: _react2.default.PropTypes.object.isRequired,
  placeholder: _react2.default.PropTypes.string.isRequired,
  tabIndex: _react2.default.PropTypes.number.isRequired
};

PhoneNumberPane.defaultProps = {
  tabIndex: 1
};
