'use strict';

exports.__esModule = true;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.swap = swap;
exports.updateEntity = updateEntity;
exports.setEntity = setEntity;
exports.read = read;
exports.getEntity = getEntity;
exports.getCollection = getCollection;
exports.removeEntity = removeEntity;
exports.getState = getState;

var _index = require('../atom/index');

var _index2 = _interopRequireDefault(_index);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _index2.default)(new _immutable.Map({}));

function subscribe(key, f) {
  store.addWatch(key, f);
}

function unsubscribe(key) {
  store.removeWatch(key);
}

function swap() {
  return store.swap.apply(store, arguments);
}

function updateEntity(state, coll, id, f) {
  for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  return state.updateIn([coll, id], new _immutable.Map({}), function (x) {
    return f.apply(undefined, [x].concat(args));
  });
}

function setEntity(state, coll, id, m) {
  if (m === undefined) {
    m = id;
    id = 0;
  }

  return state.setIn([coll, id], m);
}

function read(f) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return f.apply(undefined, [store.deref()].concat(args));
}

function getEntity(state, coll) {
  var id = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return state.getIn([coll, id]);
}

function getCollection(state, coll) {
  return state.get(coll);
}

function removeEntity(state, coll) {
  var id = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return state.removeIn([coll, id]);
}

// function updateCollection(coll, f, ...args) {
//   store.swap(state => state.update(coll, xs => f(xs, ...args)));
// }
//
// function updateFilteredCollection(coll, pred, f, ...args) {
//   updateCollection(coll, xs => xs.merge(xs.filter(pred).map(x => f(x, ...args))));
// }

function getState() {
  return store.deref();
}

// DEV
// store.addWatch("keepHistory", (key, oldState, newState) => {
//   if (!global.window.h) global.window.h = []; global.window.h.push(newState);
//   console.debug("something changed", newState.toJS());
// });
