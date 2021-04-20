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
        image: "advanced01.jpg",
        name: "Squat",
        workoutdetails:
          "Find a foot stance that feels best for you. Pointing your toes slightly outwards helps some, but keeping them parallel is fine, too. If you’re not sure what’s best, start by putting your feet shoulder-width apart and pointed about 15 degrees outwards. Tense your abs like someone is about to punch you.",
      },
      {
        id: 1,
        image: "advanced02.jpeg",
        name: "Garland",
        workoutdetails:
          "Come to stand with your feet about mat's width apart. Bend the knees and lower your butt toward the floor to come into a squat. It's natural for your toes to want to turn out and that's OK, but don't overdo it. Eventually, you're working toward keeping the feet closer to parallel. Take your upper arms inside your knees and bend the elbows to bring the palms together into anjali mudra (prayer position). With hands to your heart center in anjali mudra, see if you can allow your thumbs to touch your sternum as if to help keep the chest lifted. Continue pressing upper arms into thighs and thighs into upper arm to stay engaged. Keep your spine straight, your butt moving toward the floor, and your shoulders relaxed away from your ears.",
      },
      {
        id: 2,
        image: "advanced03.jpg",
        name: "Extended Side Angle (Left)",
        workoutdetails:
          "Exhale and step your left foot behind towards the back of the mat with front foot staying at the top. Lift and extend your arms out horizontally from your sides, with palms down. Angle your right heel toward the center of your mat. Opinions vary on the ideal angle for the foot in relation to the ankle. Somewhere between 90 (which would be parallel to the back edge of your yoga mat) and 45 (toes pointing at the top left corner of your mat) degrees is acceptable. Bend your right knee so that your calf and thigh form a right angle with your thigh parallel to the floor. Rest your right forearm on the right thigh with the palm turned up towards the ceiling. If you'd like to deepen the stretch, bring your right hand inside or outside the right foot, depending on which is more comfortable.You can place the right fingertips on the floor for added length and to also avoid dumping the weight in the shoulder. A block underneath the hand is also welcomed. Remember to lift the weight out of the shoulder while engaging the core for support. Lift your left arm up and extend it over the ear. Reach through finger tips while pressing firmly into the pinky toe side of the back foot. Open your chest and make sure your left shoulder is aligned over your right shoulder. Bring your gaze up toward your left hand. Lift the torso up on an inhale extending arms wide. Pivot the feet and torso to face the top of the mat and step forward, returning to tadasana.",
      },
      {
        id: 3,
        image: "advanced04.jpg",
        name: "Extended Side Angle (Right)",
        workoutdetails:
          "Exhale and step your left foot behind towards the back of the mat with front foot staying at the top. Lift and extend your arms out horizontally from your sides, with palms down. Angle your right heel toward the center of your mat. Opinions vary on the ideal angle for the foot in relation to the ankle. Somewhere between 90 (which would be parallel to the back edge of your yoga mat) and 45 (toes pointing at the top left corner of your mat) degrees is acceptable. Bend your right knee so that your calf and thigh form a right angle with your thigh parallel to the floor. Rest your right forearm on the right thigh with the palm turned up towards the ceiling. If you'd like to deepen the stretch, bring your right hand inside or outside the right foot, depending on which is more comfortable.You can place the right fingertips on the floor for added length and to also avoid dumping the weight in the shoulder. A block underneath the hand is also welcomed. Remember to lift the weight out of the shoulder while engaging the core for support. Lift your left arm up and extend it over the ear. Reach through finger tips while pressing firmly into the pinky toe side of the back foot. Open your chest and make sure your left shoulder is aligned over your right shoulder. Bring your gaze up toward your left hand. Lift the torso up on an inhale extending arms wide. Pivot the feet and torso to face the top of the mat and step forward, returning to tadasana.",
      },
      {
        id: 4,
        image: "advanced05.jpg",
        name: "Cobra Pose",
        workoutdetails:
          "Lie on your belly. Come onto your forearms, with your elbows directly under your shoulders and parallel to each other. Stretch your legs straight back, about hip-width apart. Spread your toes wide and press the tops of your feet into your mat. Firm your legs, and roll your inner thighs up, your outer thighs down. Press your tailbone toward your feet, lengthening your lower back. Press down into your forearms to lift your chest up.",
      },
      {
        id: 5,
        image: "advanced06.jpg",
        name: "Camel",
        workoutdetails:
          "Begin kneeling with your thighs perpendicular to the floor and your knees and feet hip-distance apart. Extend your big toes straight back, pressing down with all 10 toenails and firming your outer ankles into your midline. Spin your inner thighs back, and gently release the flesh of your buttocks toward the backs of your knees. Your pelvis is neutral, neither spilling forward nor spilling back, and stacks directly over your knees. Root down from the tops of your feet to your knees; rebound up with your chest. Bring your palms together in front of your sternum, and drop your chin toward your sternum. Take an inhalation to emphasize the lift of your chest, then create Savasana (Corpse Pose) arms (palms facing forward). With the next exhalation, keeping your chin dropping and your pelvis over your knees, take your hands to your heels. Immediately press your shoulder blades forward and up, and coil your thoracic spine to lift your chest any amount more. Having created more space/extension in your upper back, your head can now drop back and hang freely. Continue pressing down with your feet and lower legs in order to lift up with your thoracic spine and chest.",
      },
    ],
    fileURL: "https://teachablemachine.withgoogle.com/models/bQyhr6xBp/",
    bannerData: {
      name: "Advanced workout",
      description: "This is the advanced workout",
      image: "advanced.jpg",
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
