<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
    class="grid-content"
  >
  
    <workout class="grid-workout"
        photo="beginner01.jpeg"
        name="Sit up">
    </workout>

   <workout class="grid-workout"
        photo="beginner02.jpeg"
        name="Flutter Kicks">
    </workout>

    <workout class="grid-workout"
        photo="beginner04.jpeg"
        name="Reverse Crunch">
    </workout>

    <workout class="grid-workout"
        photo="beginner05.jpeg"
        name="High Plank">
    </workout>

    <workout class="grid-workout"
        photo="beginner06.jpeg"
        name="Single-Leg Sit-Up">
    </workout>

    <workout class="grid-workout"
        photo="beginner07.jpeg"
        name="Double-Leg Toe Touches">
    </workout>
      
  </v-container>
</template>

<script>
  import workout from '@/components/base/workout.vue';

  export default {
    components: {
        workout
    },
    data: () => ({
      show: false,
    }),
  }

</script>


<style>
.photo{
    width: 100%;
}
.grid-content{
    display: grid;
    grid-template-columns: 50% 50%
}
.timmer{
    padding-left: 10px;
}
.v-card__title {
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 7px;
}
.grid-workout{
    padding: 5px;
}
</style>