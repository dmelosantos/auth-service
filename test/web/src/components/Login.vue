<template>
    <div id="app">
        <v-app id="login">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card class="elevation-12">
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Login form</v-toolbar-title>
                                </v-toolbar>
                                <v-card-actions>
                                    <v-btn color="primary" @click="goToSignUp">Sign Up</v-btn>
                                    <v-btn color="primary" @click="goToForgetPassword">Forgot Password</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="test">Login</v-btn>
                                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="loginSuccess" :onFailure="loginFailure">Login</GoogleLogin>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
  import AWS from 'aws-sdk'
  import GoogleLogin from 'vue-google-login';

  export default {
    name: 'Login',
    components: {
      GoogleLogin
    },
    data: () => ({
      params: {
        client_id: "302533607100-qu1tpmn8mh5o0svalnjad6idn9m6s3ek.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }),
    methods: {
      test() {
          // Add the Google access token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c50fb462-23d3-445f-90ca-76719fbfe11e',
            Logins: {
              'accounts.google.com': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiMGJmMTg2NzQzNDcxYTFlZGNhYzMwNjBkMTI1NmY5ZTQwNTBiYTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzAyNTMzNjA3MTAwLXF1MXRwbW44bWg1bzBzdmFsbmphZDZpZG45bTZzM2VrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzAyNTMzNjA3MTAwLXF1MXRwbW44bWg1bzBzdmFsbmphZDZpZG45bTZzM2VrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwNTk4MjIwNjMwNDg5MzUzMDU0IiwiZW1haWwiOiJkYW5pZWxtZWxvc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IktmQVNYN0F2Q3R4YjFjTHdaX3ZrMWciLCJuYW1lIjoiRGFuaWVsIEF1Z3VzdG8gZGUgTWVsbyBTYW50b3MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUM4ZC03VmhYeW8zcGZWOXFhMnh2dG9YempZUlk2VWR1dW0yaTNfWXc9czk2LWMiLCJnaXZlbl9uYW1lIjoiRGFuaWVsIiwiZmFtaWx5X25hbWUiOiJBdWd1c3RvIGRlIE1lbG8gU2FudG9zIiwibG9jYWxlIjoicHQtQlIiLCJpYXQiOjE1NjkxNTM4ODAsImV4cCI6MTU2OTE1NzQ4MCwianRpIjoiYzEyMzM2MGVmM2YxMjZlY2UyNzczNzc0ZjUxZGQ4NGQzZDY5OTBhNyJ9.Szu8CVRXFTZxSy_Mk3Og93X76M9E-m8KrBW2EOzlaS6_7uVhpjZUvAEvqMwBlO56prOoyAwSAYhS7OnaRWDH4LWa5eO_jsgy_aCQAJgmKYx20AvzW8z71hzmwSrdFk17uSHNsQd4omza1UkTZMHncSc4gEou7UvQ47MQo2F-hGFL9g5cvv_g3p4kHVv-U86euHRybAA4kWo5yDEs2Bq-tcqHeWgczB-0RpFDp_W23mUJvyERly-Ej8FgbKcpY7z4iTu6ceWQS4WtuAzBeZD_FdFFPJusexu4wwRlI85BdoCo6Ixm1Fsfo3DGMcYk91lcvF8mAB-UE8r99ScdihbAzw'
            }
          });

          // Obtain AWS credentials
          AWS.config.credentials.get(function(result){
            // Access AWS resources here.
            console.log(AWS.config.credentials)
          });

      },
      loginSuccess(authResult) {
        if (authResult['Zi']['id_token']) {
          console.log('AAAAAAAAAAAAAAAAA')
          // Add the Google access token to the Cognito credentials login map.
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:c50fb462-23d3-445f-90ca-76719fbfe11e',
            Logins: {
              'accounts.google.com': authResult['Zi']['id_token']
            }
          });

          // Obtain AWS credentials
          AWS.config.credentials.get(function(result){
            // Access AWS resources here.
            console.log(result)
          });
        }
      },

      loginFailure() {

      },

      goToForgetPassword() {
        this.$router.push('/forgot');
      },

      goToSignUp() {
        this.$router.push('/register');
      },
    }
  };
</script>
