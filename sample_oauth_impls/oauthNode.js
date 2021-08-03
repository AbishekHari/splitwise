/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { OAuthInterface } = require('../src/oauth/oauthInterface.js');
const { OAuth2 } = require('oauth');

exports.OAuth2Node = function OAuth2Node(consumerKey, consumerSecret) {
  this._authMethod = 'Bearer';
  this.oauth2 = new OAuth2(
    consumerKey,
    consumerSecret,
    'https://secure.splitwise.com/',
    null,
    'oauth/token',
    null
  );
};

exports.OAuth2Node.prototype = Object.create(OAuthInterface);

exports.OAuth2Node.prototype.buildAuthHeader = function (token) {
  return `${this._authMethod} ${token}`;
};

// eslint-disable-next-line no-underscore-dangle
exports.OAuth2Node.prototype._request = async function (
  method,
  url,
  headers,
  postBody,
  callback
) {
  return this.oauth2(method, url, headers, postBody, '', callback);
};

exports.OAuth2Node.prototype.get = function (
  url,
  accessToken,
  callback
) {
  // eslint-disable-next-line no-underscore-dangle
  return this._request(
    'GET',
    url,
    {
      Accept: 'application/json',
      Authorization: this.buildAuthHeader(accessToken),
    },
    '',
    callback
  );
};

exports.OAuth2Node.prototype.getOAuthAccessToken = function () {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(''));
  });
};
