'use strict';

exports.__esModule = true;

var _auth0Js = require('auth0-js');

var _auth0Js2 = _interopRequireDefault(_auth0Js);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var _string_utils = require('../utils/string_utils');

var StringUtils = _interopRequireWildcard(_string_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth0WebAPI = function () {
  function Auth0WebAPI() {
    _classCallCheck(this, Auth0WebAPI);

    this.clients = {};
  }

  Auth0WebAPI.prototype.setupClient = function setupClient(lockID, clientID, domain) {
    // TODO: reuse clients
    this.clients[lockID] = new _auth0Js2.default({
      clientID: clientID,
      domain: domain,
      sendSDKClientInfo: true
    });
  };

  Auth0WebAPI.prototype.signIn = function signIn(lockID, options, cb) {
    var redirect = options.redirect;

    var f = loginCallback(redirect, cb);
    var client = this.clients[lockID];

    transferLoginOptionsToClient(client, options);

    delete options.redirect;

    client.login(options, f);
  };

  Auth0WebAPI.prototype.signOut = function signOut(lockID, query) {
    this.clients[lockID].logout(query);
  };

  Auth0WebAPI.prototype.startPasswordless = function startPasswordless(lockID, options, cb) {
    var client = this.clients[lockID];
    transferLoginOptionsToClient(client, options);

    client.startPasswordless(options, function (err) {
      return cb(normalizeError(err));
    });
  };

  Auth0WebAPI.prototype.parseHash = function parseHash(lockID, hash) {
    return this.clients[lockID].parseHash(hash);
  };

  Auth0WebAPI.prototype.getProfile = function getProfile(lockID, token, callback) {
    return this.clients[lockID].getProfile(token, callback);
  };

  Auth0WebAPI.prototype.getUserCountry = function getUserCountry(lockID, cb) {
    // TODO: This code belongs to Auth0.js
    var protocol = "https:";
    var domain = this.clients[lockID]._domain;
    var endpoint = "/user/geoloc/country";
    var url = joinUrl(protocol, domain, endpoint);

    (0, _reqwest2.default)({
      url: same_origin(protocol, domain) ? endpoint : url,
      method: "get",
      type: "json",
      crossOrigin: !same_origin(protocol, domain),
      success: function success(res) {
        return cb(null, res.country_code);
      },
      error: function error(err) {
        return cb(err);
      }
    });
  };

  return Auth0WebAPI;
}();

exports.default = new Auth0WebAPI();


function normalizeError(error) {
  if (!error) {
    return error;
  }

  // TODO: the following checks were copied from https://github.com/auth0/lock/blob/0a5abf1957c9bb746b0710b274d0feed9b399958/index.js#L1263-L1288
  // Some of the checks are missing because I couldn't reproduce them and I'm
  // affraid they'll break existent functionality if add them.
  // We need a better errror handling story in auth0.js.

  if (error.status === "User closed the popup window") {
    // {
    //   status: "User closed the popup window",
    //   name: undefined,
    //   code: undefined,
    //   details: {
    //     description: "server error",
    //     code: undefined
    //   }
    // }
    return {
      error: "lock.popup_closed",
      description: "Popup window closed."
    };
  }

  if (error.message === 'access_denied' || error.code === "unauthorized") {
    // NOTE: couldn't reproduce for error.message === 'access_denied' and can't
    // see the difference between the two.

    // {
    //   code: "unauthorized",
    //   details: {
    //     code: "unauthorized"
    //     error: "unauthorized"
    //     error_description: "access_denied"
    //   },
    //   name: "unauthorized"
    //   status: 401
    // }
    return {
      error: "lock.unauthorized",
      description: "Permissions were not granted."
    };
  }

  return {
    error: error.details ? error.details.error : error.statusCode || error.error,
    description: error.details ? error.details.error_description : error.error_description || error.error
  };
}

// The properties callbackOnLocationHash, callbackURL, and forceJSONP can only
// be specified when counstructing an Auth0 instance. Unfortunately we construct
// the Auth0 client along with the Lock and we don't have the values of those
// options until later when the Lock is shown. While today we may construct the
// client here, in the future that will not be possible becasue we will need to
// retrieve some client information before before we can show the Lock.
function transferLoginOptionsToClient(client, options) {
  var callbackURL = options.callbackURL;
  var forceJSONP = options.forceJSONP;
  var redirect = options.redirect;
  var responseType = options.responseType;


  client._callbackOnLocationHash = responseType === "token";
  client._callbackURL = callbackURL || client._callbackURL;
  client._shouldRedirect = redirect || responseType === "code" || !!callbackURL;
  client._useJSONP = forceJSONP;

  delete options.callbackURL;
  delete options.forceJSONP;
  delete options.responseType;
}

function loginCallback(redirect, cb) {
  if (redirect) {
    return function (error) {
      return cb(normalizeError(error));
    };
  } else {
    return function (error, profile, idToken, accessToken, state, refreshToken) {
      cb(normalizeError(error), profile, idToken, accessToken, state, refreshToken);
    };
  }
}

function joinUrl(protocol, domain, endpoint) {
  return protocol + '//' + domain + endpoint;
}

function same_origin(tprotocol, tdomain, tport) {
  var protocol = window.location.protocol;
  var domain = window.location.hostname;
  var port = window.location.port;
  tport = tport || '';

  return protocol === tprotocol && domain === tdomain && port === tport;
}
