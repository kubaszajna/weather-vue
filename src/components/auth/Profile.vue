<template>
  <div class="products">
    <div class="container">
      <md-tabs md-sync-route md-alignment="centered">
        <md-tab id="tab-home" class="tab-home-profile"  md-label="Profile" exact>
          <div class="md-layout md-gutter" >
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  v-model="profile.name"
                  name=""
                  placeholder="Full name"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  v-model="profile.phone"
                  placeholder="Phone"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  v-model="profile.address"
                  placeholder="Address"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  v-model="profile.postcode"
                  placeholder="Postcode"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <md-button class="md-raised md-primary" @click="updateProfile"
            >Save Changes</md-button
          >
        </md-tab>

        <md-tab id="tab-pages" md-label="Account">
          <p>
            Please use the Reset password email button for reseting the password.
          </p>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  placeholder="User name"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  placeholder="Email address"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  placeholder="New password"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <md-input
                  type="text"
                  placeholder="Confirm password"
                  class="form-control"
                ></md-input>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label>Upload files</label>
                <md-file placeholder="Choose file" />
              </md-field>
            </div>
          </div>
          <md-button class="md-raised md-primary" @click="updateProfile"
            >Save Changes</md-button
          >
          <md-button class="md-raised md-accent" @click="resetPassword"
            >Reset password email</md-button
          >
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  name: 'Profile',
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
        postcode: null,
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
      },
    };
  },
  firestore() {
    const user = firebase.auth().currentUser;
    return {
      profile: firebase.collection('profiles').doc(user.uid),
    };
  },
  methods: {
    resetPassword() {
      const auth = firebase.auth();
      auth.sendPasswordResetEmail(auth.currentUser.email).catch((error) => {
        console.log(error);
      });
    },
    updateProfile() {
      this.$firestore.profile.update(this.profile);
    },
    uploadImage() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orders {
  margin: 0 80px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.tab-home-profile {
  .md-field {
    margin: 0;
  }
}
</style>

<style lang="scss">
.container {
  .md-tabs.md-theme-default .md-tabs-navigation {
    background-color: #2c3e50;
  }
  .md-content.md-theme-default {
    background-color: #2c3e50 !important;
  }
}
</style>
