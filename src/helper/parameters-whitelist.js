var objectHelper = require('../helper/object');

var token_params = [
  'realm',
  'audience',
  'client_id',
  'client_secret',
  'redirect_uri',
  'scope',
  'code',
  'grant_type',
  'username',
  'password',
  'refresh_token',
  'assertion',
  'client_assertion',
  'client_assertion_type',
  'code_verifier'
];

var authorize_params = [
  'connection',
  'connection_scope',
  'uaaClient',
  'owp',
  'client_id',
  'response_type',
  'response_mode',
  'redirect_uri',
  'audience',
  'scope',
  'state',
  'nonce',
  'display',
  'prompt',
  'max_age',
  'ui_locales',
  'claims_locales',
  'id_token_hint',
  'login_hint',
  'acr_values',
  'claims',
  'registration',
  'request',
  'request_uri',
  'code_challenge',
  'code_challenge_method'
];

function oauthAuthorizeParams(params) {
  return objectHelper.pick(params, authorize_params);
}

function oauthTokenParams(params) {
  return objectHelper.pick(params, token_params);
}

module.exports = {
  oauthTokenParams: oauthTokenParams,
  oauthAuthorizeParams: oauthAuthorizeParams
};
