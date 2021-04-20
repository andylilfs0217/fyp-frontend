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
      { id: 0, image: "intermediate01.jpg", name: "High Lunge (Left)" },
      { id: 1, image: "intermediate02.jpg", name: "High Lunge (Right)" },
      { id: 2, image: "intermediate03.jpg", name: "Downward facing dog" },
      { id: 3, image: "intermediate04.jpg", name: "V Sit" },
      { id: 4, image: "intermediate05.jpg", name: "Side Plank (Left)" },
      { id: 5, image: "intermediate06.jpg", name: "Side Plank (Right)" },
    ],
    bannerData: {
      name: "Intermedaite workout",
      description: "This is the intermedaite workout",
      image: "intermediate.jpg",
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
