<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center" v-if="!start">
      You workout will be start in
    </v-row>
    <v-row justify="center" v-if="!start">
      <timmer :time="1" @finish="start_workout"></timmer>
    </v-row>

    <v-row justify="center" v-if="start && !finish">
      <eachWorkout
        :photo="workoutData[process].image"
        :name="workoutData[process].name"
        @finished="updateProcess"
      ></eachWorkout>
    </v-row>

    <v-row justify="center" v-if="finish">
      U have finished the workout!!
    </v-row>
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
    eachWorkout
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
        { id: 5, image: "beginner07.jpeg", name: "Double-Leg Toe Touches" }
      ],
      process: 0,
      finish: false
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
    }
  }
};
</script>

<style>
.photo {
  width: 100%;
}
</style>
