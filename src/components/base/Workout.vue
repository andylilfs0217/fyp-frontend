<template>
  <div>
    <v-card>
      <button @click="details">
        <img
          class="photo"
          :src="require(`@/views/dashboard/program/assets/${photo}`)"
        />
      </button>
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
  props: ["photo", "name"],
  methods: {
    details() {
      router.push({ name: "Details" });
    },
  },
};
</script>

<style scoped>
.photo {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
</style>
