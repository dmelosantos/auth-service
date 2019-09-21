const jwk = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const request = require('request');
const logger = require('./logger');

// For Auth0:       https://<project>.auth0.com/
// refer to:        https://auth0.com/docs/tokens/id-tokens
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
const iss = 'https://<url>.com/';

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

/**
 * Reusable Authorizer function, set on `authorizer` field in serverless.yml
 */
const authorize = async (event) => {
  logger.info('Auth function invoked');
  if (event.authorizationToken) {
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          logger.error('Request error:', error);
          return 'Unauthorized';
        }
        // Based on the JSON of `jwks` create a Pem:
        const k = body.keys[0];
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        };
        const pem = jwkToPem(jwkArray);

        // Verify the token:
        return jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
          if (err) {
            logger.error('Unauthorized user:', err.message);
            return 'Unauthorized';
          }
          return generatePolicy(decoded.sub, 'Allow', event.methodArn);
        });
      },
    );
  } else {
    logger.error('No authorizationToken found in the header.');
    return 'Unauthorized';
  }
  return 'Unauthorized';
};

module.exports = {
  authorize,
};
