<template>
  <v-container>
    <Banner :banner="bannerData" :workout="workoutData"></Banner>
    <v-container id="user-profile" fluid tag="section" class="grid-content">
      <Workout
        v-for="workout in workoutData"
        :key="workout.id"
        class="grid-workout"
        :photo="workout.image"
        :name="workout.name"
      ></Workout> </v-container
  ></v-container>
</template>

<script>
import Workout from "@/components/base/Workout.vue";
import Banner from "@/views/dashboard/program/components/Banner.vue";

export default {
  components: {
    Workout,
    Banner,
  },
  data: () => ({
    workoutData: [
      { id: 0, image: "advanced01.jpg", name: "Squat" },
      { id: 1, image: "advanced02.jpeg", name: "Garland" },
      { id: 2, image: "advanced03.jpg", name: "Extended Side Angle (Left)" },
      { id: 3, image: "advanced04.jpg", name: "Extended Side Angle (Right)" },
      { id: 4, image: "advanced05.jpg", name: "Cobra Pose" },
      { id: 5, image: "advanced06.jpg", name: "Camel" },
    ],
    bannerData: {
      name: "Advanced workout",
      description: "This is the advanced workout",
      image: "advanced.jpg",
    },
  }),
};
</script>

<style scoped>
.photo {
  width: 100%;
}
.grid-content {
  display: grid;
  grid-template-columns: 50% 50%;
}
.timmer {
  padding-left: 10px;
}
.v-card__title {
  font-size: 18px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.grid-workout {
  padding: 5px;
}
</style>
