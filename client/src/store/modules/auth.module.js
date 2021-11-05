// import axios from "../../../axios/requests";
// import store from "../../index";
import axios from "axios";
import { login } from "../../../../authRouter/authController";
const { PORT } = require("../../../../config");

const TOKEN_KEY_CLIENT = "jwt-token-client";

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY_CLIENT),
      activeUserEmail: localStorage.getItem("emailActiveUser"),
    };
  },
  mutations: {
    setActiveUser(state, email) {
      state.activeUserEmail = email;
      localStorage.setItem("emailActiveUser", email);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY_CLIENT, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY_CLIENT);
      localStorage.removeItem("emailActiveUser");
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      console.log("ppp", payload);
      try {
        const { data } = await axios.post(
          `http://localhost:${PORT}/auth/login`,
          { ...payload }
        );
        console.log(data.token);
        commit("setToken", data.token);
        commit("setActiveUser", payload.username);
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
