<template>
  <v-container>
    <!-- File input -->
    <v-file-input
      accept="image/*"
      label="Image input"
      v-model="images"
      multiple
    >
      <template v-slot:append>
        <v-btn @click="onSubmit" color="primary">Submit</v-btn>
      </template>
    </v-file-input>
    <!-- Display images -->
    <v-row>
      <v-col cols="2" v-for="(image, idx) in images" :key="idx">
        <v-img :ref="`image-${idx}`" :src="getImageUrl(image)" aspect-ratio="1">
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ml5 from "ml5";

import runningImage from "../../../assets/model/running.jpg";
import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

export default {
  data: () => ({
    images: null,
    poseNet: null,
    poses: []
  }),
  mounted() {
    // Initialize Posenet
    const options = {
      imageScaleFactor: 1,
      outputStride: 16,
      flipHorizontal: false,
      minConfidence: 0.5,
      maxPoseDetections: 5,
      scoreThreshold: 0.5,
      nmsRadius: 20,
      detectionType: "multiple",
      multiplier: 0.75
    };
    this.poseNet = ml5.poseNet(() => console.log("Model loaded"), options);
    this.poseNet.on("pose", this.gotPoses);
  },
  methods: {
    // Activated on submit
    async onSubmit() {
      this.poses = [];
      for (let idx = 0; idx < this.images.length; idx++) {
        this.poseNet.multiPose(this.$refs[`image-${idx}`][0].image);
      }
    },
    // Compute the image url for display
    getImageUrl: (image) => URL.createObjectURL(image),
    // Avtivated when detect a pose
    gotPoses(results) {
      this.poses.push(results);
    }
  }
};
</script>

<style></style>
