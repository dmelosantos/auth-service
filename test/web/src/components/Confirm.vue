<template>
    <div id="app">
        <v-app id="login">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card class="elevation-12">
                                <v-toolbar color="primary" dark flat>
                                    <v-toolbar-title>Sign Up</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field
                                                label="Username"
                                                name="username"
                                                prepend-icon="mdi-account"
                                                type="text"
                                                v-model="username"
                                        ></v-text-field>

                                        <v-text-field
                                                label="Confirmation Code"
                                                name="code"
                                                prepend-icon="mdi-cellphone"
                                                type="text"
                                                v-model="code"
                                        ></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" @click="back">Back</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="confirm">Confirm</v-btn>
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
  export default {
    name: 'Confirm',
    components: {},
    data: () => ({
      username: '',
      code: '',
    }),
    methods: {
      confirm() {
        const identityServiceProvider = new AWS.CognitoIdentityServiceProvider();

        const params = {
          ClientId: '5k631d5q6jvt7r2cdma3pgolsk', /* required */
          ConfirmationCode: this.code, /* required */
          Username: this.username, /* required */
        };
        const router = this.$router;
        identityServiceProvider.confirmSignUp(params, function(err, data) {
          if (err) {
            alert(err);
          }
          else {
            console.log(data)
            router.push({
              name: 'login',
              params: { username: this.username }
            });
          }
        });
      },

      back() {
        this.$router.push('/');
      },

    }
  };
</script>
