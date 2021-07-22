export default {
  addTeam: (state, payload) => state.teams.push(payload.team),
  resetScores(state) {
    [...state.teams].forEach((team) => {
      team.score = 0;
    });
  },
  resetTeams(state) {
    state.teams = [];
  },
};
