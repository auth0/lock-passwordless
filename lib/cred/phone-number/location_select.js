'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _icon = require('../../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../../icon/button');

var _button2 = _interopRequireDefault(_button);

var _country_codes = require('../country_codes');

var cc = _interopRequireWildcard(_country_codes);

var _string_utils = require('../../utils/string_utils');

var su = _interopRequireWildcard(_string_utils);

var _media_utils = require('../../utils/media_utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cycle(xs, x) {
  var next = xs.skipWhile(function (y) {
    return y !== x;
  }).get(1);
  return next || xs.get(0);
}

var LocationSelect = function (_React$Component) {
  _inherits(LocationSelect, _React$Component);

  function LocationSelect(props) {
    _classCallCheck(this, LocationSelect);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { filteredCountryCodes: cc.countryCodes, highlighted: null };
    if (props.initialLocationSearchStr) {
      _this.state = _this.filter(props.initialLocationSearchStr);
    }
    return _this;
  }

  LocationSelect.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!(0, _media_utils.isSmallScreen)()) {
      setTimeout(function () {
        var node = _this2.refs.input;
        node.focus();
        if (node.setSelectionRange) {
          var length = node.value.length;
          node.setSelectionRange(length, length);
        } else {
          node.value = node.value;
        }
      }, 300);
    }
  };

  LocationSelect.prototype.render = function render() {
    var _props = this.props;
    var initialLocationSearchStr = _props.initialLocationSearchStr;
    var locationFilterInputPlaceholder = _props.locationFilterInputPlaceholder;
    var selectHandler = _props.selectHandler;
    var _state = this.state;
    var filteredCountryCodes = _state.filteredCountryCodes;
    var highlighted = _state.highlighted;


    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-select-country' },
      _react2.default.createElement(
        'div',
        { className: 'auth0-lock-search' },
        _react2.default.createElement(_button2.default, { name: 'back', onClick: this.cancel.bind(this) }),
        _react2.default.createElement(
          'div',
          { className: 'auth0-lock-input-wrap' },
          _react2.default.createElement(_icon2.default, { name: 'location' }),
          _react2.default.createElement('input', { ref: 'input',
            className: 'auth0-lock-input auth0-lock-input-search',
            defaultValue: initialLocationSearchStr,
            onChange: this.handleSearchChange.bind(this),
            onKeyDown: this.handleKeyDown.bind(this),
            type: 'text',
            placeholder: locationFilterInputPlaceholder })
        )
      ),
      _react2.default.createElement(LocationList, { countryCodes: filteredCountryCodes,
        highlighted: highlighted,
        highlightHandler: this.handleHighlight.bind(this),
        selectHandler: selectHandler })
    );
  };

  LocationSelect.prototype.filter = function filter(str) {
    var findNewHighlighted = function findNewHighlighted(countryCodes, highlighted) {
      if (countryCodes.size === 1) {
        return countryCodes.get(0);
      }

      return countryCodes.includes(highlighted) ? highlighted : null;
    };

    var filteredCountryCodes = cc.find(str);

    var highlighted = this.state.highlighted;

    var newHighlighted = findNewHighlighted(filteredCountryCodes, highlighted);

    return {
      filteredCountryCodes: filteredCountryCodes,
      highlighted: newHighlighted
    };
  };

  LocationSelect.prototype.handleSearchChange = function handleSearchChange(e) {
    this.setState(this.filter(e.target.value));
  };

  LocationSelect.prototype.handleHighlight = function handleHighlight(location) {
    this.setState({ highlighted: location });
  };

  LocationSelect.prototype.highlightPrev = function highlightPrev() {
    var _state2 = this.state;
    var filteredCountryCodes = _state2.filteredCountryCodes;
    var highlighted = _state2.highlighted;

    this.setState({ highlighted: cycle(filteredCountryCodes.reverse(), highlighted) });
  };

  LocationSelect.prototype.highlightNext = function highlightNext() {
    var _state3 = this.state;
    var filteredCountryCodes = _state3.filteredCountryCodes;
    var highlighted = _state3.highlighted;

    this.setState({ highlighted: cycle(filteredCountryCodes, highlighted) });
  };

  LocationSelect.prototype.selectHighlighted = function selectHighlighted() {
    var highlighted = this.state.highlighted;

    if (highlighted) {
      this.props.selectHandler(highlighted);
    }
  };

  LocationSelect.prototype.cancel = function cancel() {
    this.props.cancelHandler();
  };

  LocationSelect.prototype.handleKeyDown = function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.highlightNext();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.highlightPrev();
        break;
      case "Enter":
        e.preventDefault();
        this.selectHighlighted();
        break;
      case "Escape":
        e.preventDefault();
        this.cancel();
      default:
      // no-op
    }
  };

  return LocationSelect;
}(_react2.default.Component);

exports.default = LocationSelect;

var LocationList = function (_React$Component2) {
  _inherits(LocationList, _React$Component2);

  function LocationList() {
    _classCallCheck(this, LocationList);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  LocationList.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this4 = this;

    // NOTE: I've spent very little time on this. It works, but it surely can be
    // expressed more clearly.
    var highlighted = this.refs.highlighted;

    if (highlighted) {
      var scrollableNode = _reactDom2.default.findDOMNode(this);
      var highlightedNode = _reactDom2.default.findDOMNode(highlighted);
      var relativeOffsetTop = highlightedNode.offsetTop - scrollableNode.scrollTop;
      var scrollTopDelta = 0;
      if (relativeOffsetTop + highlightedNode.offsetHeight > scrollableNode.clientHeight) {
        scrollTopDelta = relativeOffsetTop + highlightedNode.offsetHeight - scrollableNode.clientHeight;
      } else if (relativeOffsetTop < 0) {
        scrollTopDelta = relativeOffsetTop;
      }

      if (scrollTopDelta) {
        this.preventHighlight = true;
        scrollableNode.scrollTop += scrollTopDelta;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(function () {
          return _this4.preventHighlight = false;
        }, 100);
      }
    }
  };

  LocationList.prototype.render = function render() {
    var _this5 = this;

    var _props2 = this.props;
    var countryCodes = _props2.countryCodes;
    var highlighted = _props2.highlighted;
    var highlightHandler = _props2.highlightHandler;
    var selectHandler = _props2.selectHandler;


    var items = countryCodes.map(function (x) {
      var props = {
        location: x,
        key: cc.locationString(x).replace(/ /g, '-'),
        highlightHandler: _this5.handleHighlight.bind(_this5),
        selectHandler: selectHandler
      };

      if (highlighted === x) {
        props.highlighted = true;
        props.ref = "highlighted";
      }

      return _react2.default.createElement(LocationListItem, props);
    });

    return _react2.default.createElement(
      'div',
      { className: 'auth0-lock-list-code', onMouseLeave: this.handleMouseLeave.bind(this) },
      _react2.default.createElement(
        'ul',
        null,
        items
      )
    );
  };

  LocationList.prototype.handleHighlight = function handleHighlight(location) {
    // TODO: This is an ugly hack to avoid highlighting the element under the
    // mouse when an arrow key trigger a scroll of the list (which in turn
    // triggers a mousemove event).
    !this.preventHighlight && this.props.highlightHandler(location);
  };

  LocationList.prototype.handleMouseLeave = function handleMouseLeave() {
    this.props.highlightHandler(null);
  };

  return LocationList;
}(_react2.default.Component);

var LocationListItem = function (_React$Component3) {
  _inherits(LocationListItem, _React$Component3);

  function LocationListItem() {
    _classCallCheck(this, LocationListItem);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  LocationListItem.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return this.props.highlighted != nextProps.highlighted;
  };

  LocationListItem.prototype.render = function render() {
    var _props3 = this.props;
    var highlighted = _props3.highlighted;
    var location = _props3.location;

    var className = highlighted ? "auth0-lock-list-code-highlighted" : "";

    return _react2.default.createElement(
      'li',
      { className: className,
        onClick: this.handleClick.bind(this),
        onMouseMove: this.handleMouseMove.bind(this) },
      cc.dialingCode(location) + ' ' + cc.isoCode(location) + ' ' + cc.country(location)
    );
  };

  LocationListItem.prototype.handleClick = function handleClick(e) {
    e.preventDefault();
    var _props4 = this.props;
    var location = _props4.location;
    var selectHandler = _props4.selectHandler;

    selectHandler(location);
  };

  LocationListItem.prototype.handleMouseMove = function handleMouseMove(e) {
    var _props5 = this.props;
    var location = _props5.location;
    var highlightHandler = _props5.highlightHandler;

    highlightHandler(location);
  };

  return LocationListItem;
}(_react2.default.Component);
