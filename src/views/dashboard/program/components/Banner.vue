<template>
  <v-container>
    <!-- Banner image -->
    <v-img
      :src="require(`@/views/dashboard/program/assets/${banner.image}`)"
      width="100%"
      :aspect-ratio="4"
    >
      <v-btn color="primary" elevation="2" fab absolute bottom right>
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
export default {
  props: ["banner"],
  data: () => ({})
};
</script>

<style></style>
