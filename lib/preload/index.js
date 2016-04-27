"use strict";

exports.__esModule = true;
exports.img = img;
function img(src, cb) {
  var img = document.createElement("img");
  img.addEventListener("load", function () {
    cb(null, img);
  });
  img.addEventListener("error", function (event) {
    cb(event);
  });
  img.src = src;
  return img;
}
