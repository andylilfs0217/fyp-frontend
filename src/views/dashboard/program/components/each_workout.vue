<template>
  <v-container>
    <v-row justify="center">
      <timmer :time="20" justify="center" @finish="finished"></timmer>
    </v-row>
    <v-row justify="center" class="display-3"> {{ name }} </v-row>
    <v-row justify="center">
      <img
        class="photo"
        :src="require(`@/views/dashboard/program/assets/${photo}`)"
      />
      <div><canvas id="canvas"></canvas></div>
    </v-row>
    <v-row justify="center">
      Your Performance:
    </v-row>

    <v-row justify="center">
      <v-rating v-model="mark" length="10" readonly size="30"></v-rating>
    </v-row>
  </v-container>
</template>

<script>
import * as tmPose from "@teachablemachine/pose";

import Timmer from "@/views/dashboard/program/components/timmer.vue";

export default {
  components: {
    Timmer
  },
  props: ["photo", "name", "URL"],

  data: () => ({
    model: null,
    webcam: null,
    ctx: null,
    labelContainer: null,
    maxPredictions: null,
    mark: null,
    //
    timmer: 30,
    next: false
  }),
  async mounted() {
    const URL = this.URL;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    this.model = await tmPose.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    this.webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    window.requestAnimationFrame(this.loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size;
    canvas.height = size;
    this.ctx = canvas.getContext("2d");
    // this.labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < this.maxPredictions; i++) {
    //   // and class labels
    //   this.labelContainer.appendChild(document.createElement("div"));
    // }
  },
  methods: {
    async loop(timestamp) {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element
      const { pose, posenetOutput } = await this.model.estimatePose(
        this.webcam.canvas
      );
      // Prediction 2: run input through teachable machine classification model
      const prediction = await this.model.predict(posenetOutput);

      let i;
      for (i = 0; i < this.maxPredictions; i++) {
        if (prediction[i].className == this.name) {
          break;
        }
      }

      this.mark = (prediction[i].probability.toFixed(2) * 100) / 10;
      const classPrediction =
        prediction[i].className +
        ": " +
        prediction[i].probability.toFixed(2) * 100;

      //this.labelContainer.childNodes[i].innerHTML = classPrediction;
      //console.log(classPrediction);

      // finally draw the poses
      this.drawPose(pose);
    },
    drawPose(pose) {
      if (this.webcam.canvas) {
        this.ctx.drawImage(this.webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
        }
      }
    },

    finished() {
      console.log("update time");
      this.$emit("finished");
    }
  }
};
</script>

<style scoped>
.grid_container {
  grid-template-columns: 50% 50%;
}
#canvas {
  margin: 20px;
}
.photo {
  margin: 20px;
  width: 400px; /* width of container */
  height: 400px; /* height of container */
  object-fit: cover;
}
</style>
