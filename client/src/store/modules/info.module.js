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
    setInfo(state, data, type) {
      switch (type) {
        case "clinics":
          state.clinics = data;
          break;
        case "cities":
          state.cities = data;
          break;
        case "doctors":
          state.doctors = data;
          break;
        case "pets":
          state.pets = data;
          break;
        case "services":
          state.services = data;
          break;
        case "shopgoods":
          state.shopgoods = data;
          break;
        case "treatments":
          state.treatments = data;
          break;
        case "users":
          state.users = data;
          break;
        case "workingtime":
          state.workingtime = data;
          break;
      }
      // state.role = role;
      // localStorage.setItem("role", role);
    },
    addInfo(state, data, type) {
      switch (type) {
        case "clinics":
          state.clinics.push(data);
          break;
        case "cities":
          state.cities.push(data);
          break;
        case "doctors":
          state.doctors.push(data);
          break;
        case "pets":
          state.pets.push(data);
          break;
        case "services":
          state.services.push(data);
          break;
        case "shopgoods":
          state.shopgoods.push(data);
          break;
        case "treatments":
          state.treatments.push(data);
          break;
        case "users":
          state.users.push(data);
          break;
        case "workingtime":
          state.workingtime.push(data);
          break;
      }
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
  },
  actions: {
    async addNew({ commit, dispatch }, payload) {
      const { data } = await axios.post(
        `http://localhost:${PORT}/api/${payload.type}`,
        {
          ...payload.items,
        }
      );
      commit("addInfo", data, payload.type);

      // console.log("data message boolean", !!data.message);
      //   if (!!data.message) {
      //     commit("setError", data.message);
      //   } else if (!data.message) {
      //     commit("setToken", data.token);
      //     commit("setActiveUser", payload.username);
      //     commit("setRole", payload.role);
      //   }
    },
    async getInfo({ commit, dispatch }, payload) {
      // payload.type
      const { data } = await axios.get(
        `http://localhost:${PORT}/api/${payload.type}`
      );
      commit("setInfo", data, payload.type);
      return data;
      // console.log("data message", data);
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
