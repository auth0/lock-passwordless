"use strict";

exports.__esModule = true;
exports.isSmallScreen = isSmallScreen;
function isSmallScreen() {
  return window.matchMedia && !window.matchMedia("(min-width: 380px)").matches;
}
