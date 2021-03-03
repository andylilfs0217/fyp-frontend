<template>
  <v-container>
    <!-- File input -->
    <v-file-input
      accept="image/*"
      label="Image input"
      v-model="images"
      multiple
    ></v-file-input>
    <v-btn @click="submitImage" color="primary">Submit</v-btn>
  </v-container>
</template>

<script>
import * as ml5 from "ml5";

import runningImage from "../../../assets/model/running.jpg";
import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

export default {
  data() {
    return {
      images: null,
      poseNet: null,
      poses: []
    };
  },
  mounted() {},
  methods: {
    // Initialize Posenet
    async submitImage() {
      const options = {
        imageScaleFactor: 1,
        outputStride: 16,
        flipHorizontal: false,
        minConfidence: 0.05,
        maxPoseDetections: 5,
        scoreThreshold: 0.05,
        nmsRadius: 20,
        detectionType: "multiple",
        multiplier: 0.75
      };
      this.poseNet = await ml5.poseNet(this.modelReady, options);
      this.poseNet.on("pose", function(results) {
        console.log(results);
      });
    },
    modelReady() {
      console.log("Model loaded");
      this.poseNet.multiPose(runningImage);
    }
  }
};
</script>

<style></style>
