<template>
  <div>
  <v-card>

    <img class="photo" :src="require(`@/views/dashboard/program/assets/${photo}`)">

    <v-card-title>
      {{name}}
      <div class="timmer">
        <v-icon class="mr-1" small>
            mdi-clock-outline
        </v-icon>

        <span class="caption grey--text font-weight-light">30s</span>
      </div>
    </v-card-title>

    <!-- <v-divider class="mx-4"></v-divider> -->
      
     <!-- <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition> -->
    
  </v-card>  
  </div>
  
</template>

<script>

  export default {
    name: 'workout',
    props: ['photo', 'name'],
 

  }
</script>

<style scoped>
.photo{
    width: 100%;
    height: 100%;
}

</style>
