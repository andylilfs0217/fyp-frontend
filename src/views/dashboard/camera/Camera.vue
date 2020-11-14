<template>
  <v-container>
    <v-row>
      <v-col md="6" cols="12">
        <div class="camera">
          <video
            ref="webcamRef"
            autoplay
            class="feed"
            id="camera"
            width="1080"
            height="720"
          />
          <canvas id="canvas" width="1080" height="720"></canvas>
        </div>
      </v-col>
      <v-col md="6" cols="12">
        <button @click="togglePoseNet">
          PoseNet is now on: {{ isPosenetOn }}
        </button>
        <br />
        <button @click="toggleCollection">
          PoseNet is now collecting data: {{ state }}
        </button>
        <br />
        <button @click="saveData">Save data</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as ml5 from "ml5";
import { drawKeypoints, drawSkeleton } from "@/utils/utilities.js";

const confidence = 0.25;

export default {
  name: "camera2",
  data() {
    return {
      video: null,
      poseNet: null,
      pose: null,
      skeleton: null,
      isPosenetOn: false,
      canvas: null,
      ctx: null,
      state: "waiting",
      brain: null,
    };
  },
  methods: {
    init() {
      // Get access to the web camera
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot get Media Devices");
      }

      this.setup();
    },
    setup() {
      // Get the video HTML component to video var
      this.video = document.getElementById("camera");
      // Get canvas HTML element for drawing later
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");

      // Load poseNet with video, and call func modelLoaded()
      this.poseNet = ml5.poseNet(this.video, this.modelLoaded);
      // Change poseNet to on (check obj watch.isPosenetOn)
      this.isPosenetOn = true;

      let options = {
        inputs: 34,
        outputs: 4,
        task: "classification",
        debug: true,
      };
      this.brain = ml5.neuralNetwork(options);
      this.brain.loadData(this.myJson, this.dataReady);
    },

    dataReady() {
      this.brain.normalizeData();
      this.brain.train({ epochs: 50 }, this.finished);
    },

    finished() {
      console.log("model trained");
      this.brain.save();
    },

    gotPoses(poses) {
      // Get all poses and corressponding coordinates to var pose and skeleton
      if (poses && poses.length > 0) {
        this.pose = poses[0].pose;

        if (this.state === "collecting") {
          let inputs = [];
          for (let i = 0; i < this.pose.keypoints.length; i++) {
            let x = this.pose.keypoints[i].position.x;
            let y = this.pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
          }
          let target = ["A"];
          this.brain.addData(inputs, target);
        }

        // Reset canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw pose and skeleton on canvas
        drawKeypoints(this.pose.keypoints, confidence, this.ctx, 1);
        // console.log(this.skeleton);
        drawSkeleton(this.pose.keypoints, confidence, this.ctx, 1);
      }
    },

    modelLoaded() {
      console.log("poseNet ready");
    },

    togglePoseNet() {
      this.isPosenetOn = !this.isPosenetOn;
    },

    toggleCollection() {
      console.log("5 seconds until collect");
      setTimeout(() => {
        console.log("collecting");
        this.state = "collecting";
        setTimeout(() => {
          console.log("waiting");
          this.state = "waiting";
        }, 5000);
      }, 5000);
    },

    saveData() {
      this.brain.saveData();
    },
  },
  watch: {
    isPosenetOn() {
      if (this.isPosenetOn) {
        // Turn on poseNet and loop func gotPoses()
        this.poseNet.on("pose", this.gotPoses);
      } else {
        this.poseNet.removeListener("pose", this.gotPoses);
      }
    },
  },
  mounted() {
    this.init();
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
#canvas {
  display: block;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: auto;
  position: absolute;
}
</style>