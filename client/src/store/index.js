import { createStore, createLogger } from "vuex";

import petsModule from "./modules/pets.module";
import authModule from "./modules/auth.module";
import infoModule from "./modules/info.module";

const store = createStore({
  modules: {
    info: infoModule,
    pet: petsModule,
    auth: authModule,
  },
});

export default store;
