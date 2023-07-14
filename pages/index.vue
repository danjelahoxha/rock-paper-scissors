<template>
  <div class="flex flex-col m-4 items-center">
    <header class="w-80 p-6 rounded-lg border-gray-500 border-2 mb-8">
      <div class="flex justify-between items-center mt-4">
        <ul class="flex flex-col uppercase">
          <li v-for="option in options" :key="option.value">
            {{ option.value }}
          </li>
        </ul>
        <div
          class="p-4 flex flex-col m-1 items-center rounded-lg bg-gray-200 text-blue-900"
        >
          <p class="font-bold">SCORE</p>
          <p class="text-3xl">{{ score }}</p>
        </div>
      </div>
    </header>
    <TriangleButtons :options="options" @play="play" />

    <footer class="p-6">
      <button
        @click="showRules"
        class="rounded-lg border-white border-2 py-2 px-4"
      >
        Rules
      </button>
    </footer>
  </div>
</template>

<script>
import TriangleButtons from "~/components/TriangleButtons";

export default {
  components: {
    TriangleButtons,
  },
  data() {
    return {
      options: [
        {
          value: "rock",
          iconUrl: "/images/icon-rock.svg",
          borderColor: "orange",
        },
        {
          value: "paper",
          iconUrl: "/images/icon-paper.svg",
          borderColor: "blue",
        },
        {
          value: "scissors",
          iconUrl: "/images/icon-scissors.svg",
          borderColor: "red",
        },
      ],
      score: localStorage ? Number(localStorage.getItem("score")) || 0 : 0,
    };
  },
  methods: {
    play(option) {
      this.$router.push({ name: "result", query: { playerMove: option } });
    },
    showRules() {
      // Logic for showing the rules
    },
  },
};
</script>
