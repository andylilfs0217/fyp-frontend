<template>
  <v-container>
    <!-- Banner image -->
    <v-img
      :src="require(`@/views/dashboard/program/assets/${banner.image}`)"
      width="100%"
      :aspect-ratio="4"
    >
      <v-btn
        class="play_button"
        color="primary"
        elevation="2"
        fab
        absolute
        bottom
        right
        @click="startWorkout()"
      >
        <v-icon color="white" large>mdi-play</v-icon>
      </v-btn>
    </v-img>
    <!-- Title -->
    <h1>{{ banner.name }}</h1>
    <!-- Description -->
    <p>{{ banner.description }}</p>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  props: ["banner", "workout"],
  data: () => ({}),
  methods: {
    startWorkout() {
      console.log("Banner:", this.workout);
      router.push({ name: "start", query: this.workout });
    },
  },
};
</script>

<style>
.play_button {
  margin-bottom: 35px !important;
}
</style>
