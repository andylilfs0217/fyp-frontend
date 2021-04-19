<template>
  <v-container id="user-profile" fluid tag="section">
    <div v-if="!start" justify="center">
      <v-row justify="center" class="display-3">
        Are you ready? Your workout will be start.
      </v-row>

      <v-row justify="center">
        <timmer :time="1" @finish="start_workout"></timmer>
      </v-row>
    </div>

    <div v-if="start && !finish">
      <v-row justify="center">
        <eachWorkout
          :photo="workoutData[process].image"
          :name="workoutData[process].name"
          @finished="updateProcess"
        ></eachWorkout>
      </v-row>
      <v-row justify="center" class="display-2">
        <span v-if="process < 5"
          >Next workout: {{ workoutData[process + 1].name }}</span
        >
        <span v-else> You are almost there </span>
      </v-row>
    </div>
    <div v-if="finish" class="display-3">
      <v-row justify="center">
        Congratulation! You have finished the workout.
      </v-row>

      <v-row justify="center">
        <img :src="require(`@/views/dashboard/program/assets/finish.jpg`)" />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import router from "@/router";
import Timmer from "@/views/dashboard/program/components/timmer.vue";
import Vue from "vue";
import CircularCountDownTimer from "vue-circular-count-down-timer";
import eachWorkout from "@/views/dashboard/program/components/each_workout.vue";
Vue.use(CircularCountDownTimer);

export default {
  components: {
    Timmer,
    eachWorkout,
  },

  data() {
    return {
      start: false,
      workoutData: [
        { id: 0, image: "beginner01.jpeg", name: "Sit up" },
        { id: 1, image: "beginner02.jpeg", name: "Flutter Kicks" },
        { id: 2, image: "beginner04.jpeg", name: "Reverse Crunch" },
        { id: 3, image: "beginner05.jpeg", name: "High Plank" },
        { id: 4, image: "beginner06.jpeg", name: "Single-Leg Sit-Up" },
        { id: 5, image: "beginner07.jpeg", name: "Double-Leg Toe Touches" },
      ],
      process: 0,
      finish: false,
    };
  },

  methods: {
    start_workout() {
      console.log("start");
      this.start = true;
    },
    updateProcess() {
      this.process++;
      if (this.process > 5) {
        this.finish = true;
      }
    },
  },
};
</script>

<style>
.photo {
  width: 100%;
}
</style>
