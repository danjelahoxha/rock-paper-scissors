<template>
  <div class="relative w-80 h-80 mx-auto">
    <GameButton
      v-for="option in options"
      :key="option.value"
      :option="option"
      @play="$emit('play', $event)"
      class="btn"
      :class="option.value"
    />
  </div>
</template>

<script>
import GameButton from "~/components/GameButton";

export default {
  name: "TriangleButtons",
  components: {
    GameButton,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.btn {
  @apply absolute;
}

.rock {
  @apply top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.paper {
  @apply bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2;
}

.scissors {
  @apply bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2;
}
</style>
