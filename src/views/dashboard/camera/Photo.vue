<template>
  <v-container>
    <v-row v-if="!isClassifying">
      <!-- Class name / training target -->
      <v-col cols="4">
        <v-text-field
          v-model="className"
          label="Training target"
          clearable
        ></v-text-field>
      </v-col>
      <!-- File input -->
      <v-col cols="8">
        <v-file-input
          accept="image/*"
          label="Image input"
          v-model="imageList"
          multiple
        >
          <template v-slot:append>
            <v-btn
              @click="onAdd"
              color="primary"
              small
              :disabled="!className || !imageList"
            >
              Add
            </v-btn>
          </template>
        </v-file-input>
      </v-col>
      <!-- Display images -->
      <v-col cols="2" v-for="(image, imageIdx) in imageList" :key="imageIdx">
        <v-container>
          <v-img
            :ref="`image-${imageIdx}`"
            :src="getImageUrl(image)"
            aspect-ratio="1"
          >
          </v-img>
        </v-container>
      </v-col>
    </v-row>
    <!-- Display added classes -->
    <div>
      Added classes ({{ classList.length }}):
      <a v-for="className in classList" :key="className" style="color: black">
        {{ className }},
      </a>
    </div>
    <!-- Train model button -->
    <v-btn
      color="primary"
      @click="trainModel"
      :disabled="classList.length < 2"
      v-if="!isClassifying"
    >
      Get models
    </v-btn>
    <!-- <v-btn color="primary" @click="usePreset" v-if="!isClassifying">
      Use preset models
    </v-btn> -->
    <!-- Classify poses of the webcam -->
    <v-row>
      <!-- Camera -->
      <v-col cols="12" sm="6">
        <video width="100%" height="100%" id="camera" />
      </v-col>
      <v-col cols="12" sm="6">
        <!-- Pose -->
        <div>Your pose: {{ classify.class }}</div>
        <!-- Score -->
        <div>Your score: {{ classify.score }}</div>
        <v-progress-linear
          color="red darken-2"
          height="20"
          rounded
          :value="classify.score"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ml5 from "ml5";
import * as tmPose from "@teachablemachine/pose";

import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

export default {
  data: () => ({
    imageList: null, // all image input
    poseNet: null, // ml5 poseNet
    cameraPoseNet: null, // ml5 camera poseNet
    poses: [], // all poses obtained from all images
    className: null, // the name of the training target
    classList: [], // a list containing all the class name
    brain: null, // ml5 brain
    classify: {
      // result of classification
      class: null,
      score: null
    },
    isClassifying: false
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
    this.poseNet = ml5.poseNet(() => {}, options);
    this.poseNet.on("pose", this.gotPoses);
    // Initialze camera Posenet
    this.cameraPoseNet = ml5.poseNet(
      document.getElementById("camera"),
      "multiple",
      () => {}
    );
    this.cameraPoseNet.on("pose", this.gotPosesFromCamera);
    // Initialize brain
    this.brain = ml5.neuralNetwork({
      inputs: 34,
      outputs: 4,
      task: "classification",
      debug: true
    });
    // Initialize camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        this.mediaStream = mediaStream;
        document.getElementById("camera").srcObject = mediaStream;
        document.getElementById("camera").play();
      })
      .catch((error) => console.error("getUserMedia() error:", error));
  },
  methods: {
    // Activated on add
    onAdd() {
      for (let idx = 0; idx < this.imageList.length; idx++) {
        // Detect multiple poses on the image
        this.poseNet.multiPose(this.$refs[`image-${idx}`][0].image);
      }
      this.classList.push(this.className);
    },
    // Compute the image url for display
    getImageUrl(image) {
      return URL.createObjectURL(image);
    },
    // Avtivated when detect a pose
    gotPoses(results) {
      if (results && results.length > 0) {
        // Add poses to brain
        results.forEach((pose) => {
          let inputs = [];
          pose.pose.keypoints.forEach((coors) => {
            inputs.push(coors.position.x);
            inputs.push(coors.position.y);
          });
          this.brain.addData(inputs, [this.className]);
        });
      }
    },
    // Save the trained data as json file
    trainModel() {
      // Normalize data
      this.brain.normalizeData();
      // Train data
      const trainingOptions = {
        epochs: 200,
        batchSize: 16
      };
      this.brain.train(trainingOptions, () => {
        console.log("Model trained");
        // Start classification
        this.isClassifying = true;
        this.classifyPoses();
      });
    },
    gotPosesFromCamera(results) {
      if (results && results.length > 0) {
        // Add poses to poses
        for (const i in results) {
          if (Object.hasOwnProperty.call(results, i)) {
            const pose = results[i];
            this.poses = [];
            for (const j in pose.pose.keypoints) {
              if (Object.hasOwnProperty.call(pose.pose.keypoints, j)) {
                const coors = pose.pose.keypoints[j];
                this.poses.push(coors.position.x);
                this.poses.push(coors.position.y);
              }
            }
          }
        }
      }
    },
    // Classify the poses on the camera
    classifyPoses() {
      // Get inputs from the camera
      this.brain.classifyMultiple(this.poses, this.displayResults);
    },
    displayResults(error, results) {
      if (results) {
        this.classify.class = results[0].label;
        this.classify.score = (results[0].confidence * 100).toFixed(2);
      }
      this.classifyPoses();
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  z-index: 0;
  background-color: black;
}
</style>
