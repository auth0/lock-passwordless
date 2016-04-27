"use strict";

exports.__esModule = true;
exports.STRATEGIES = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.displayName = displayName;
exports.validateSocialOptions = validateSocialOptions;
exports.processSocialOptions = processSocialOptions;
exports.useBigButtons = useBigButtons;

var _index = require("../lock/index");

var l = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var STRATEGIES = exports.STRATEGIES = {
  "amazon": "Amazon",
  "aol": "Aol",
  "baidu": "百度",
  "box": "Box",
  "dwolla": "Dwolla",
  "ebay": "ebay",
  "exact": "Exact",
  "facebook": "Facebook",
  "fitbit": "Fitbit",
  "github": "GitHub",
  "google-openid": "Google OpenId",
  "google-oauth2": "Google",
  "instagram": "Instagram",
  "linkedin": "LinkedIn",
  "miicard": "miiCard",
  "paypal": "PayPal",
  "planningcenter": "Planning Center",
  "renren": "人人",
  "salesforce": "Salesforce",
  "salesforce-community": "Salesforce Community",
  "salesforce-sandbox": "Salesforce (sandbox)",
  "shopify": "Shopify",
  "soundcloud": "Soundcloud",
  "thecity": "The City",
  "thecity-sandbox": "The City (sandbox)",
  "thirtysevensignals": "37 Signals",
  "twitter": "Twitter",
  "vkontakte": "vKontakte",
  "windowslive": "Microsoft Account",
  "wordpress": "Wordpress",
  "yahoo": "Yahoo!",
  "yammer": "Yammer",
  "yandex": "Yandex",
  "weibo": "新浪微博"
};

function displayName(connection) {
  return STRATEGIES[connection.strategy];
}

function validateSocialOptions(options) {
  var connections = options.connections;

  if (!Array.isArray(connections) || connections.length === 0) {
    throw new Error("The `connections` option array needs to be provided with at least one connection.");
  }

  connections.forEach(function (x) {
    if (typeof x === "string") {
      if (!STRATEGIES[x]) {
        throw new Error("An unknown \"" + x + "\" connection was provided.");
      }
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && typeof x.name === "string" && typeof x.strategy === "string") {
      if (!STRATEGIES[x.strategy]) {
        throw new Error("A connection with an unknown \"" + x.strategy + "\" strategy was provided.");
      }
    } else {
      throw new Error("A connection with an invalid format was provided. It must be a string or an object with name and strategy properties.");
    }
  });
}

function processSocialOptions(options) {
  validateSocialOptions(options);

  var connections = options.connections;
  var socialBigButtons = options.socialBigButtons;


  options.connections = connections.map(function (x) {
    return typeof x === "string" ? { name: x, strategy: x } : x;
  });

  options.mode.socialBigButtons = socialBigButtons === undefined ? connections.length <= 3 : socialBigButtons;

  return options;
}

function useBigButtons(m) {
  return l.modeOptions(m).get("socialBigButtons", true);
}
