'use strict';

exports.__esModule = true;
exports.changeVcode = changeVcode;

var _index = require('../../store/index');

var _index2 = require('../index');

var c = _interopRequireWildcard(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function changeVcode(id, vcode) {
  (0, _index.swap)(_index.updateEntity, "lock", id, c.setVcode, vcode);
}
