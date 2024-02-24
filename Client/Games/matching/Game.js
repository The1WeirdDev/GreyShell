const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const div4 = document.getElementById("div4");
const correct_image = document.getElementById("CORRECT");

const word = document.getElementById("GAMEHEADER");

const base_flashcard = {
  word: "Verde",
  correct_choice: 1,

  choices: [
    ["Purple", "/games/matching/Images/Purple.png"],
    ["Green", "/games/matching/Images/Green.png"],
    ["Blue", "/games/matching/Images/Blue.png"],
    ["Red", "/games/matching/Images/Red.png"],
  ],
};
var ids = 0;
var current_flashcard = null;
class GameButton {
  constructor(button) {
    this.id = ids;
    ids++;
    this.button = button;
    this.image = this.button.getElementsByTagName("img")[0];
    this.header = this.button.getElementsByTagName("h1")[0];

    this.image.onclick = () => {
      OnGameImageClicked(this.id);
    };
  }

  Hide() {
    this.button.style.display = "none";
  }

  Show() {
    this.button.style.display = "block";
  }

  SetImage(url) {
    this.image.src = url;
  }

  SetText(text) {
    this.header.innerText = text;
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function OnGameImageClicked(id) {
  correct_image.style.display = "block";
  if (id == current_flashcard.correct_choice) {
    console.log("Correct");
  } else {
    console.log("WRONG");
  }

  for (var i = 0; i < 4; i++) {
    buttons[i].Hide();
  }

  setTimeout(() => {
    SetFlashcard(base_flashcard);
  }, 1000);
}

const game_button_1 = new GameButton(div1);
const game_button_2 = new GameButton(div2);
const game_button_3 = new GameButton(div3);
const game_button_4 = new GameButton(div4);

var buttons = [game_button_1, game_button_2, game_button_3, game_button_4];

function ShuffleArray(array) {}

function SetFlashcard(flashcard) {
  correct_image.style.display = "none";
  current_flashcard = flashcard;
  var array = buttons;
  ShuffleArray(array);

  word.innerText = current_flashcard.word;
  for (var i = 0; i < 4; i++) {
    array[i].SetText(current_flashcard.choices[i][0]);
    array[i].SetImage(current_flashcard.choices[i][1]);
    array[i].Show();
  }
}

SetFlashcard(base_flashcard);
