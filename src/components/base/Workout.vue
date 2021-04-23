<template>
  <div class="workout-card">
    <v-card>
      <!-- <button @click="details">
        <img
          class="photo"
          :src="require(`@/views/dashboard/program/assets/${photo}`)"
        />
      </button> -->
      <v-img
        :aspect-ratio="16 / 9"
        class="photo"
        width="100%"
        :src="require(`@/views/dashboard/program/assets/${photo}`)"
        @click="details"
      ></v-img>
      <v-card-title>
        {{ name }}
        <div class="timmer">
          <v-icon class="mr-1" small>
            mdi-clock-outline
          </v-icon>

          <span class="caption grey--text font-weight-light">30s</span>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "workout",
  props: ["photo", "name", "URL", "workoutdetails"],
  methods: {
    details() {
      // console.log(
      //   "details??????????/",
      //   this.workoutdetails,
      //   this.URL,
      //   this.photo
      // );
      router.push({
        name: "Details",
        query: {
          name: this.name,
          URL: this.URL,
          photo: this.photo,
          workoutdetails: this.workoutdetails
        }
      });
    }
  }
};
</script>

<style scoped>
.workout-card {
  padding: 10px;
}
.photo {
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
}
</style>
