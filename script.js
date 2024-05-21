"use strict";
const dice = document.querySelector(".dice");
let active_score;
let active_player;
let playing;

const init = function () {
  playing = true;
  active_score = 0;
  active_player = 0;
  dice.classList.add("hidden");
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
};

const closemodal = function () {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
};

init();

const hold = function (random) {
  if (playing) {
    if (random !== 1) {
      let x = Number(document.getElementById(`score--${active_player}`).textContent);
      document.getElementById(`score--${active_player}`).textContent = x + active_score;
    }
    document.getElementById(`current--${active_player}`).textContent = 0;
    document.querySelector(`.player--${active_player}`).classList.remove("player--active");
    active_score = 0;
    const player_num = active_player + 1;
    if (Number(document.getElementById(`score--${active_player}`).textContent) > 99) {
      document.querySelector(`.player--${active_player}`).classList.add("player--winner");
      document.querySelector(`.player--${active_player}`).classList.remove("player--active");
      document.getElementById(`name--${active_player}`).textContent = `Player ${player_num} Wins`;
      dice.classList.add("hidden");
      playing = false;
    }
    active_player = active_player === 0 ? 1 : 0;
    document.querySelector(`.player--${active_player}`).classList.add("player--active");
  }
};

// ---------roll dice-----------
//show random dice number
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${random}.png`;
    //if not one face, then add to current score
    if (random !== 1) {
      active_score = active_score + random;
      document.getElementById(`current--${active_player}`).textContent = active_score;
    }
    // else change player
    else {
      hold(random);
    }
  }
});

//hold: change player
document.querySelector(".btn--hold").addEventListener("click", hold);
//new game: change player to 1
document.querySelector(".btn--new").addEventListener("click", init);

document.querySelector(".btn--rule").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});

document.querySelector(".close-modal").addEventListener("click", closemodal);
document.addEventListener("keydown", closemodal);
document.querySelector(".overlay").addEventListener("click", closemodal);
