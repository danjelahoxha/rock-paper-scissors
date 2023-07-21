<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.wave {
  position: relative;
  animation: pulse 1s infinite;
  animation-delay: 400ms;
}
</style>
<script setup>
import { ref, onMounted, nextTick, watchEffect } from "vue";

import TriangleButtons from "~/components/TriangleButtons";

const options = [
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
];

onMounted(async () => {
  if (typeof window === "undefined") {
    return;
  }

  const { gsap } = await import("gsap");

  await nextTick();

  const buttons = document.querySelectorAll(".item button");

  // Hit Button Effect and Move Out the Button
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      gsap.fromTo(
        btn,
        { scale: 0.9 },
        { scale: 1, ease: "elastic.out(1, 0.3)" }
      );
      gsap.to(btn, { x: "100vw", duration: 1 });
    });
  });

  let waveBtn = document.querySelector(".wave");

  gsap.to(waveBtn, {
    scale: 1.1,
    repeat: -1, // infinite repeats
    yoyo: true, // makes the animation reverse on alternate repeats
    duration: 0.5,
    ease: "power1.inOut",
  });
});

watchEffect(async () => {
  if (typeof window === "undefined") {
    return;
  }

  const { gsap } = await import("gsap");

  await nextTick();

  if (gameResult.value === "You win") {
    const playerButton = document.querySelector(".playerButton");
    gsap.to(playerButton, {
      scale: 1.1,
      repeat: -1, // infinite repeats
      yoyo: true, // makes the animation reverse on alternate repeats
      duration: 0.5,
      ease: "power1.inOut",
    });
  } else if (gameResult.value === "You loose") {
    const computerButton = document.querySelector(".computerButton");
    gsap.to(computerButton, {
      scale: 1.1,
      repeat: -1, // infinite repeats
      yoyo: true, // makes the animation reverse on alternate repeats
      duration: 0.5,
      ease: "power1.inOut",
    });
  }
});

const score = ref(0);
const gameResult = ref(null);
const playerOption = ref(null);
const computerOption = ref(null);
const showGameResult = ref(false);

function calculateResult(event) {
  const comp = getComputerMove();
  const result = getResult(event, comp);

  playerOption.value = options.find((item) => item.value === event);
  computerOption.value = options.find((item) => item.value === comp);

  if (result !== -1) {
    score.value += result;
    gameResult.value = !!result ? "You win" : "You loose";
  } else {
    gameResult.value = "Draw";
  }
  setTimeout(() => {
    showGameResult.value = true;
  }, 2000);
}
function getComputerMove() {
  const moves = options.map((o) => o.value);
  return moves[Math.floor(Math.random() * moves.length)];
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) return -1;
  if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    return 1;
  }
  return 0;
}
function playAgain() {
  gameResult.value = null;
  showGameResult.value = false;
}
</script>

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

    <TriangleButtons
      v-if="!gameResult"
      :options="options"
      @play="calculateResult"
    />

    <div class="flex gap-4" v-if="gameResult">
      <div class="item flex flex-col">
        <p>You picked</p>
        <GameButton
          class="playerButton"
          :option="playerOption"
          :class="{ wave: gameResult === 'You win' }"
        />
      </div>

      <div class="item flex flex-col">
        <p>The house picked</p>
        <GameButton
          class="computerButton"
          v-if="computerOption"
          :option="computerOption"
          :class="{ wave: gameResult === 'You loose' }"
        />
      </div>
    </div>
    <div class="pt-4" v-if="showGameResult">
      <div class="item flex flex-col pt-4" v-if="showGameResult">
        <p class="uppercase text-3xl">{{ gameResult }}</p>
        <button
          class="border-white border-2 text-black py-2 px-4 font-semibold rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          @click="playAgain"
        >
          Play Again
        </button>
      </div>
    </div>

    <!-- <footer class="pt-6 mt-6">
      <button
        @click="showRules"
        class="rounded-lg border-white border-2 py-2 px-4"
      >
        Rules
      </button>
    </footer> -->
  </div>
</template>
