<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Beginner
            </div>
          </template>
          <v-img
            :aspect-ratio="16 / 9"
            width="100%"
            src="./assets/beginner.jpg"
            @click="helloworld"
            class="photo"
          ></v-img>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Intermediate
            </div>
          </template>
          <v-img
            :aspect-ratio="16 / 9"
            width="100%"
            src="./assets/intermediate.jpg"
            @click="intermediate"
            class="photo"
          ></v-img>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="8">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Advanced
            </div>
          </template>
          <v-img
            :aspect-ratio="16 / 9"
            width="100%"
            src="./assets/advanced.jpg"
            @click="advanced"
            class="photo"
          ></v-img>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import { service } from "@/plugins/request_service";

export default {
  mounted() {
    // this.testing();
  },
  methods: {
    helloworld() {
      console.log("gotootherpage");
      router.push({ name: "Beginner" });
    },
    intermediate() {
      router.push({ name: "intermediate" });
    },
    advanced() {
      router.push({ name: "advanced" });
    }
    // testing() {
    //   console.log(service.get("/users/testing"));
    // }
  }
};
</script>

<style>
.photo {
  width: 100%;
  cursor: pointer;
}
</style>
