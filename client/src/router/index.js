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

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
          meta: {
            auth: true,
          },
        },
      ],
      meta: {
        layout: "main",
        auth: false,
      },
    },
    {
      path: "/main_admin",
      component: MainAdmin,
      children: [
        {
          path: "",
          component: () => import("../admin/views/Main"),
        },
      ],
      meta: {
        layout: "main_admin",
        auth: true,
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
        auth: true,
      },
    },

    { path: "/:notFound(.*)", component: NotFound },
  ],
  linkActiveClass: "el-link",
  linkExactActiveClass: "el-link",
});

router.beforeEach((to, from, next) => {
  try {
    const currentUser = store.state.auth.role;
    const requireAuth = to.matched.some((record) => record.meta.auth);

    if (requireAuth && !currentUser) {
      next("/login?message=login");
    } else {
      if (/^\/main_doc/.test(to.path) && currentUser !== "DOCTOR") {
        switch (currentUser) {
          case "ADMIN":
            next("/main_admin");
            break;
          case "USER":
            next("/main/users");
            break;
        }
      } else if (/^\/main_admin/.test(to.path) && currentUser !== "ADMIN") {
        switch (currentUser) {
          case "DOCTOR":
            next("/main_doc");
            break;
          case "USER":
            next("/main/users");
            break;
        }
      } else if (/\/users/.test(to.path) && currentUser !== "USER") {
        switch (currentUser) {
          case "ADMIN":
            next("/main_admin");
            break;
          case "DOCTOR":
            next("/main_doc");
            break;
          default:
            next("/");
        }
      } else {
        next();
      }
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
