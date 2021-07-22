<template>
  <div>
    <transition appear @appear="enter" :css="false">
      <div id="container">
        <h2>Duff production presents:</h2>
        <h1 class="uppercase">Vous connaissez vous</h1>
        <base-button link :to="teamSelection">
          Commencer
        </base-button>
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
  },
  computed: {
    teamSelection() {
      return "/teams";
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
  font-size: 8rem;
  color: var(--orange);
  margin-bottom: 2rem;
}

h2 {
  font-size: 2rem;
}
</style>
