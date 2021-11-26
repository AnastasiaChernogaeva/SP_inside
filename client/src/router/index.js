import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const NotFound = () => import("../layout/NotFound");

const Main = () => import("../layout/Main.vue");
const LogIn = () => import("../views/Auth.vue");
const SignUp = () => import("../views/Register.vue");
const Clients = () => import("../client/views/Mainclient.vue");

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
          path: "clients",
          component: Clients,
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
      // through TEMPLATE
      // children: [
      //   {
      //     path: "",
      //     component: () => import("../admin/views/Main"),
      //   },
      //   {
      //     path: "templ",
      //     component: () => import("../admin/template/Template"),
      //     children: [
      //       {
      //         path: "clinics",
      //         component: () => import("../admin/views/Clinics"),
      //       },
      //       {
      //         path: "doctors",
      //         component: () => import("../admin/views/Doctors"),
      //       },
      //       {
      //         path: "services",
      //         component: () => import("../admin/views/Services"),
      //       },
      //       {
      //         path: "cities",
      //         component: () => import("../admin/views/Cities"),
      //       },
      //       {
      //         path: "working_time",
      //         component: () => import("../admin/views/WorkingTime"),
      //       },
      //       {
      //         path: "pets",
      //         component: () => import("../admin/views/Pets"),
      //       },
      //       {
      //         path: "clients",
      //         component: () => import("../admin/views/clients"),
      //       },
      //       {
      //         path: "treatments",
      //         component: () => import("../admin/views/Treatments"),
      //       },
      //       {
      //         path: "shop_goods",
      //         component: () => import("../admin/views/ShopGoods"),
      //       },
      //     ],
      //   },
      // ],

      children: [
        {
          path: "",
          component: () => import("../admin/views/Main"),
        },
        {
          path: "clinics",
          component: () => import("../admin/views/Clinics"),
        },
        {
          path: "doctors",
          component: () => import("../admin/views/Doctors"),
        },
        {
          path: "services",
          component: () => import("../admin/views/Services"),
        },
        // {
        //   path: "cities",
        //   component: () => import("../admin/views/Cities"),
        // },
        // {
        //   path: "workingtime",
        //   component: () => import("../admin/views/WorkingTime"),
        // },
        {
          path: "pets",
          component: () => import("../admin/views/Pets"),
        },
        {
          path: "clients",
          component: () => import("../admin/views/Clients"),
        },
        // {
        //   path: "treatments",
        //   component: () => import("../admin/views/Treatments"),
        // },
        {
          path: "shopgoods",
          component: () => import("../admin/views/ShopGoods"),
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
    const currentclient = store.state.auth.role;
    const requireAuth = to.matched.some((record) => record.meta.auth);

    if (requireAuth && !currentclient) {
      next("/login?message=login");
    } else {
      if (/^\/main_doc/.test(to.path) && currentclient !== "DOCTOR") {
        switch (currentclient) {
          case "ADMIN":
            next("/main_admin");
            break;
          case "client":
            next("/main/clients");
            break;
        }
      } else if (/^\/main_admin/.test(to.path) && currentclient !== "ADMIN") {
        switch (currentclient) {
          case "DOCTOR":
            next("/main_doc");
            break;
          case "client":
            next("/main/clients");
            break;
        }
      } else if (/\/clients/.test(to.path) && currentclient !== "client") {
        switch (currentclient) {
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
