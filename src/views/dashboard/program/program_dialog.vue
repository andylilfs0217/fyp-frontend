<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
        <v-col
            cols="12"
            md="8"
        >
            <base-material-card>
                <template v-slot:heading>
                    <div class="display-2 font-weight-light">
                    Beginner
                    </div>
                </template>
                <button @click="helloworld">
                    <img class="photo" src="./assets/beginner.jpg">
                </button>
            </base-material-card>
        </v-col>


        <v-col
            cols="12"
            md="8"
        >
            <base-material-card>
                <template v-slot:heading>
                <div class="display-2 font-weight-light">
                    Intermediate
                </div>
                </template>
                <img class="photo" src="./assets/intermediate.jpg">
            </base-material-card>
        </v-col>

        <v-col
            cols="12"
            md="8"
        >
            <base-material-card>
                <template v-slot:heading>
                <div class="display-2 font-weight-light">
                    Advanced
                </div>
                </template>
                <img class="photo" src="./assets/advanced.jpg">
            </base-material-card>
        </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    methods:{
        helloworld(){
            console.log("gotootherpage");
        }
    }
  }
</script>


<style>
.photo{
    width: 100%;
}
</style>