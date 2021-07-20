import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      questions: [
        "Quel est le métier de {0} ?",
        "De quoi {0} a-t'il.elle le plus peur ?",
      ],
    };
  },
  mutations,
  actions,
  getters,
};
