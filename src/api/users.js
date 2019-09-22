const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const signUp = async (event) => {
  console.log(process.env)
  const poolData = {
    UserPoolId: process.env.COGNITO_POOL_USER_ID,
    ClientId: process.env.COGNITO_USER_CLIENT_ID,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const payload = event.body;

  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: payload.email,
  };
  const dataPhoneNumber = {
    Name: 'phone_number',
    Value: payload.phone,
  };
  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);

  userPool.signUp('username', 'password', attributeList, null, function(err, result){
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());

    return {
      statusCode: 200,
    };
  });


};

// Private API
module.exports.privateEndpoint = (event, context) => ({
  statusCode: 403,
});

module.exports = {
  signUp,
};
