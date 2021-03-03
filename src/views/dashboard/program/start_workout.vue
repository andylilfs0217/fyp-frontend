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
             
                <vue-countdown-timer
                @start_callback="startCallBack('event started')"
                @end_callback="endCallBack('event ended')"
                :start-time="current"
                :start-label="'Your workout will be start in'"
                :interval="1000"
                label-position="begin"
                :end-text="'Event ended!'"  
               >
                </vue-countdown-timer>
            </base-material-card>
        </v-col>   
      
    </v-row>
  </v-container>
</template>

<script>
  import router from '@/router'
  import timmer from "@/views/dashboard/program/components/timmer.vue";

  export default {
    component:{
      timmer
    },
    data(){
        return {
            current:(new Date).getTime() +10000,
        }
    },
    methods:{
        helloworld(){
            console.log("gotootherpage");
            router.push({ name: "Beginner" });
        },
       
        startCallBack(x) {
            console.log(x);
        },
        endCallBack(x) {
            console.log(x);
        },
        
    }
  }
</script>


<style>
.photo{
    width: 100%;
}
</style>