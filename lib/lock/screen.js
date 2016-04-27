'use strict';

exports.__esModule = true;

var _actions = require('./actions');

var _index = require('./index');

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(name) {
    _classCallCheck(this, Screen);

    this.name = name;
  }

  Screen.prototype.backHandler = function backHandler() {
    return null;
  };

  Screen.prototype.closeHandler = function closeHandler() {
    return _actions.closeLock;
  };

  Screen.prototype.escHandler = function escHandler() {
    return null;
  };

  Screen.prototype.submitHandler = function submitHandler() {
    return null;
  };

  Screen.prototype.renderAuxiliaryPane = function renderAuxiliaryPane() {
    return null;
  };

  Screen.prototype.renderFooterText = function renderFooterText(lock) {
    return this.t(lock, ["footerText"]);
  };

  Screen.prototype.renderHeaderText = function renderHeaderText(lock) {
    return this.t(lock, ["headerText"]);
  };

  Screen.prototype.t = function t(lock, keyPath, params) {
    return l.ui.t(lock, [this.name].concat(keyPath), params);
  };

  return Screen;
}();

exports.default = Screen;
