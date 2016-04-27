'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _email_input = require('./email_input');

var _email_input2 = _interopRequireDefault(_email_input);

var _index = require('../index');

var c = _interopRequireWildcard(_index);

var _actions = require('./actions');

var _index2 = require('../../lock/index');

var l = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailPane = function (_React$Component) {
  _inherits(EmailPane, _React$Component);

  function EmailPane() {
    _classCallCheck(this, EmailPane);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  EmailPane.prototype.handleChange = function handleChange(e) {
    (0, _actions.changeEmail)(l.id(this.props.lock), e.target.value);
  };

  EmailPane.prototype.render = function render() {
    var _props = this.props;
    var lock = _props.lock;
    var placeholder = _props.placeholder;
    var tabIndex = _props.tabIndex;


    return _react2.default.createElement(_email_input2.default, { value: c.email(lock),
      isValid: !c.visiblyInvalidEmail(lock),
      onChange: this.handleChange.bind(this),
      gravatar: l.ui.gravatar(lock),
      autoFocus: l.ui.focusInput(lock),
      placeholder: placeholder,
      tabIndex: l.tabIndex(lock, tabIndex),
      disabled: l.submitting(lock) });
  };

  return EmailPane;
}(_react2.default.Component);

exports.default = EmailPane;


EmailPane.propTypes = {
  lock: _react2.default.PropTypes.object.isRequired,
  placeholder: _react2.default.PropTypes.string.isRequired,
  tabIndex: _react2.default.PropTypes.number.isRequired
};

EmailPane.defaultProps = {
  tabIndex: 1
};
