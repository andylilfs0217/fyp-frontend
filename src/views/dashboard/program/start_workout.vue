<template>
  <v-container id="user-profile" fluid tag="section">
    <div v-if="!start" justify="center">
      <v-row justify="center" class="display-3">
        Are you ready? Your workout will be start.
      </v-row>

      <v-row justify="center">
        <timmer :time="5" @finish="start_workout"></timmer>
      </v-row>
    </div>

    <div v-if="start && !finish">
      <v-row justify="center">
        <eachWorkout
          :URL="$route.query.URL"
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
        <button @click="gotodialog()">
          <img :src="require(`@/views/dashboard/program/assets/finish.jpg`)" />
        </button>
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
      process: 0,
      finish: false,
    };
  },
  mounted() {
    this.workoutData = this.$route.query.workout;
    console.log(this.workoutData);
  },
  methods: {
    gotodialog() {
      router.back(-2);
    },
    start_workout() {
      console.log("start:", this.$route.query.URL);
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
