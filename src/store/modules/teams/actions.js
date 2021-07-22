export default {
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
};
