const {OAuthInterface} = require('./oauthInterface.js');

// controller class implementation
exports.OAuthController = function OAuthController(
  oauthImpl = new module.exports.OAuthNullImpl(),
) {
  if (oauthImpl === undefined) {
    this.oauthImpl = new module.exports.OAuthNullImpl();
  } else {
    this.oauthImpl = oauthImpl;
  }
};

exports.OAuthController.prototype.get = function (url, accessToken, callback) {
  return this.oauthImpl.get(url, accessToken, callback);
};

exports.OAuthController.prototype.buildAuthHeader = function (token) {
  return this.oauthImpl.buildAuthHeader(token);
};

exports.OAuthController.prototype._request = async function (
  method,
  url,
  headers,
  postBody,
  callback,
) {
  return this.oauthImpl._request(method, url, headers, postBody, callback);
};

exports.OAuthController.prototype.getOAuthAccessToken = function () {
  return this.getOAuthAccessToken();
};

// null implementation
exports.OAuthNullImpl = function OAuthNullImpl() {};

exports.OAuthNullImpl.prototype = Object.create(OAuthInterface);

exports.OAuthNullImpl.prototype._request = async function (
  method,
  url,
  headers,
  postBody,
  callback,
) {
  throw 'Null request impl';
};

exports.OAuthNullImpl.prototype.buildAuthHeader = function (token) {
  throw 'Null buildAuthHeader impl';
};

exports.OAuthNullImpl.prototype.get = function (url, accessToken, callback) {
  throw 'Null get impl';
};

exports.OAuthNullImpl.prototype.getOAuthAccessToken = function () {
  throw 'Null getOAuthAccessToken impl';
};
