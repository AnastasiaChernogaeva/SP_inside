import axios from "axios";
import router from "../../router";
const { PORT } = require("../../../../config");

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
      error: "",
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
    setError(state, error) {
      state.error = error;
    },
    deleteError(state) {
      state.error = "";
    },
  },
  actions: {
    async editElem({ commit, dispatch }, payload) {
      console.log("PAYLOAD", payload.item);
      const { data } = await axios.put(
        `http://localhost:${PORT}/api/${payload.type}`,
        {
          ...payload.item,
        }
      );
      commit("setError", data.message);
    },

    async addNew({ commit, dispatch }, payload) {
      // console.log("data", payload.items);
      const { data } = await axios.post(
        `http://localhost:${PORT}/api/${payload.type}`,
        {
          ...payload.items,
        }
      );
      commit("setError", data.message);
      commit("addInfo", data, payload.type);
      return data;
    },

    async deleteItem(_, payload) {
      await axios.delete(`http://localhost:${PORT}/api/${payload.type}/`, {
        data: { id: payload.id },
      });
      commit("setError", data.message);
    },

    async getInfo({ commit }, payload) {
      const { data } = await axios.get(
        `http://localhost:${PORT}/api/${payload.type}`
      );
      commit("setInfo", data, payload.type);
      return data;
    },
  },
};
