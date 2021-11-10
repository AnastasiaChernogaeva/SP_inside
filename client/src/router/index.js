import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const NotFound = () => import("../layout/NotFound");

const Main = () => import("../layout/Main.vue");

const MainDoc = () => import("../doctor/layout/MainDoc");
const NewPet = () => import("../doctor/views/NewPet");
const PetInfo = () => import("../doctor/views/PetInfo");

const MainAdmin = () => import("../admin/layout/MainAdmin");

// const Auth = () => import("../layout/Auth");
// const Registrate = () => import("../layout/Registrate");
// const Admin = () => import("../trial_versions/AuthAdmin");
// const Test = () => import("../trial_versions/test.vue");
// const TTTT = () => import("../trial_versions/TTTT");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/0", component: TTTT },
    // { path: "/admin", component: Admin },
    // { path: "/test", component: Test },
    // { path: "/registration", component: Registrate },
    // { path: "/auth", component: Auth, alias: "" },

    { path: "/main", component: Main, alias: "" },
    { path: "/main_admin", component: MainAdmin },
    {
      path: "/main_doc",
      component: MainDoc,
      // children: [
      //   { path: "all", component: PetInfo },
      //   { path: "addNewOne", component: NewPet },
      // ],
    },
    { path: "/main_doc/all", component: PetInfo },
    { path: "/main_doc/addNewOne", component: NewPet },

    { path: "/:notFound(.*)", component: NotFound },
  ],
  //   linkActiveClass: "el-link",
  //   linkExactActiveClass: "el-link",
});

router.beforeEach((to, from, next) => {
  try {
    if (store.state.role === "DOCTOR") {
      console.log("DOCTOR", store.state.role);
    } else if (store.state.role === "ADMIN") {
      console.log("ADMIN", store.state.role);
    } else {
      console.log("UUUUUUSER");
      next();
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
