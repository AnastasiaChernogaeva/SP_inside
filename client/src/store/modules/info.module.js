import axios from "axios";
import router from "../../router";
const { PORT } = require("../../../../config");

const TOKEN_KEY_CLIENT = "jwt-token-client";

export default {
  namespaced: true,
  state() {
    return {
      clinics: [],
      doctors: [],
      services: [],
      cities: [],
      workingtime: [],
      pets: [],
      users: [],
      treatments: [],
      shopgoods: [],
    };
  },
  mutations: {
    setRole(state, role) {
      state.role = role;
      localStorage.setItem("role", role);
    },
    logout(state) {
      state.token = null;
      state.activeUser = null;
      state.role = null;

      localStorage.removeItem(TOKEN_KEY_CLIENT);
      localStorage.removeItem("activeUser");
      localStorage.removeItem("role");
      router.push("/");
    },
  },
  actions: {
    async addNew({ commit, dispatch }, payload) {
      //   const { data } = await axios.post(`http://localhost:${PORT}/auth/login`, {
      //     ...payload,
      //   });
      // console.log("data message", data.message);
      // console.log("data message boolean", !!data.message);
      //   if (!!data.message) {
      //     commit("setError", data.message);
      //   } else if (!data.message) {
      //     commit("setToken", data.token);
      //     commit("setActiveUser", payload.username);
      //     commit("setRole", payload.role);
      //   }
    },
    // async registrate({ commit, dispatch }, payload) {
    //   const { data } = await axios.post(
    //     `http://localhost:${PORT}/auth/registration`,
    //     {
    //       ...payload,
    //     }
    //   );

    //   commit("setError", data.message);
    // },
  },
};
