<template>
  <div class="navigation">
    <nav class="navbar">
      <div
        class="container"
        style="height: 80px; line-height: 80px; width: 100%; border-radius: 0px; padding: 0;"
      >
        <router-link
          to="/"
          style="font-size: 2em; font-weight: bold; color: white; padding-left: 30px; text-decoration: none;"
        >
          <img
            src="../../assets/sun.png"
            style="height: 50px; width: auto; padding-bottom: 10px; margin-right: 10px;"
          />
          <span>Weather app</span>
        </router-link>
        <ul class="navigation-list">
          <div v-if="email">
            <li class="navigation-list-item">
              <a class="menu-email">{{ email }}</a>
            </li>
            <li class="navigation-list-item">
              <router-link :to="{ name: 'Settings' }" class="menu-item"
                >Settings</router-link
              >
            </li>
            <li class="navigation-list-item">
              <a @click="logout" class="menu-item">Logout</a>
            </li>
          </div>

          <div v-else>
            <li class="navigation-list-item">
              <router-link :to="{ name: 'Signup' }" class="menu-item"
                >Signup</router-link
              >
            </li>
            <li class="navigation-list-item">
              <router-link :to="{ name: 'Login' }" class="menu-item"
                >Login</router-link
              >
            </li>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      email: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: "/login" });
        });
    }
  },
  created() {
    let user = firebase.auth().currentUser;

    if (user) {
      this.email = user.email;
    } else {
      this.email = "";
    }
  }
};
</script>

<style>
.container {
  background: #2c3e50;
  font-family: Roboto, Noto Sans, -apple-system, BlinkMacSystemFont, sans-serif;
  color: white !important;
}

.container:hover {
  text-decoration: none;
}

.container2 ul {
  list-style-type: none;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  float: right;
}

.navigation-list {
  height: 50px;
  line-height: 50px;
  border-radius: 15px;
  margin: 15px 15px 0 0;
  background-color: #424242;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
}

.navigation-list-item {
  padding: 0px;
}

li {
  float: left;
}

li {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.menu-item {
  color: white !important;
  text-decoration: none !important;
  padding: 16px;
}

.menu-email {
  color: white !important;
  text-decoration: none !important;
  padding: 16px 20px;
}

/* Change the link color to #111 (black) on hover */
li:hover {
  background-color: #111;
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  .container span {
    display: none;
  }
}
</style>
