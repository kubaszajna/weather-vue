<template>
  <div class="wrapper_nav">
    <div class="wrapper">
      <Navbar />
      <div id="app" class="container container-main">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  mounted() {
    this.$store.commit("SET_CITIES", this.$storage.get("cities") || []);
  }
};
</script>

<style lang="scss">
#app {
  @media screen and (max-width: 800px) {
    margin: auto 15px;
  }
}
.wrapper {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #e67e22, #e74c3c);
  display: flex;
}

.navbar {
  position: absolute;
  width: 100%;
}

.container {
  padding: 0 25px;
  margin: auto;
  background: #2c3e50;
  border-radius: 25px;
  padding-bottom: 20px;
}
.container-main {
  width: 800px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
