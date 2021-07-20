<template>
  <div class="main-container">
    <div class="img-container flex flex-center">
      <img src="../assets/background.png" alt="" />
    </div>

    <div
      ref="timeoutDiv"
      class="pop-window timeout flex flex-center flex-column"
    >
      <h1>Le temps est écoulé !</h1>
      <h2>Dommage...</h2>
      <img src="../assets/parkour.gif" alt="" />
    </div>

    <div ref="answerDiv" class="pop-window answer flex flex-center flex-column">
      <h1>Vous avez appuyé sur le buzzer!</h1>
      <h2>La réponse est-elle juste ?</h2>
      <div class="game-buttons">
        <base-button mode="valid" @click="goodAnswer">Oui</base-button>
        <base-button @click="finishRound">Non</base-button>
      </div>
    </div>

    <div v-if="isGameOn" class="score-container flex space-between">
      <div class="timer">{{ timer }}</div>
      <div>
        {{ teams[0].teamName }} : {{ teams[0].score }} -
        {{ teams[1].teamName }} : {{ teams[1].score }}
      </div>
    </div>

    <div class="question-container flex flex-center flex-column">
      <div v-if="isGameOn">
        <h2>
          Question n°
          {{ questionNumber }} - Equipe {{ currentTeam.teamName }} :
        </h2>

        <h1>{{ question }}</h1>
      </div>
      <div v-else>
        <h1>GAME OVER!</h1>
        <ul>
          <li v-for="team in teams" :key="team">
            {{ team.teamName }} : {{ team.score }}
          </li>
        </ul>
        <div class="retry-container">
          <h2>Rejouer ?</h2>
          <div class="retry-container__buttons  flex flex-center">
            <base-button mode="valid" @click="initGame">Oui</base-button>
            <base-button link :to="home">Non</base-button>
          </div>
        </div>
      </div>
    </div>
    <button v-if="isGameOn" id="buzzer" @click="buzz">
      <img src="../assets/buzzer.png" alt="" />
    </button>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  data() {
    return {
      questions: [],
      teams: [],
      currentTeam: null,
      otherTeam: null,
      questionNumber: 0,
      question: "",
      isGameOn: true,
      timer: 0,
      timerInterval: null,
    };
  },
  created() {
    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != "undefined" ? args[number] : match;
        });
      };
    }
    window.addEventListener("gamepadconnected", function(e) {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
      );
    });

    this.initGame();
  },
  methods: {
    initGame() {
      this.isGameOn = true;
      this.questionNumber = 0;
      this.$store.dispatch("resetScores");
      this.teams = this.$store.getters["teams"];
      this.questions = this.$store.getters["questions"];
      this.currentTeam = this.teams[0];
      this.otherTeam = this.teams[1];

      this.nextQuestion();
      this.initTimer();
    },
    rand(lowest, highest) {
      var adjustedHigh = highest - lowest + 1;
      return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
    },
    goodAnswer() {
      this.currentTeam.score++;
      this.finishRound();
    },
    finishRound() {
      gsap.to(this.$refs.answerDiv, { left: "100%", duration: 1 });

      let tmp = this.currentTeam;
      this.currentTeam = this.otherTeam;
      this.otherTeam = tmp;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.questions.length > 0) {
        this.questionNumber++;
        let unformattedQuestion = this.questions[
          this.rand(0, this.questions.length - 1)
        ];

        this.questions = this.questions.filter(
          (e) => e !== unformattedQuestion
        );

        this.question = unformattedQuestion.format(
          this.otherTeam.players[
            this.rand(0, this.otherTeam.players.length - 1)
          ]
        );

        this.initTimer();
      } else {
        this.isGameOn = false;
        clearInterval(this.timerInterval);
      }
    },
    initTimer() {
      if (this.timerInterval !== null) clearInterval(this.timerInterval);

      this.timer = 60;

      this.timerInterval = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(this.timerInterval);
          this.timeOut();
        }
      }, 1000);
    },
    timeOut() {
      gsap.to(this.$refs.timeoutDiv, { scale: 1, rotation: 720, duration: 1 });
      setTimeout(() => {
        new gsap.timeline({
          onComplete: () => {
            this.nextQuestion();
          },
        }).to(this.$refs.timeoutDiv, {
          scale: 0,
          rotation: 0,
          duration: 1,
        });
      }, 5000);
    },
    buzz() {
      clearInterval(this.timerInterval);
      gsap.to(this.$refs.answerDiv, { left: 0, duration: 1 });
    },
  },
};
</script>

<style scoped>
.pop-window {
  position: fixed;
  z-index: 4000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
.answer {
  background-color: #d49d42;
  left: 100%;
}
.timeout {
  background-color: #c15050;

  transform: scale(0);
}
.timeout > img {
  max-width: 100%;
}
.main-container {
  height: 100vh;
  width: 100%;
}

.img-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
}

.img-container > img {
  width: 100%;
  max-width: 55rem;
}

.score-container {
  position: fixed;
  font-size: 2rem;
  padding: 3rem;
  top: 0;
  right: 0;
  text-align: center;
  width: 100%;
}

.timer {
  background-color: #d49d42;
  width: 4rem;
  border-radius: 2rem;
}
.question-container {
  position: fixed;
  transform: translate(-50%, -45%);
  top: 50%;
  left: 50%;
  width: 250px;
  text-align: center;
}

h2 {
  margin-bottom: 3rem;
  font-size: 1.8rem;
}

h1 {
  font-size: 2.6rem;
}

.game-buttons > button {
  margin: 3rem 1rem;
}
.retry-container {
  margin-top: 1rem;
}
.retry-container__buttons > button {
  margin: 0rem 1rem;
}

ul {
  margin-top: 1rem;
  list-style-type: none;
}

li {
  color: #d97642;
  font-size: 1.8rem;
}

#buzzer {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 0px solid transparent;
  cursor: pointer;
  display: inline-block;
}

#buzzer > img {
  width: 100%;
}

#buzzer:hover,
#buzzer:active {
  background-color: transparent;
  border-color: white;
}
@media (max-height: 960px) and (min-width: 769px) {
  #buzzer {
    width: 15rem !important;
  }
}
@media (min-width: 769px) {
  .retry-container {
    margin-top: 2rem;
  }
  .score-container {
    padding: 5rem;
    font-size: 4rem;
  }
  .timer {
    width: 7rem;
  }
  .main-container {
    background-size: 40%;
    background-position: 50% 0%;
  }
  h2 {
    margin-bottom: 3rem;
    font-size: 2.2rem;
  }

  h1 {
    font-size: 3rem;
  }
  ul {
    margin-top: 2rem;
  }
  li {
    font-size: 2rem;
  }
  #buzzer {
    width: 20rem;
  }
}
</style>
