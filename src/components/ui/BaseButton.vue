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
  display: inline-block;
  text-decoration: none;
  font: inherit;
  padding: 0.75rem 1.5rem;
  background-color: var(--red);
  border: 1px solid var(--red);
  border-radius: 10px;
  color: var(--foreground);
  cursor: pointer;
  font-size: 1.8rem;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--darkerRed);
  border-color: var(--darkerRed);
}

.horizontalMargin {
  margin: 0 2rem;
}

.valid {
  color: var(--foregroundDark);
  background-color: var(--lightBlue);
  border: 1px solid var(--lightBlue);
}
.valid:hover,
.valid:active {
  background-color: var(--lightBlue);
  border-color: var(--lightBlue);
}
</style>
