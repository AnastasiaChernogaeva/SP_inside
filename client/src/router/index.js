import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const NotFound = () => import("../layout/NotFound");
// const Admin = () => import("../layout/AuthAdmin");
const Auth = () => import("../layout/Auth");
const Registrate = () => import("../layout/Registrate");
const MainDoc = () => import("../layout/MainDoc");
const NewPet = () => import("../views/NewPet");
const PetInfo = () => import("../views/PetInfo");
const Test = () => import("../test.vue");
const Main = () => import("../layout/Main.vue");
const TTTT = () => import("../TTTT.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/0", component: TTTT },

    { path: "/test", component: Test },
    // { path: "/admin", component: Admin },
    { path: "/registration", component: Registrate },
    { path: "/auth", component: Auth, alias: "" },
    { path: "/main_doc", component: MainDoc },
    { path: "/main", component: Main },

    {
      path: "/all",
      component: PetInfo,
    },
    { path: "/addNewOne", component: NewPet },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  //   linkActiveClass: "el-link",
  //   linkExactActiveClass: "el-link",
});

export default router;
