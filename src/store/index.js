import { createStore } from "vuex";
import gameModule from "./modules/game/index.js";

export default createStore({
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
  getters: {
    teams: (state) => state.teams,
  },
  mutations: {
    addTeam: (state, payload) => state.teams.push(payload.team),
    resetScores(state) {
      [...state.teams].forEach((team) => {
        team.score = 0;
      });
    },
    resetTeams(state) {
      state.teams = [];
    },
  },
  actions: {
    addTeam(context, payload) {
      context.commit("addTeam", {
        team: payload.team,
      });
    },
    resetScores(context) {
      context.commit("resetScores");
    },
    resetTeams(context) {
      context.commit("resetTeams");
    },
  },
  modules: {
    game: gameModule,
  },
});
