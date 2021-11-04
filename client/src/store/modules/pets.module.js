// import axios from "../../../axios/requests";
// import store from "../../index";

export default {
  namespaced: true,
  state() {
    return {
      allPetsForms: [],
    };
  },
  mutations: {
    addNewFormInsidePetsBase(state, newPetInfo) {
      if (!state.allPetsForms.includes(newPetInfo)) {
        state.allPetsForms = [...state.allPetsForms, newPetInfo];
        localStorage.setItem("Cards", JSON.stringify(state.allPetsForms));
      }
    },
    loadPetCards(state) {
      let value = localStorage.getItem("Cards");
      if (value) state.allPetsForms = JSON.parse(value);
    },
    delete(state, pet) {
      if (state.allPetsForms.includes(pet)) {
        let index = state.allPetsForms.indexOf(pet);
        state.allPetsForms.splice(index, 1);
        localStorage.setItem("Cards", JSON.stringify(state.allPetsForms));
      }
    },
  },
};
