const GAME_TIME = 5;
let time = GAME_TIME;
let score = 0;
let isplaying = false;
let words = [];
let checkInterval;
let timeInterval;

const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const timeDisplay = document.querySelector(".time");
const scoreDisplay = document.querySelector(".score");
const button = document.querySelector(".button");


init();


function init(){
    buttonChange("게임을 불러오는중..");
    getwords();
    wordInput.addEventListener("input",checkMatch);
    checkInterval = setInterval(checkStatus,50);
}

function run(){
    if(isplaying){
        return;
    }
    isplaying = true;
    time = GAME_TIME;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown,1000);
    buttonChange("게임중...");
}


function checkStatus(){
    if(!isplaying && time === 0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}

function getwords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    response.data.forEach((word) => {
        if(word.length < 10) {
            words.push(word);
        }
    })
    buttonChange("게임시작");
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}



function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isplaying){
            return;
        }
        score ++;
        scoreDisplay.innerText = score;
        const randomIndex = Math.floor(Math.random () * words.length);
        wordDisplay.innerText = words[randomIndex]
    }
}

function countDown(){
    time > 0 ? time-- : isplaying = false;
    if(!isplaying){
        clearInterval(timeInterval);
        buttonChange("게임시작");
    }
    timeDisplay.innerText = time;
}





function buttonChange(text){
    button.innerText = text;
    text === "게임시작" ? button.classList.remove("loading") : button.classList.add("loading");
}