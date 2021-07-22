import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      teams: [
        {
          teamName: "Super",
          teamPlayers: ["Quentin", "Mégane"],
          score: 0,
        },
        {
          teamName: "Génial",
          teamPlayers: ["Alex", "Malo"],
          score: 0,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
