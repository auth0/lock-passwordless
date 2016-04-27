"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LockContainerManager = function () {
  function LockContainerManager() {
    _classCallCheck(this, LockContainerManager);

    this.cache = {};
  }

  LockContainerManager.prototype.ensure = function ensure(id, create) {
    var container = this.cache[id];
    if (!container) {
      container = this.cache[id] = document.getElementById(id);
    }
    if (!container) {
      if (create) {
        container = document.createElement('div');
        container.id = id;
        container.className = "auth0-lock-container";
        this.cache[id] = document.body.appendChild(container);
      } else {
        throw new Error("Can't find element with id " + id);
      }
    }
    return container;
  };

  return LockContainerManager;
}();

exports.default = LockContainerManager;
