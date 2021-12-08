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
      // cities: [],
      // workingtime: [],
      pets: [],
      clients: [],
      // treatments: [],
      shopgoods: [],
      // photos:['https://forevervets.com/wp-content/uploads/bb-plugin/cache/mobile-dog-panorama.jpg', 'https://gaapp.org/wp-content/uploads/2021/05/Katze_1000x500.jpg', 'https://content.alphapaw.com/wp-content/uploads/2020/12/Hot-Spots-on-Dogs-Causes-Treatment-Pre....jpg', 'https://www.hamptonvetcentre.co.uk/wp-content/uploads/sites/12/2017/12/Misc-3-1000x500.jpg', 'https://advancedpetvet.com/wp-content/uploads/bb-plugin/cache/Advanced-Care-12-3-2019-6814-edit-panorama.jpg', 'https://www.winsfordvets.co.uk/wp-content/uploads/sites/10/2017/02/Emergency-care-1000x500.jpg', 'https://meowwiki.com/images/cat-cancer-treatment-1000x500.jpg' ],
      error: "",
    };
  },
  mutations: {
    setInfo(state, data, type) {
      switch (type) {
        case "clinics":
          state.clinics = data;
          break;
        // case "cities":
        //   state.cities = data;
        //   break;
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
        // case "treatments":
        //   state.treatments = data;
        //   break;
        case "clients":
          state.clients = data;
          break;
        // case "workingtime":
        //   state.workingtime = data;
        //   break;
      }
    },
    addInfo(state, data, type) {
      switch (type) {
        case "clinics":
          state.clinics.push(data);
          break;
        // case "cities":
        //   state.cities.push(data);
        //   break;
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
        // case "treatments":
        //   state.treatments.push(data);
        //   break;
        case "clients":
          state.clients.push(data);
          break;
        // case "workingtime":
        //   state.workingtime.push(data);
        //   break;
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
      // commit("setError", data.message);
    },

    async getInfo({ commit }, payload) {
      const { data } = await axios.get(
        `http://localhost:${PORT}/api/${payload.type}`
      );
      // console.log("data", data);
      commit("setInfo", data, payload.type);
      return data;
    },
  },
};
