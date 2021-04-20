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
        image: "intermediate01.jpg",
        name: "High Lunge (Left)",
        workoutdetails:
          "From Uttanasana (Standing Forward Bend), bend your knees and, with an inhale, step your left foot back toward the back edge of your mat, with the ball of the foot on the floor. Step back far enough so that your right knee can form a right angle. Lay your torso on your front thigh and lengthen it forward. To soften your right groin, imagine that the thigh is sinking toward the floor under your torso’s weight. Look forward. Simultaneously, firm the left thigh and push it up toward the ceiling, holding the left knee straight. Stretch your left heel toward the floor.",
      },
      {
        id: 1,
        image: "intermediate02.jpg",
        name: "High Lunge (Right)",
        workoutdetails:
          "From Uttanasana (Standing Forward Bend), bend your knees and, with an inhale, step your left foot back toward the back edge of your mat, with the ball of the foot on the floor. Step back far enough so that your right knee can form a right angle. Lay your torso on your front thigh and lengthen it forward. To soften your right groin, imagine that the thigh is sinking toward the floor under your torso’s weight. Look forward. Simultaneously, firm the left thigh and push it up toward the ceiling, holding the left knee straight. Stretch your left heel toward the floor.",
      },
      {
        id: 2,
        image: "intermediate03.jpg",
        name: "Downward facing dog",
        workoutdetails:
          "Set up on all fours with your hands about 3 inches ahead of your shoulders and shoulder-width apart. Align your wrist creases so they are parallel to the front edge of the mat, then root down evenly through the whole of each hand. Press down firmly with your fingertips to pull your forearms toward the front of the room. Keep your knuckles grounded as you do this. Spin your biceps forward while firming your triceps into your midline.Roll your inner upper arms toward the wall in front of you while engaging your outer upper arms. Inhale, and tuck your toes under; exhale, and press your hips back and up.",
      },
      {
        id: 3,
        image: "intermediate04.jpg",
        name: "V Sit",
        workoutdetails:
          "Contract your abdominal muscles and core slowly and lift your legs up to an extended position at a 45-degree angle with your torso. Reach your arms straight forward or reach up toward your shins as you are able. It's important to maintain good core posture and a strong spine throughout the movement and to avoid rounding the shoulders forward. Don't hold your breath—continue to breathe deeply during the movement. Hold this V-shaped position for several seconds to begin. As you get stronger, hold the position longer. Return to your starting position slowly while continuing to keep your abs engaged and tight. Just before you reach the floor, stop and hold the position for a few seconds. ",
      },
      {
        id: 4,
        image: "intermediate05.jpg",
        name: "Side Plank (Left)",
        workoutdetails:
          "Lie on your right side, legs extended and stacked from hip to feet. The elbow of your right arm is directly under your shoulder. Ensure your head is directly in line with your spine. Your left arm can be aligned along the left side of your body. Engage your abdominal muscles, drawing your navel toward your spine. Lift your hips and knees from the mat while exhaling. Your torso is straight in line with no sagging or bending. Hold the position. After several breaths, inhale and return to the starting position. The goal should be to hold for 60 seconds. Change sides and repeat.",
      },
      {
        id: 5,
        image: "intermediate06.jpg",
        name: "Side Plank (Right)",
        workoutdetails:
          "Lie on your right side, legs extended and stacked from hip to feet. The elbow of your right arm is directly under your shoulder. Ensure your head is directly in line with your spine. Your left arm can be aligned along the left side of your body. Engage your abdominal muscles, drawing your navel toward your spine. Lift your hips and knees from the mat while exhaling. Your torso is straight in line with no sagging or bending. Hold the position. After several breaths, inhale and return to the starting position. The goal should be to hold for 60 seconds. Change sides and repeat.",
      },
    ],
    fileURL: "https://teachablemachine.withgoogle.com/models/l1CBsfsPj/",
    bannerData: {
      name: "Intermedaite workout",
      description: "This is the intermedaite workout",
      image: "intermediate.jpg",
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
