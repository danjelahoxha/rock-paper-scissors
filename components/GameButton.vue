<template>
  <button class="btn" :class="option.value" @click="play">
    <img :src="option.iconUrl" alt="" class="w-12 h-12" />
  </button>
</template>

<script>
export default {
  name: "GameButton",
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  methods: {
    play() {
      this.$emit("play", this.option.value);
    },
  },
};
</script>

<style scoped>
.btn {
  @apply w-32 h-32 text-white rounded-full flex items-center justify-center text-center;

  -webkit-box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 3px 10px 0px rgba(0, 0, 0, 0.75);

  font-family: Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  box-sizing: border-box;
  background: #008cba;

  transition: all 0.3s ease 0s;
  position: relative;
  overflow: hidden;

  outline: none;
  cursor: pointer;
}

.btn:active {
  transform: translateY(0.2px);
}

.btn:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  transition: all 0.3s ease 0s;
}

.btn:hover {
  -webkit-box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
}

.rock {
  @apply bg-gray-100 border-green-500 border-8;
}

.paper {
  @apply bg-gray-100 border-red-500 border-8;
}

.scissors {
  @apply bg-gray-100 border-orange-500 border-8;
}
</style>
