// Public API
const publicEndpoint = async (event, context) => ({ statusCode: 200, body: 'Welcome to our Public API!' });

// Private API
module.exports.privateEndpoint = (event, context) => ({
  statusCode: 403,
});
