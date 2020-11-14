<template>
  <v-container id="camera" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <video ref="video" id="video" max-width="100%" autoplay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      video: {},
    };
  },
  mounted() {
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