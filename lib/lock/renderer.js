'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _container_manager = require('./container_manager');

var _container_manager2 = _interopRequireDefault(_container_manager);

var _lock = require('./lock');

var _lock2 = _interopRequireDefault(_lock);

var _index = require('./index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../cred/index');

var c = _interopRequireWildcard(_index2);

var _index3 = require('../gravatar/index');

var g = _interopRequireWildcard(_index3);

var _index4 = require('../store/index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this.containerManager = new _container_manager2.default();
  }

  Renderer.prototype.render = function render(state, fns) {
    var _this = this;

    var locks = (0, _index4.getCollection)(state, "lock");

    locks.forEach(function (lock) {
      if (l.rendering(lock)) {
        var gravatar = (0, _index4.getEntity)(state, "gravatar", g.normalizeGravatarEmail(c.email(lock)));
        lock = lock.set("gravatar", gravatar && g.loaded(gravatar) ? gravatar : null);
        var container = _this.containerManager.ensure(l.ui.containerID(lock), l.ui.appendContainer(lock));
        var screen = fns.get(l.modeName(lock))(lock);
        var props = {
          auxiliaryPane: screen.renderAuxiliaryPane(lock),
          backHandler: screen.backHandler(lock),
          closeHandler: screen.closeHandler(lock),
          contentRender: screen.render.bind(screen),
          footerText: screen.renderFooterText(lock),
          headerText: screen.renderHeaderText(lock),
          lock: lock,
          screenName: screen.name,
          submitHandler: screen.submitHandler(lock)
        };
        _reactDom2.default.render(_react2.default.createElement(_lock2.default, props), container);
      } else {
        var _container = void 0;
        try {
          _container = _this.containerManager.ensure(l.ui.containerID(lock));
        } catch (e) {
          // do nothing if container doesn't exist
        }
        _container && _reactDom2.default.unmountComponentAtNode(_container);
      }
    });

    var node = global.document.getElementsByTagName("html")[0];
    var className = "auth0-lock-html";

    var includeClass = locks.some(function (m) {
      return l.rendering(m) && l.ui.appendContainer(m);
    });

    if (includeClass) {
      _CSSCore2.default.addClass(node, className);
    } else {
      _CSSCore2.default.removeClass(node, className);
    }
  };

  return Renderer;
}();

exports.default = Renderer;
