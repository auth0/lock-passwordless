'use strict';

exports.__esModule = true;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginManager = function () {
  function PluginManager(proto) {
    _classCallCheck(this, PluginManager);

    this.proto = proto;
    this.plugins = new _immutable.Map({});
  }

  PluginManager.prototype.register = function register(pluginClass) {
    var plugin = new pluginClass();
    var name = plugin.name;

    this.plugins = this.plugins.set(name, plugin);
    this.proto[name] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var isOpen = plugin.open.apply(plugin, [this.id].concat(args));
      if (isOpen) {
        this.plugin = name;
      }

      return isOpen;
    };
  };

  PluginManager.prototype.renderFns = function renderFns() {
    return this.plugins.map(function (plugin) {
      return plugin.render;
    });
  };

  PluginManager.prototype.closeFn = function closeFn(name) {
    return this.plugins.get(name).close;
  };

  return PluginManager;
}();

exports.default = PluginManager;
