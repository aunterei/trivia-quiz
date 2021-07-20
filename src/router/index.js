import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TeamSelection from "../views/TeamSelection.vue";
import Game from "../views/Game.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "homeTransition" },
  },
  {
    path: "/teams",
    name: "Team Selection",
    component: TeamSelection,
    meta: { transition: "teamsTransition" },
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
    meta: { transition: "gameTransition" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
