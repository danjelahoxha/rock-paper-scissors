<template>
  <button class="btn" @click="play">
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
  @apply w-24 h-24 text-white rounded-full flex items-center justify-center text-center;
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
