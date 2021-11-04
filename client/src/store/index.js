import { createStore, createLogger } from "vuex";

import petsModule from "./modules/pets.module";
import authModule from "./modules/auth.module";

const store = createStore({
  modules: {
    pet: petsModule,
    auth: authModule,
  },
});

export default store;
