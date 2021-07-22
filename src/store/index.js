import { createStore } from "vuex";
import teamsModule from "./modules/teams/index.js";
import questionsModule from "./modules/questions/index.js";

export default createStore({
  modules: {
    teams: teamsModule,
    questions: questionsModule,
  },
});
