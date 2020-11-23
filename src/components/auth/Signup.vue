<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center">Signup</h2>

      <md-field>
        <label class="md-danger" for="email">Email:</label>
        <md-input v-model="email" type="email"></md-input>
      </md-field>
      <md-field>
        <label class="md-danger" for="password">Password:</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>
      <md-field>
        <label class="md-danger" for="alias">Alias:</label>
        <md-input v-model="alias"></md-input>
      </md-field>

      <!-- <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>-->

      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <!-- <md-button class="btn md-raised md-primary">Signup</md-button> -->
        <md-button class="btn md-raised md-primary">
          <button>Signup</button>
        </md-button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase, { firestore } from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@']/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exists";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ path: "/" });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "This alias is free to use";
          }
        });
      } else {
        this.feedback = "You must enter an alias";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
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
