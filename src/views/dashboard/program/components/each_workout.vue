<template>
  <v-container>
    <v-row justify="center">
      <timmer :time="5" justify="center" @finish="finished"></timmer>
    </v-row>

    <v-row>
      <v-col md="3" cols="6">
        {{ name }}
        <img
          class="photo"
          :src="require(`@/views/dashboard/program/assets/${photo}`)"
        />
      </v-col>
      <v-col md="3" cols="6">
        <video ref="video" id="video" class="photo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import * as ml5 from "ml5";
import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";
import Timmer from "@/views/dashboard/program/components/timmer.vue";

export default {
  components: {
    Timmer,
  },
  props: ["photo", "name"],

  data() {
    return {
      video: null,
      canvas: null,
      ctx: null,
      poseNet: null,
      pose: null,
      isPosenetOn: false,
      isWaiting: true,
      brain: null,
      trainTarget: null,
      model: null,
      metadata: null,
      weights: null,
      trainmodel: null,
      score: null,
      inputImage: null,
      //
      timmer: 5,
      next: false,
    };
  },
  methods: {
    gotPoses(poses) {
      // Reset canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (poses && poses.length > 0) {
        poses.forEach((poseEle) => {
          this.pose = poseEle.pose;
          if (!this.isWaiting) {
            let inputs = [];
            for (const i in this.pose.keypoints) {
              if (this.pose.keypoints.hasOwnProperty(i)) {
                const xyCoors = this.pose.keypoints[i];
                inputs.push(xyCoors.position.x);
                inputs.push(xyCoors.position.y);
              }
            }
            let target = [this.trainTarget];
            this.brain.addData(inputs, target);
          }

          this.drawBody();
        });
      }
    },
    finished() {
      console.log("update time");
      this.$emit("finished");
    },
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch((error) => console.error("getUserMedia() error:", error));

    // Initialize camera
    this.video = this.$refs.video;
    // Initialize canvas
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
  },
};
</script>

<style scoped>
.grid_container {
  grid-template-columns: 50% 50%;
}
.photo {
  max-height: 240px;
  max-width: 320px;
}
</style>
