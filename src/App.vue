<template>
  <router-view v-slot="slotProps">
    <transition
      @enter="(el, done) => enter(el, done)"
      @leave="(el, done) => leave(el, done)"
      mode="out-in"
    >
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>

  <div id="fullBackground"></div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      fullBackground: null,
    };
  },
  mounted() {
    this.fullBackground = document.getElementById("fullBackground");
  },
  methods: {
    enter(_, done) {
      new gsap.timeline({ onComplete: done }).to(this.fullBackground, {
        xPercent: 0,
        duration: 1.5,
        delay: 0.5,
      });
    },
    leave(_, done) {
      new gsap.timeline({ onComplete: done }).to(this.fullBackground, {
        xPercent: 100,
        duration: 1.5,
      });
    },
  },
};
</script>

<style>
#fullBackground {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 5000;
  background-color: #d97642;
  right: 100%;
  top: 0;
}

@font-face {
  font-family: BrandonBold;
  src: url("assets/brandon-black.otf") format("opentype");
}
@font-face {
  font-family: Bright;
  src: url("assets/Bright.otf") format("opentype");
}
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap");

/*
***
* DEFAULT STYLE REMOVING
***
*/

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}

html {
  font-size: 62.5%;
  font-family: "BrandonBold", sans-serif;
  background-color: #352e6b;
  color: white;
}

body {
  margin: 0;
}

/*
***
* FONT
***
*/

.uppercase {
  text-transform: uppercase;
}

/*
***
* FLEX BOX
***
*/

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

/*
***
* ALIGNEMENT
***
*/

.center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.right {
  justify-content: flex-end;
}

.bottom {
  align-items: flex-end;
}

.space-between {
  justify-content: space-between;
}

/*
***
* ROUTE ANIMATION
***
*/

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
