<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center" v-if="!start">
      You workout will be start
    </v-row>
    <v-row justify="center" v-if="!start">
      <Timmer :time-left="timeLeft()" />
    </v-row>
    <v-row justify="center" v-if="start">
      Starting workout
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import Timmer from "@/views/dashboard/program/components/timmer.vue";

export default {
  components: {
    Timmer
  },

  data() {
    return {
      timeLimit: 5,
      timePassed: 0,
      timerInterval: null,
      start: false
    };
  },

  methods: {
    timeLeft() {
      return this.timeLimit - this.timePassed;
    },

    startTimer() {
      console.log("//");
      this.timerInterval = setInterval(() => {
        this.timePassed += 1;
        if (this.timeLeft() == 0) {
          // this.next();
          this.start = true;
        }
      }, 1000);
    }
  },
  created() {
    this.countDownTimer();
  },
  mounted() {
    this.startTimer();
  }
};
</script>

<style>
.photo {
  width: 100%;
}
</style>
