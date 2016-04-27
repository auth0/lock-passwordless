"use strict";

exports.__esModule = true;
exports.openLocationSelect = openLocationSelect;
exports.closeLocationSelect = closeLocationSelect;
exports.initialLocationSearchStr = initialLocationSearchStr;
exports.selectingLocation = selectingLocation;
function openLocationSelect(m, searchStr) {
  m = m.set("selectingLocation", true);
  if (searchStr && typeof searchStr === "string") {
    m = m.set("initialLocationSearchStr", searchStr);
  }

  return m;
}

function closeLocationSelect(m) {
  m = m.remove("selectingLocation");
  m = m.remove("initialLocationSearchStr");

  return m;
}

function initialLocationSearchStr(m) {
  return m.get("initialLocationSearchStr", "");
}

function selectingLocation(m) {
  return m.get("selectingLocation", false);
}
