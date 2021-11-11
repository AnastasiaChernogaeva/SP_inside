import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const NotFound = () => import("../layout/NotFound");

const Main = () => import("../layout/Main.vue");
const LogIn = () => import("../views/Auth.vue");
const SignUp = () => import("../views/Register.vue");
const Users = () => import("../user/views/MainUser.vue");

const MainDoc = () => import("../doctor/layout/MainDoc");
const Primary = () => import("../doctor/views/Primary");
const NewPet = () => import("../doctor/views/NewPet");
const PetInfo = () => import("../doctor/views/PetInfo");

const MainAdmin = () => import("../admin/layout/MainAdmin");

// const Auth = () => import("../layout/Auth");
// const Register = () => import("../layout/Register");
// const Admin = () => import("../trial_versions/AuthAdmin");
// const Test = () => import("../trial_versions/test.vue");
// const TTTT = () => import("../trial_versions/TTTT");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/0", component: TTTT },
    // { path: "/admin", component: Admin },
    // { path: "/test", component: Test },
    // { path: "/registration", component: Register },
    // { path: "/auth", component: Auth, alias: "" },

    {
      path: "/main",
      component: Main,
      alias: "",
      children: [
        {
          path: "login",
          component: LogIn,
        },
        {
          path: "signup",
          component: SignUp,
        },
        {
          path: "users",
          component: Users,
        },
      ],
      meta: {
        layout: "main",
        auth: "",
      },
    },
    {
      path: "/main_admin",
      component: MainAdmin,
      meta: {
        layout: "main_admin",
        auth: "ADMIN",
      },
    },
    {
      path: "/main_doc",
      component: MainDoc,
      children: [
        { path: "primary", component: Primary, alias: "" },
        { path: "all", component: PetInfo },
        { path: "addNewOne", component: NewPet },
      ],
      meta: {
        layout: "main_doc",
        auth: "DOCTOR",
      },
    },
    // { path: "/main_doc/all", component: PetInfo },
    // { path: "/main_doc/addNewOne", component: NewPet },

    { path: "/:notFound(.*)", component: NotFound },
  ],
  //   linkActiveClass: "el-link",
  //   linkExactActiveClass: "el-link",
});

router.beforeEach((to, from, next) => {
  try {
    // const currentUser = store.state.auth.role;
    // const requireAuth = to.matched.some((record) => record.meta.auth);
    // if (requireAuth === "DOCTOR" && currentUser === "DOCTOR") {
    // } else if (requireAuth === "ADMIN" && currentUser === "ADMIN") {
    // } else if (requireAuth === "USER" && currentUser === "USER") {
    // } else if (requireAuth === "" && !currentUser) {
    //   noxt("/main");
    // }

    next();

    // if (store.state.auth.role === "DOCTOR") {
    //   const requireAuth = to.matched.some((record) => record.meta);
    //   next("/main_doc");
    //   console.log("DOCTOR", store.state.auth.role);
    // } else if (store.state.auth.role === "ADMIN") {
    //   next("/main_admin");

    //   console.log("ADMIN", store.state.auth.role);
    // } else {
    //   console.log("UUUUUUSER");
    //   next();
    // }
    // next("#");
  } catch (e) {
    console.log(e);
  }
});

export default router;
