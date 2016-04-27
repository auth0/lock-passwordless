"use strict";

exports.__esModule = true;

var _index = require("../store/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderScheduler = function RenderScheduler(spec) {
  _classCallCheck(this, RenderScheduler);

  (0, _index.subscribe)("main", function (key, oldState, newState) {
    spec.renderer.render(newState, spec.plugins.renderFns());
  });
};

exports.default = RenderScheduler;
