<template>
  <v-container>
    <v-row height="530">
      <v-col md="6" cols="12" style="height: 280px;">
        <video ref="video" id="video" width="320" height="240" />
        <canvas ref="canvas" id="canvas" width="320" height="240"></canvas>
      </v-col>
      <v-col md="6" cols="12">
        <v-row>
          <!-- Toggle posenet button -->
          <v-btn
            icon
            large
            :color="isPosenetOn ? 'green' : 'red'"
            @click="isPosenetOn = !isPosenetOn"
          >
            <v-icon v-if="isPosenetOn">mdi-play-circle</v-icon>
            <v-icon v-else>mdi-stop-circle</v-icon>
          </v-btn>
          <!-- Toggle train model button -->
          <v-btn
            icon
            large
            color="orange"
            @click="toggleCollection"
            :disabled="!isWaiting"
          >
            <v-icon v-if="isWaiting">mdi-pause-circle</v-icon>
            <v-icon v-else>mdi-reload</v-icon>
          </v-btn>
          <!-- Save data button -->
          <v-btn icon large color="yellow" @click="saveData">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <!-- Toggle train model button -->
          <v-btn icon large color="blue" @click="$refs.uploadData.click()">
            <v-icon>mdi-upload</v-icon>
          </v-btn>
          <input
            type="file"
            ref="uploadData"
            v-show="false"
            @change="loadData"
          />
        </v-row>
        <v-row>
          <!-- Train target -->
          <v-text-field
            label="Train Target"
            v-model="trainTarget"
          ></v-text-field>
        </v-row>
        <v-row>
          <!-- Model files -->
          <v-btn rounded color="primary" @click="$refs.uploadModel.click()">
            Upload all 3 model files
          </v-btn>
          <input type="file" ref="uploadModel" v-show="false" multiple />
          <!-- Pose detection -->
          <v-btn icon large color="primary" @click="loadModel">
            <v-icon>mdi-face-recognition</v-icon>
          </v-btn>
        </v-row>
        <v-row> </v-row>
      </v-col>
    </v-row>
    <div v-if="trainmodel">
      <v-row justify="center" style="padding-left:20px">
        <!-- Pose display -->
        Your Posture:

        {{ trainmodel }}
      </v-row>

      <v-row justify="center">
        Your Performance:
      </v-row>

      <v-row justify="center">
        <v-rating v-model="score" length="10" readonly size="30"></v-rating>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import * as ml5 from "ml5";

import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

const confidence = 0.5;

export default {
  name: "camera2",
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
    };
  },
  mounted() {
    // Get camera
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
    // Initialize Posenet
    this.poseNet = ml5.poseNet(this.video, "multiple", () => {
      console.log("poseNet ready");
    });
    // Initialize brain
    this.brain = ml5.neuralNetwork({
      inputs: 34,
      outputs: 4,
      task: "classification",
      debug: true,
    });
  },
  methods: {
    // Being run recursively once the Posenet is on
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

    // Draw the skeleton of the human body
    drawBody() {
      // Draw pose and skeleton on canvas
      drawKeypoints(this.pose.keypoints, confidence, this.ctx, 1);
      // console.log(this.skeleton);
      drawSkeleton(this.pose.keypoints, confidence, this.ctx, 1);
    },

    // Collect data to train the model
    toggleCollection() {
      // Collect data after 3 seconds
      console.log(
        `Start collecting poses for training target ${this.trainTarget} in 3 seconds`
      );
      // Start collecting data
      setTimeout(() => {
        console.log("collecting poses");
        this.isWaiting = false;
        this.isPosenetOn = true;
        // Stop collecting data after 5 seconds
        setTimeout(() => {
          console.log("stopped collecting poses, now waiting");
          this.isWaiting = true;
          this.isPosenetOn = false;
        }, 5000);
      }, 3000);
    },

    // Save the trained data as json file
    saveData() {
      this.brain.saveData("data");
    },

    // Load trained data to brain
    loadData() {
      let data = this.$refs.uploadData.files;
      this.brain.loadData(data, () => {
        this.brain.normalizeData();
        this.brain.train({ epochs: 50 }, () => {
          console.log("model trained");
          this.brain.save();
        });
      });
    },

    // Upload trained model
    loadModel() {
      this.model = this.$refs.uploadModel.files;
      this.brain.load(this.model, () => {
        console.log("pose classification ready");
        this.classifyPose();
      });
    },

    classifyPose() {
      let inputs = [];
      for (const i in this.pose.keypoints) {
        if (this.pose.keypoints.hasOwnProperty(i)) {
          const xyCoors = this.pose.keypoints[i];
          inputs.push(xyCoors.position.x);
          inputs.push(xyCoors.position.y);
        }
      }
      this.brain.classify(inputs, (error, results) => {
        //  console.log(results[0].label);
        //   console.log(results[0].confidence);
        this.trainmodel = results[0].label;
        this.score = (results[0].confidence * 100) / 10;
        this.classifyPose();
      });
    },
  },
  watch: {
    isPosenetOn() {
      if (this.isPosenetOn) {
        this.poseNet.on("pose", this.gotPoses);
      } else {
        this.poseNet.removeListener("pose", this.gotPoses);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    },
  },
};
</script>

<style>
.feed {
  display: block;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background-color: #171717;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.35);
  height: auto;
  position: absolute;
}
#video {
  display: block;
  margin: 0 auto;
  position: absolute;
}
#canvas {
  display: block;
  margin: 0 auto;
  position: absolute;
}
</style>
