<template>
  <div class="input-group">
    <input
      autocomplete="off"
      v-model="textMessage"
      v-on:keyup="emitToParent"
      v-on:keyup.enter="submit"
      class="form-control"
      type="text"
      :name="placeholder"
      :id="placeholder"
      required="required"
      :placeholder="placeholder"
    />
    <label :for="placeholder">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      textMessage: "",
    };
  },
  methods: {
    emitToParent() {
      this.$emit("emitText", this.textMessage);
    },
    submit() {
      this.$emit("submit", this.textMessage);
    },
    clearText() {
      this.textMessage = "";
    },
  },
};
</script>

<style scoped>
.input-group {
  display: block;
  width: 100%;
  height: 70px;
  border: 0;
  background-color: var(--foreground);
  border-radius: 22px;

  position: relative;
  font-size: 17px;
  color: var(--lightGray);

  transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
    box-shadow 0.1s ease-in-out;
}

.input-group input {
  position: absolute;
  border: 0;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0);
  top: 0;
  height: 65px;
  width: 100%;
  padding: 0 53px;
  box-sizing: border-box;
  z-index: 3;
  display: block;
  color: var(--foregroundDark);
  font-size: 17px;
  font-family: "CocogooseBold", sans-serif;

  transition: top 0.1s ease-in-out;
}

.input-group input::placeholder {
  color: rgba(0, 0, 0, 0);
}

.input-group input:focus,
.input-group input:not(:placeholder-shown) {
  top: 17px;
}

.input-group label {
  position: absolute;
  border: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 53px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  cursor: text;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  bottom: 20px;
  font-size: 13px;
  opacity: 0.7;
}
</style>
