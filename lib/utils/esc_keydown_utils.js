'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EscKeydownUtils = function () {
  function EscKeydownUtils(f) {
    _classCallCheck(this, EscKeydownUtils);

    this.handler = function (e) {
      if (e.keyCode == 27 && e.target.tagName != "INPUT") {
        f();
      }
    };
    global.document.addEventListener('keydown', this.handler, false);
  }

  EscKeydownUtils.prototype.release = function release() {
    global.document.removeEventListener('keydown', this.handler);
  };

  return EscKeydownUtils;
}();

exports.default = EscKeydownUtils;
