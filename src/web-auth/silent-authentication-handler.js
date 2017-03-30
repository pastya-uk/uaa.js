var IframeHandler = require('../helper/iframe-handler');

function SilentAuthenticationHandler(uaa, authenticationUrl, timeout) {
  this.uaa = uaa;
  this.authenticationUrl = authenticationUrl;
  this.timeout = timeout || 60 * 1000;
  this.handler = null;
}

SilentAuthenticationHandler.prototype.login = function (usePostMessage, callback) {
  this.handler = new IframeHandler({
    uaa: this.uaa,
    url: this.authenticationUrl,
    callback: callback,
    timeout: this.timeout,
    timeoutCallback: function () {
      callback({
        error: 'timeout',
        description: 'Timeout during authentication renew.'
      });
    },
    usePostMessage: usePostMessage || false
  });

  this.handler.init();
};

module.exports = SilentAuthenticationHandler;
