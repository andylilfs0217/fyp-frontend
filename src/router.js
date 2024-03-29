import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "program/program_dialog",
      component: () => import("@/views/dashboard/Index"),
      children: [
        // Camera
        {
          name: "Camera",
          path: "camera/camera",
          component: () => import("@/views/dashboard/camera/Camera2")
        },
        // Import photo for training
        {
          name: "Photo",
          path: "camera/photo",
          component: () => import("@/views/dashboard/camera/Photo")
        },
        // Use preset model to predict posture
        {
          name: "Preset",
          path: "camera/preset",
          component: () => import("@/views/dashboard/camera/Preset")
        },
        // show different program
        {
          name: "Choose your program",
          path: "program/program_dialog",
          component: () => import("@/views/dashboard/program/program_dialog")
        },
        {
          name: "Details",
          path: "program/details",
          component: () => import("@/views/dashboard/program/details")
        },
        // Dashboard
        // {
        //   name: "Dashboard",
        //   path: "",
        //   component: () => import("@/views/dashboard/Dashboard")
        // },
        // Pages
        {
          name: "User Profile",
          path: "pages/user",
          component: () => import("@/views/dashboard/pages/UserProfile")
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/dashboard/component/Notifications")
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/dashboard/component/Icons")
        },
        {
          name: "Typography",
          path: "components/typography",
          component: () => import("@/views/dashboard/component/Typography")
        },
        // Tables
        {
          name: "Regular Tables",
          path: "tables/regular-tables",
          component: () => import("@/views/dashboard/tables/RegularTables")
        },
        // Maps
        {
          name: "Google Maps",
          path: "maps/google-maps",
          component: () => import("@/views/dashboard/maps/GoogleMaps")
        },
        // Upgrade
        {
          name: "Upgrade",
          path: "upgrade",
          component: () => import("@/views/dashboard/Upgrade")
        },
        // beginner
        {
          name: "Beginner",
          path: "program/beginner",
          component: () => import("@/views/dashboard/program/beginner_program")
        },
        // intermediate
        {
          name: "intermediate",
          path: "program/intermediate/",
          component: () =>
            import("@/views/dashboard/program/intermediate_program")
        },
        // advanced
        {
          name: "advanced",
          path: "program/advanced",
          component: () => import("@/views/dashboard/program/advanced_program")
        },
        // start workout
        {
          name: "start",
          path: "program/beginner/workout",
          component: () => import("@/views/dashboard/program/start_workout")
        }
      ]
    }
  ]
});
