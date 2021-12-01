// import axios from "../../../axios/requests";
// import store from "../../index";
import axios from "axios";
import router from "../../router";
// import { login } from "../../../../authRouter/authController";
const { PORT } = require("../../../../config");

const TOKEN_KEY_CLIENT = "jwt-token-client";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY_CLIENT),
      activeUser: localStorage.getItem("activeUser"),
      role: localStorage.getItem("role"),
      error: "",
    };
  },
  mutations: {
    setActiveUser(state, email) {
      state.activeUserEmail = email;
      localStorage.setItem("activeUser", email);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY_CLIENT, token);
    },
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
    setError(state, error) {
      state.error = error;
    },
    deleteError(state) {
      state.error = "";
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      const { data } = await axios.post(`http://localhost:${PORT}/auth/login`, {
        ...payload,
      });
      // console.log("data message", data.message);
      // console.log("data message boolean", !!data.message);

      if (!!data.message) {
        commit("setError", data.message);
      } else if (!data.message) {
        commit("setToken", data.token);
        commit("setActiveUser", payload.username);
        commit("setRole", payload.role);
      }
    },

    async registrate({ commit, dispatch }, payload) {
      const { data } = await axios.post(
        `http://localhost:${PORT}/auth/registration`,
        {
          ...payload,
        }
      );

      commit("setError", data.message);
    },

    async deleteUser(_, payload) {
      await axios.delete(`http://localhost:${PORT}/auth/deleteUser`, {
        data: { infoId: payload.infoId },
      });
    },

    // async updateUser(_, payload) {
    //   await axios.delete(`http://localhost:${PORT}/auth/updateUser`, {
    //     ...payload.item,
    //   });
    // },
  },
};
