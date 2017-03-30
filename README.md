![](https://cdn.auth0.com/resources/oss-source-large-2x.png)

# uaa.js

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Clientside Javascript toolkit for Uaa API

## Install

From [npm](https://npmjs.org)

```sh
npm install uaa-js
```

After installing the `uaa-js` module, you'll need bundle it up along with all of its dependencies.

## uaa.WebAuth

Provides support for all the uaa flows

### Initialize

```js
var uaa = new uaa.WebAuth({
  domain: "{YOUR_UAA_DOMAIN}",
  clientID: "{YOUR_UAA_CLIENT_ID}"
});
```

Parameters:
- **domain {REQUIRED, string}**: Your Uaa domain.
- **clientID {REQUIRED, string}**: Your Uaa client_id.
- **redirectUri {OPTIONAL, string}**: The url used as the redirectUri.
- **scope {OPTIONAL, string}**: The default scope used for all uaa.
- **audience {OPTIONAL, string}**: The default audience used for requesting access to an API.
- **responseType {OPTIONAL, string}**: The default responseType used.
- **responseMode {OPTIONAL, string}**: The default responseMode used.
- **_disableDeprecationWarnings {OPTIONAL, boolean}**: Disables the deprecation warnings, defaults to `false`.

### API

- **authorize(options)**: Redirects to `/authorize` endpoint to start the AuthN/AuthZ transaction. Once finished it will redirect back to your `redirectUri` with the result of the transaction

```js
uaa.authorize({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  responseType: 'token',
  redirectUri: 'https://example.com/auth/callback'
});
```

- **parseHash(options, callback)**: Parses the url hash of the redirect Url to extract result of the AuthN/AuthZ transaction.

```js
uaa.parseHash({}, function(err, authResult) {
  if (err) {
    return console.log(err);
  }

  uaa.client.userInfo(authResult.accessToken, function(err, user) {
    // Now you have the user information
  });
});
```

- **renewAuth(options, cb)**: Gets a new token from Uaa (the user should be authenticated using the hosted login page first)

```js
uaa.renewAuth({
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  redirectUri: 'https://example.com/auth/silent-callback',

  // this will use postMessage to comunicate between the silent callback
  // and the SPA. When false the SDK will attempt to parse the url hash
  // should ignore the url hash and no extra behaviour is needed.
  usePostMessage: true
  }, function (err, authResult) {
    // Renewed tokens or error
});
```

> ***Important:*** this will use postMessage to communicate between the silent callback and the SPA. When false the SDK will attempt to parse the url hash should ignore the url hash and no extra behaviour is needed.

The callback page should be something like the following one. It will parse the url hash and post it to the parent document:

```js
<!DOCTYPE html>
<html>
  <head>
    <script src="/uaa.js"></script>
    <script type="text/javascript">
      var uaa = new uaa.WebAuth({
        domain: '{YOUR_UAA_DOMAIN}',
        clientID: '{YOUR_UAA_CLIENT_ID}'
      });
      var result = uaa.parseHash(window.location.hash);
      if (result) {
        parent.postMessage(result, "https://example.com/"); //The second parameter should be your domain
      }
    </script>
  </head>
  <body></body>
</html>
```

- **client.login(options, cb)**: Authenticates the user with username & password in a realm using `/oauth/token`. This will not initialize a SSO session in authorization, hence can not be used along with renew auth.

```js
uaa.client.login({
  realm: 'Username-Password-Authentication', //connection name or HRD domain
  username: 'info@demica.com',
  password: 'areallystrongpassword',
  audience: 'https://mystore.com/api/v2',
  scope: 'read:order write:order',
  }, function(err, authResult) {
    // Auth tokens in the result or an error
});
```

## uaa.Authentication

Provides an API client for the Authentication API.

### Initialize

```js
var uaa = new uaa.Authentication({
  domain: "{YOUR_UAA_DOMAIN}",
  clientID: "{YOUR_UAA_CLIENT_ID}"
});
```
