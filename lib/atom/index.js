"use strict";

exports.__esModule = true;
exports.default = atom;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: Hack to preload the default icon. We need to preload also custom icons
// and prevent showing the lock until they are loaded.
var img = document.createElement("img");
img.src = "//cdn.auth0.com/styleguide/1.0.0/img/badge.png";

var Atom = function () {
  function Atom(state) {
    _classCallCheck(this, Atom);

    this.state = state;
    this.watches = {};
  }

  Atom.prototype.reset = function reset(state) {
    return this._change(state);
  };

  Atom.prototype.swap = function swap(f) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return this._change(f.apply(undefined, [this.state].concat(args)));
  };

  Atom.prototype.deref = function deref() {
    return this.state;
  };

  Atom.prototype.addWatch = function addWatch(k, f) {
    // if (this.watches[key]) {
    //   console.warn(`adding a watch with an already registered key: ${k}`);
    // }
    this.watches[k] = f;
    return this;
  };

  Atom.prototype.removeWatch = function removeWatch(k) {
    // if (!this.watches[key]) {
    //   console.warn(`removing a watch with an unknown key: ${k}`);
    // }
    delete this.watches[k];
    return this;
  };

  Atom.prototype._change = function _change(newState) {
    var state = this.state;
    var watches = this.watches;

    this.state = newState;
    Object.keys(watches).forEach(function (k) {
      return watches[k](k, state, newState);
    });
    return this.state;
  };

  return Atom;
}();

function atom(state) {
  return new Atom(state);
}
