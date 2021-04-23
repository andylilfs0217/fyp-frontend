<template>
  <v-container>
    <v-row justify="center" class="display-3"> {{ $route.query.name }} </v-row>
    <v-row justify="center">
      <v-btn color="secondary" default rounded @click="dialog = true">
        More Details
      </v-btn>
    </v-row>
    <v-row>
      <v-card class="mx-auto" outlined>
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="text-center">
            <v-card-title>
              {{ $route.query.name }}

              <v-spacer />

              <v-icon aria-label="Close" @click="dialog = false">
                mdi-close
              </v-icon>
            </v-card-title>

            <v-card-text>
              {{ $route.query.workoutdetails }}
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn color="error" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-row>
    <v-row justify="center">
      <img
        class="photo"
        :src="require(`@/views/dashboard/program/assets/${$route.query.photo}`)"
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

export default {
  data: () => ({
    model: null,
    webcam: null,
    ctx: null,
    labelContainer: null,
    maxPredictions: null,
    mark: null,
    dialog: false
  }),
  async mounted() {
    const URL = this.$route.query.URL;
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
        if (prediction[i].className == this.$route.query.name) {
          break;
        }
      }

      this.mark = (prediction[i].probability.toFixed(2) * 100) / 10;
      const classPrediction =
        prediction[i].className +
        ": " +
        prediction[i].probability.toFixed(2) * 100;

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
    }
  }
};
</script>

<style scoped>
.photo {
  margin: 20px;
  width: 400px; /* width of container */
  height: 400px; /* height of container */
  object-fit: cover;
}
</style>
