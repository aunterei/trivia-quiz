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
/*
***
* FONT
***
*/

@font-face {
  font-family: CocogooseBold;
  src: url("assets/fonts/Cocogoose Classic Bold.otf") format("opentype");
}

@font-face {
  font-family: Bright;
  src: url("assets/fonts/Bright.otf") format("opentype");
}

.uppercase {
  text-transform: uppercase;
}

/*
***
* TRANSITION BACKGROUND
***
*/

#fullBackground {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 5000;
  background-color: var(--orange);
  right: 100%;
  top: 0;
}

/*
***
* VARIABLES
***
*/

:root {
  --orange: #d97642;
  --yellow: #d49d42;
  --purple: #352e6b;
  --red: #c15050;
  --darkerRed: #a04747;
  --lightBlue: #b2deec;
  --lightGray: #7a848d;
  --foreground: white;
  --foregroundDark: black;
}

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
  font-family: "CocogooseBold", sans-serif;
  background-color: var(--purple);
  color: var(--foreground);
}

body {
  margin: 0;
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

.text-center {
  text-align: center;
}
</style>
