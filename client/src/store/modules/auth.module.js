// import axios from "../../../axios/requests";
// import store from "../../index";
import axios from "axios";
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
      localStorage.removeItem(TOKEN_KEY_CLIENT);
      localStorage.removeItem("activeUser");
      localStorage.removeItem("role");
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      // console.log("ppp", payload);
      try {
        const { data } = await axios.post(
          `http://localhost:${PORT}/auth/login`,
          { ...payload }
        );

        commit("setToken", data.token);
        commit("setActiveUser", payload.username);
        commit("setRole", payload.role);
      } catch (e) {
        throw new Error();
      }
    },
    async registrate({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post(
          `http://localhost:${PORT}/auth/registration`,
          {
            ...payload,
          }
        );
      } catch (e) {
        throw new Error();
      }
    },
  },
};
