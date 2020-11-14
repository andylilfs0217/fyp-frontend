<template>
  <v-container id="camera" fluid tag="section">
    <v-row>
      <v-col md="6" cols="12">
        <video ref="video" id="video" width="100%" autoplay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

export default {
  data() {
    return {
      video: {}, // Camera
    };
  },
  mounted() {
    // Get access of the camera
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
        video.onplay = function () {};
        this.video.play();
      });
    }
  },
};
</script>

<style>
</style>