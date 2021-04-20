<template>
  <v-container>
    <Banner :banner="bannerData" :workout="workoutData" :URL="fileURL"></Banner>
    <v-container id="user-profile" fluid tag="section" class="grid-content">
      <Workout
        v-for="workout in workoutData"
        :URL="fileURL"
        :key="workout.id"
        class="grid-workout"
        :photo="workout.image"
        :name="workout.name"
        :workoutdetails="workout.workoutdetails"
      ></Workout> </v-container
  ></v-container>
</template>

<script>
import Workout from "@/components/base/Workout.vue";
import Banner from "@/views/dashboard/program/components/Banner.vue";

export default {
  components: {
    Workout,
    Banner,
  },
  data: () => ({
    workoutData: [
      {
        id: 0,
        image: "beginner01.jpeg",
        name: "Half Forward Bend",
        workoutdetails:
          "From Uttanasana (Standing Forward Bend), press your palms or fingertips into the floor (or blocks on the floor) beside your feet. With an inhale, straighten your elbows and arch your torso away from your thighs, finding as much length between your pubic bone and navel as possible. With your palms (or fingertips) push down and back against the floor, and lift the top of your sternum up (away from the floor) and forward. You might bend your knees slightly to help get this movement, which will arch the back. Look forward, but be careful not to compress the back of your neck. Hold the arched-back position for a few breaths. Then, with an exhale, release your torso into full Uttanasana.",
      },
      {
        id: 1,
        image: "beginner02.jpeg",
        name: "Bridge Pose",
        workoutdetails:
          "Lie supine on the floor, and if necessary, place a thickly folded blanket under your shoulders to protect your neck. Bend your knees and set your feet on the floor, heels as close to the sitting bones as possible. Exhale and, pressing your inner feet and arms actively into the floor, push your tailbone upward toward the pubis, firming (but not hardening) the buttocks, and lift the buttocks off the floor. Keep your thighs and inner feet parallel. Clasp the hands below your pelvis and extend through the arms to help you stay on the tops of your shoulders. Lift your buttocks until the thighs are about parallel to the floor. Keep your knees directly over the heels, but push them forward, away from the hips, and lengthen the tailbone toward the backs of the knees. Lift the pubis toward the navel. Lift your chin slightly away from the sternum and, firming the shoulder blades against your back, press the top of the sternum toward the chin. Firm the outer arms, broaden the shoulder blades, and try to lift the space between them at the base of the neck (where it’s resting on the blanket) up into the torso. Stay in the pose anywhere from 30 seconds to 1 minute. Release with an exhalation, rolling the spine slowly down onto the floor.",
      },
      {
        id: 2,
        image: "beginner04.jpeg",
        name: "Forearm Plank",
        workoutdetails:
          "Begin in a kneeling position. Bend your elbows to 90 degrees and pitch forward to place your hands and forearms on the floor. Extend your legs behind you with toes tucked under to press into the plank. Distribute weight in your hands evenly by spreading your fingers apart, creating a stable base. Make sure to keep your body in a straight line, keeping your abdominal muscles tight.",
      },
      {
        id: 3,
        image: "beginner05.jpeg",
        name: "Child Pose",
        workoutdetails:
          "Come to your hands and knees on the mat. Spread your knees as wide as your mat, keeping the tops of your feet on the floor with the big toes touching. Bring your belly to rest between your thighs and root your forehead to the floor. Relax the shoulders, jaw, and eyes. If it is not comfortable to place the forehead on the floor, rest it on a block or two stacked fists. There is an energy point at the center of the forehead in between the eyebrows that stimulates the vagus nerve and supports a 'rest and digest' response. Finding a comfortable place for the forehead is key to gaining this soothing benefit.",
      },
      {
        id: 4,
        image: "beginner06.jpeg",
        name: "Tree Pose (Left)",
        workoutdetails:
          "Take a moment to feel both your feet root into the floor with your weight distributed equally on all four corners of each foot. Begin to shift your weight into your right foot, lifting your left foot off the floor. Keep your right leg straight but don't lock the knee. Bend your left knee and bring the sole of your left foot high onto your inner right thigh.  Press your foot into your thigh and your thigh back into your foot with equal pressure. This will help you keep both hips squared toward the front so your right hip doesn't jut out. Focus your gaze (Drishti) on something that doesn't move to help you keep your balance. Take 5 to 10 breaths, then lower your left foot to the floor and do the other side.",
      },
      {
        id: 5,
        image: "beginner07.jpeg",
        name: "Tree Pose (Right)",
        workoutdetails:
          "Take a moment to feel both your feet root into the floor with your weight distributed equally on all four corners of each foot. Begin to shift your weight into your right foot, lifting your left foot off the floor. Keep your right leg straight but don't lock the knee. Bend your left knee and bring the sole of your left foot high onto your inner right thigh.  Press your foot into your thigh and your thigh back into your foot with equal pressure. This will help you keep both hips squared toward the front so your right hip doesn't jut out. Focus your gaze (Drishti) on something that doesn't move to help you keep your balance. Take 5 to 10 breaths, then lower your left foot to the floor and do the other side.",
      },
    ],
    fileURL: "https://teachablemachine.withgoogle.com/models/BdvgCqeVk/",
    bannerData: {
      name: "Beginner workout",
      description: "This is the beginner workout",
      image: "beginner.jpg",
    },
  }),
};
</script>

<style scoped>
.photo {
  width: 100%;
}
.grid-content {
  display: grid;
  grid-template-columns: 50% 50%;
}
.timmer {
  padding-left: 10px;
}
.v-card__title {
  font-size: 18px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.grid-workout {
  padding: 5px;
}
</style>
