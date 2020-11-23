<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center">Login</h2>

      <md-field>
        <label class="md-danger" for="email">Email:</label>
        <md-input v-model="email" type="email"></md-input>
      </md-field>
      <md-field>
        <label class="md-danger" for="password">Password:</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>

      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field">
        <md-button class="md-raised md-primary">
          <button>Login</button>
        </md-button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$router.push({ path: "/" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}

button {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  color: white;
  font-family: Roboto, Noto Sans, -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
}
.md-button {
  float: right;
}
</style>
