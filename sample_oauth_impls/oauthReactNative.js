const {OAuthInterface} = require('./oauthInterface.js');

exports.OAuth2ReactNative = function OAuth2ReactNative() {
  this._authMethod = 'Bearer';
};

exports.OAuth2ReactNative.prototype = Object.create(OAuthInterface);

exports.OAuth2ReactNative.prototype.buildAuthHeader = function (token) {
  return this._authMethod + ' ' + token;
};

// eslint-disable-next-line no-underscore-dangle
exports.OAuth2ReactNative.prototype._request = async function (
  method,
  url,
  headers,
  postBody,
  callback,
) {
  const respose = await fetch(url, {
    method: method,
    headers: headers,
    body: postBody,
  });
  const result = await respose.json();
  if (
    !(respose.status >= 200 && respose.status <= 299) &&
    respose.status !== 301 &&
    respose.status !== 302
  ) {
    callback({statusCode: respose.status, data: result});
  } else {
    callback(null, JSON.stringify(result), respose.status);
  }
};

exports.OAuth2ReactNative.prototype.get = function (
  url,
  accessToken,
  callback,
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
    callback,
  );
};

exports.OAuth2ReactNative.prototype.getOAuthAccessToken = function () {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(''));
  });
};
