<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #c15050;
  border: 1px solid #c15050;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
  font-size: 1.8rem;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #a04747;
  border-color: #a04747;
}

.horizontalMargin {
  margin: 0 2rem;
}

.valid {
  color: black;
  background-color: #b2deec;
  border: 1px solid #b2deec;
}
.valid:hover,
.valid:active {
  background-color: #b2deec;
  border-color: #b2deec;
}
</style>
