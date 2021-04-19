<template>
  <v-container>
    <Banner :banner="bannerData"></Banner>
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
      { id: 0, image: "beginner01.jpeg", name: "Half Foward Bend" },
      { id: 1, image: "beginner02.jpeg", name: "Bridge Pose" },
      { id: 2, image: "beginner04.jpeg", name: "Forearm Plank" },
      { id: 3, image: "beginner05.jpeg", name: "Child Pose" },
      { id: 4, image: "beginner06.jpeg", name: "Tree Pose (Left)" },
      { id: 5, image: "beginner07.jpeg", name: "Tree Pose (Right)" },
    ],
    bannerData: {
      name: "Beginner workout",
      description: "This is the beginner workout",
      image: "beginner.jpg",
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
