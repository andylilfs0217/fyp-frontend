<template>
  <div class="text-center">
    <v-progress-circular
      :rotate="-90"
      :size="100"
      :width="15"
      :value="ratio"
      color="primary"
    >
      {{ timeLeft }}
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ["time"],
  data() {
    return {
      interval: {},
      value: 0,
      ratio: 0,
      timeLeft: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    let temp = this.time;
    this.timeLeft = this.time;
    this.ratio = (this.timeLeft / temp) * 100;
    this.interval = setInterval(() => {
      if (this.timeLeft === 0) {
        // this.timeLeft = this.time;

        this.$emit("finish");
        return (this.timeLeft = this.time);
      }
      this.timeLeft -= 1;
      this.ratio = (this.timeLeft / temp) * 100;
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.v-progress-circular {
  margin: 1rem;
}
</style>
