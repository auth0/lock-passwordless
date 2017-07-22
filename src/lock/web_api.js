import auth0 from 'auth0-js';
import reqwest from 'reqwest';
import * as StringUtils from '../utils/string_utils';

class Auth0WebAPI {
  constructor() {
    this.clients = {};
  }

  setupClient(lockID, clientID, domain, options) {
    const default_telemetry = {
      name: 'lock-passwordless.js',
      version: __VERSION__,
      lib_version: auth0.version
    };
    this.clients[lockID] = new auth0.WebAuth({
      clientID: clientID,
      domain: domain,
      _sendTelemetry: options._sendTelemetry === false ? false : true,
      _telemetryInfo: options._telemetryInfo || default_telemetry,
      audience: options.audience,
      redirectUri: options.redirectUri,
      responseMode: options.responseMode,
      responseType: options.responseType,
      leeway: options.leeway || 1,
      ...options
    });
  }

  signIn(lockID, options, cb) {
    const f = loginCallback(cb);
    const client = this.clients[lockID];

    client.passwordlessVerify(options, f);
  }

  socialSignIn(lockID, options, cb) {
    const f = loginCallback(cb);
    const client = this.clients[lockID];

    client.authorize(options, f);
  }

  signOut(lockID, query) {
    this.clients[lockID].logout(query);
  }

  startPasswordless(lockID, options, cb) {
    const client = this.clients[lockID];

    client.passwordlessStart(options, err => cb(normalizeError(err)));
  }

  parseHash(lockID, hash, cb) {
    return this.clients[lockID].parseHash(hash, cb);
  }

  getProfile(lockID, token, callback) {
    return this.clients[lockID].getProfile(token, callback);
  }

  getUserCountry(lockID, cb) {
    // TODO: This code belongs to Auth0.js
    const protocol = 'https:';
    const domain = this.clients[lockID].baseOptions.domain;
    const endpoint = '/user/geoloc/country';
    const url = joinUrl(protocol, domain, endpoint);

    reqwest({
      url: same_origin(protocol, domain) ? endpoint : url,
      method: 'get',
      type: 'json',
      crossOrigin: !same_origin(protocol, domain),
      success: res => cb(null, res.country_code),
      error: err => cb(err)
    });
  }
}

export default new Auth0WebAPI();

function normalizeError(error) {
  if (!error) {
    return error;
  }

  // TODO: the following checks were copied from https://github.com/auth0/lock/blob/0a5abf1957c9bb746b0710b274d0feed9b399958/index.js#L1263-L1288
  // Some of the checks are missing because I couldn't reproduce them and I'm
  // affraid they'll break existent functionality if add them.
  // We need a better errror handling story in auth0.js.

  if (error.status === 'User closed the popup window') {
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
      error: 'lock.popup_closed',
      description: 'Popup window closed.'
    };
  }

  if (error.message === 'access_denied' || error.code === 'unauthorized') {
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
      error: 'lock.unauthorized',
      description: 'Permissions were not granted.'
    };
  }

  return {
    error: error.details ? error.details.error : error.statusCode || error.error,
    description: error.details
      ? error.details.error_description
      : error.error_description || error.error
  };
}

function loginCallback(redirect, cb) {
  return (error, profile, idToken, accessToken, state, refreshToken) => {
    cb(normalizeError(error), profile, idToken, accessToken, state, refreshToken);
  };
}

function joinUrl(protocol, domain, endpoint) {
  return protocol + '//' + domain + endpoint;
}

function same_origin(tprotocol, tdomain, tport) {
  const protocol = window.location.protocol;
  const domain = window.location.hostname;
  const port = window.location.port;
  tport = tport || '';

  return protocol === tprotocol && domain === tdomain && port === tport;
}
