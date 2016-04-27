'use strict';

exports.__esModule = true;
exports.login = exports.ui = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.setup = setup;
exports.id = id;
exports.clientID = clientID;
exports.domain = domain;
exports.modeName = modeName;
exports.show = show;
exports.setShow = setShow;
exports.setSubmitting = setSubmitting;
exports.submitting = submitting;
exports.setGlobalError = setGlobalError;
exports.globalError = globalError;
exports.clearGlobalError = clearGlobalError;
exports.rendering = rendering;
exports.gravatar = gravatar;
exports.invokeDoneCallback = invokeDoneCallback;
exports.shouldRedirect = shouldRedirect;
exports.render = render;
exports.modeOptions = modeOptions;
exports.close = close;
exports.reset = reset;
exports.setSignedIn = setSignedIn;
exports.signedIn = signedIn;
exports.tabIndex = tabIndex;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _media_utils = require('../utils/media_utils');

var _index = require('../icon/index');

var _index2 = require('../dict/index');

var d = _interopRequireWildcard(_index2);

var _t2 = require('../dict/t');

var _t3 = _interopRequireDefault(_t2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildSetupSnapshot(m) {
  return m.set("setupSnapshot", m);
}

function setup(attrs) {
  var clientID = attrs.clientID;
  var domain = attrs.domain;
  var id = attrs.id;

  return buildSetupSnapshot(_immutable2.default.fromJS({
    clientID: clientID,
    domain: domain,
    id: id
  }));
}

function id(m) {
  return m.get("id");
}

function clientID(m) {
  return m.get("clientID");
}

function domain(m) {
  return m.get("domain");
}

function modeName(m) {
  return modeOptions(m).get("name");
}

function show(m) {
  return m.get("show", false);
}

function setShow(m, value) {
  return m.set("show", value);
}

function setSubmitting(m, value, error) {
  m = m.set("submitting", value);
  m = error && !value ? setGlobalError(m, error) : clearGlobalError(m);
  return m;
}

function submitting(m) {
  return m.get("submitting", false);
}

function setGlobalError(m, str) {
  return m.set("globalError", str);
}

function globalError(m) {
  return m.get("globalError", "");
}

function clearGlobalError(m) {
  return m.remove("globalError");
}

function rendering(m) {
  return m.get("render", false);
}

function gravatar(m) {
  if (ui.gravatar(m)) {
    return m.get("gravatar");
  } else {
    return undefined;
  }
}

function extractUIOptions(id, modeName, options) {
  var closable = options.container ? false : undefined === options.closable ? true : !!options.closable;
  return new _immutable.Map({
    containerID: options.container || 'auth0-lock-container-' + id,
    appendContainer: !options.container,
    autoclose: undefined === options.autoclose ? false : closable && options.autoclose,
    icon: options.icon || "//cdn.auth0.com/styleguide/1.0.0/img/badge.png",
    closable: closable,
    connections: new _immutable.List(undefined === options.connections ? [] : options.connections),
    dict: d.build(modeName, _typeof(options.dict) === "object" ? options.dict : {}),
    focusInput: undefined === options.focusInput ? !(options.container || (0, _media_utils.isSmallScreen)()) : !!options.focusInput,
    gravatar: undefined === options.gravatar ? true : !!options.gravatar,
    mobile: undefined === options.mobile ? false : !!options.mobile,
    signInCallback: options.signInCallback, // TODO: this doesn't belong here
    popup: undefined === options.popup ? false : !!options.popup,
    popupOptions: new _immutable.Map(undefined === options.popupOptions ? {} : options.popupOptions),
    primaryColor: options.primaryColor && typeof options.primaryColor === "string" ? options.primaryColor : "#ea5323",
    rememberLastLogin: undefined === options.rememberLastLogin ? true : !!options.rememberLastLogin
  });
}

function setUIOptions(m, options) {
  var currentUIOptions = m.get("ui");
  var newUIOptions = extractUIOptions(id(m), modeName(m), options);;
  if (currentUIOptions) {
    (function () {
      var denied = new _immutable.Set(["containerID", "appendContainer"]);
      var provided = _immutable.Set.fromKeys(options).subtract(denied);
      newUIOptions = newUIOptions.filter(function (v, k) {
        return provided.has(k);
      });
    })();
  }
  return m.set("ui", (currentUIOptions || new _immutable.Map()).merge(newUIOptions));
}

function getUIAttribute(m, attribute) {
  return m.getIn(["ui", attribute]);
}

var ui = exports.ui = {
  containerID: function containerID(lock) {
    return getUIAttribute(lock, "containerID");
  },
  appendContainer: function appendContainer(lock) {
    return getUIAttribute(lock, "appendContainer");
  },
  autoclose: function autoclose(lock) {
    return getUIAttribute(lock, "autoclose");
  },
  icon: function icon(lock) {
    return getUIAttribute(lock, "icon");
  },
  closable: function closable(lock) {
    return getUIAttribute(lock, "closable");
  },
  connections: function connections(lock) {
    return getUIAttribute(lock, "connections");
  },
  dict: function dict(lock) {
    return getUIAttribute(lock, "dict");
  },
  t: function t(lock, keyPath, params) {
    return (0, _t3.default)(ui.dict(lock), keyPath, params);
  },
  focusInput: function focusInput(lock) {
    return getUIAttribute(lock, "focusInput");
  },
  gravatar: function gravatar(lock) {
    return getUIAttribute(lock, "gravatar");
  },
  mobile: function mobile(lock) {
    return getUIAttribute(lock, "mobile");
  },
  signInCallback: function signInCallback(lock) {
    return getUIAttribute(lock, "signInCallback");
  },
  popup: function popup(lock) {
    return getUIAttribute(lock, "popup");
  },
  popupOptions: function popupOptions(lock) {
    return getUIAttribute(lock, "popupOptions");
  },
  primaryColor: function primaryColor(lock) {
    return getUIAttribute(lock, "primaryColor");
  },
  rememberLastLogin: function rememberLastLogin(lock) {
    return getUIAttribute(lock, "rememberLastLogin");
  }
};

function getLoginAttribute(m, attribute) {
  return m.getIn(["login", attribute]);
}

// TODO: find a better name, forceJSONP is not exclusively used for login
var login = exports.login = {
  authParams: function authParams(lock) {
    return getLoginAttribute(lock, "authParams");
  },
  forceJSONP: function forceJSONP(lock) {
    return getLoginAttribute(lock, "forceJSONP");
  },
  callbackURL: function callbackURL(lock) {
    return getLoginAttribute(lock, "callbackURL");
  },
  responseType: function responseType(lock) {
    return getLoginAttribute(lock, "responseType");
  }
  // TODO: Add a function that takes an object with login parameters and adds
  // the ones above here.
};

function setLoginOptions(m, options) {
  var authParams = options.authParams;
  var callbackURL = options.callbackURL;
  var forceJSONP = options.forceJSONP;
  var responseType = options.responseType;


  authParams = (typeof authParams === 'undefined' ? 'undefined' : _typeof(authParams)) === "object" ? authParams : {};
  callbackURL = typeof callbackURL === "string" && callbackURL ? callbackURL : undefined;
  responseType = typeof responseType === "string" ? responseType : callbackURL ? "code" : "token";

  var loginOptions = (0, _immutable.Map)({
    authParams: (0, _immutable.Map)(authParams),
    callbackURL: callbackURL,
    forceJSONP: forceJSONP,
    responseType: responseType
  });

  return m.set("login", loginOptions);
}

function invokeDoneCallback(m) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  ui.signInCallback(m).apply(undefined, args);
}

function shouldRedirect(m) {
  return m.get("forceRedirect", false) || login.callbackURL(m);
}

function render(m, name, options) {
  if (modeName(m) != undefined && modeName(m) != name || show(m)) {
    return m;
  }

  var mode = options.mode || {};
  mode.name = name;

  m = m.merge(_immutable2.default.fromJS({
    mode: mode,
    render: true
  }));

  m = setUIOptions(m, options);
  m = setLoginOptions(m, options);

  return m;
}

function modeOptions(m) {
  return m.get("mode", new _immutable.Map());
}

function close(m) {
  return m.set("show", false);
}

function reset(m) {
  return buildSetupSnapshot(m.get("setupSnapshot"));
}

function setSignedIn(m, value) {
  return m.set("signedIn", value);
}

function signedIn(m) {
  return m.get("signedIn", false);
}

function tabIndex(m, n) {
  return [id(m), n > 9 ? "" : "0", n].join("");
}
