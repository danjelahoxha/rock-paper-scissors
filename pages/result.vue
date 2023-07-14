<template>
  <div>
    <h1>Result</h1>
    <p>You selected: {{ playerMove }}</p>
    <p>Computer selected: {{ computerMove }}</p>
    <p>{{ result }}</p>
    <button @click="playAgain">Play Again</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerMove: this.$route.query.playerMove,
      computerMove: "",
      result: "",
    };
  },
  methods: {
    playAgain() {
      this.$router.push({ name: "index" });
    },
    getComputerMove() {
      const moves = ["rock", "paper", "scissors"];
      return moves[Math.floor(Math.random() * moves.length)];
    },
    getResult(playerMove, computerMove) {
      if (playerMove === computerMove) return "Draw";
      if (
        (playerMove === "rock" && computerMove === "scissors") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissors" && computerMove === "paper")
      ) {
        localStorage.setItem(
          "score",
          Number(localStorage.getItem("score")) + 1
        );
        return "You win!";
      }
      return "You lose";
    },
  },
  mounted() {
    if (!this.playerMove) this.$router.push({ name: "index" });
    this.computerMove = this.getComputerMove();
    this.result = this.getResult(this.playerMove, this.computerMove);
  },
};
</script>
