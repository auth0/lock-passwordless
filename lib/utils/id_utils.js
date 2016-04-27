"use strict";

exports.__esModule = true;
exports.random = random;
exports.incremental = incremental;
function random() {
  return (+new Date() + Math.floor(Math.random() * 10000000)).toString(36);
}

var start = 1;
function incremental() {
  return start++;
}
