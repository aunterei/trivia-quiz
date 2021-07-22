<template>
  <div class="main-container">
    <div class="form-container flex flex-column center">
      <h1 class="row">Equipe n° {{ isFirstTeam ? 1 : 2 }}</h1>

      <section class="row center flex flex-column">
        <h2>
          Veuillez entrer le nom l'équipe numéro
          {{ isFirstTeam ? 1 : 2 }} :
        </h2>

        <base-input-text
          id="teamNameInput"
          ref="teamNameInput"
          placeholder="Nom de l'équipe"
          @emitText="teamNameListener"
        />
      </section>

      <section class="row center flex flex-column">
        <h2>
          Liste des joueurs:
        </h2>

        <div id="addPlayerForm" class="flex flex-center">
          <base-input-text
            ref="playerNameInput"
            placeholder="Nom"
            @emitText="teamPlayerListener"
            @submit="addPlayer"
          />

          <base-button class="button" @click="addPlayer" type="button">
            Ajouter
          </base-button>
        </div>

        <ul>
          <li v-for="player in players" :key="player">
            {{ player }}
          </li>
        </ul>
      </section>

      <div class="row flex bottom">
        <base-button class="button" type="button" link :to="home">
          Annuler
        </base-button>
        <base-button class="button" mode="valid" @click="validate">
          Valider
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/ui/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      showDialog: false,
      isFirstTeam: true,
      teamName: "",
      playerName: "",
      players: [],
    };
  },
  methods: {
    teamNameListener(value) {
      this.teamName = value;
    },
    teamPlayerListener(value) {
      this.playerName = value;
    },
    validate() {
      if (this.teamName.trim() !== "" && this.players.length > 0) {
        this.$store.dispatch("addTeam", {
          team: {
            teamName: this.teamName,
            teamPlayers: this.players,
            score: 0,
          },
        });

        this.$refs.teamNameInput.clearText();
        this.players = [];

        if (this.isFirstTeam) {
          this.isFirstTeam = false;
        } else {
          this.$router.replace("/game");
        }
        console.log(this.$store.getters["teams"]);
      } else {
        //TODO: Error Handling :
        // + If two teams have same name
      }
    },
    addPlayer() {
      // If players name is null or empty
      if (this.playerName.trim() === "") {
        console.log("error"); //TODO: handle error with modal
      }
      // Or if the name is already in the list
      else if (this.players.find((x) => x == this.playerName)) {
        console.log("error");
      }
      // If everything is ok, add player to the list
      else {
        this.players.push(this.playerName);
      }
      this.$refs.playerNameInput.clearText();
    },
  },
  computed: {
    home() {
      return "/";
    },
  },
  created() {
    this.$store.dispatch("resetTeams");
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: max-content;
  position: absolute;
  top: 0;
  left: 0;
}

.form-container {
  min-height: 100vh;
}

section {
  width: 80%;
  max-width: 50rem;
}

/* Heading */

h1 {
  font-size: 5rem;
  margin: 5rem 0;
}

h2 {
  font-size: 1.9rem;
  margin-bottom: 2rem;
}

/* Player List */

ul {
  list-style-image: url("../assets/img/rocket.svg");
  width: 100%;
  height: 20rem;
  padding-left: 3rem;
  overflow: scroll;
  max-width: 50rem;
}

ul::-webkit-scrollbar {
  display: none;
}

ul > li {
  font-size: 1.5rem;
}

/* Input Forms */

#teamNameInput {
  margin-bottom: 3rem;
}

#addPlayerForm {
  width: 100%;
  margin-bottom: 2rem;
}

#addPlayerForm > button {
  margin: 0 2rem;
  height: 80%;
}

.button {
  margin-bottom: 2.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

/* Desktop */

@media (min-width: 769px) {
  h1 {
    font-size: 6rem;
    margin: 7rem 0;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 3.5rem;
  }

  ul > li {
    font-size: 2rem;
  }
}
</style>
