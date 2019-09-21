# Cognito Account Creation using Serverless

This project is built to demonstrate the account creation using Cognito and Serverless

This is an Serverless project which creates an Cloudformation and then deploys the whole stack.

So it is not necessary any manual action on the server.

Just deploy, and start using the endpoints.

# Installation

Git clone the project

Install serverless global

```shell script
npm install -g serverless
```

```shell script
npm install
```

To run it locally, install DynamoDB local first

```shell script
sls dynamodb install
```

then run the script

```shell script
sls offline start
```

The script of offline start will auto-start the DynamoDB

You will see the local URLs printed in the console
