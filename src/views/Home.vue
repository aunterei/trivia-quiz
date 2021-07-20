<template>
  <div>
    <transition appear @appear="enter" :css="false">
      <div id="container">
        <h2>Duff production presents:</h2>
        <h1>VOUS CONNAISSEZ VOUS</h1>
        <base-button @click="toTeamSelection">Commencer</base-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  methods: {
    enter() {
      gsap.fromTo(
        this.$el,
        { opacity: 0 },
        { opacity: 1, duration: 2, delay: 1 }
      );
    },
    toTeamSelection() {
      this.$router.replace("/teams");
    },
  },
};
</script>

<style scoped>
#container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-family: Bright, "sans-serif";
  color: #d97642;
  font-size: 8rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 2rem;
}

/*transition the opacity when the element enters and leaves the DOM*/
.fade-enter-active,
.fade-leave-active {
  transition: 3s;
}

/*set opacity to 0 at element's entrance and exit*/
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
