var startQuiz = document.getElementById("startQuiz");
var answers = document.getElementById("answers");
var currentQuestion = 0;
var time = document.getElementById("timer");
let timeCounter;
let timeerInterval;

document.getElementById("startQuiz").addEventListener("click", function () {
  document.getElementById("quiz-intro").style.display = "none";
  document.getElementById("answers").style.display = "block";
  renderQuestion(currentQuestion);
  startTimer(20);
});

var startTimer = function (runTime) {
  timeCounter = runTime;
  time.textContent = timeCounter;
  timeerInterval = setInterval(function () {
    timeCounter--;
    time.textContent = timeCounter;
    if (timeCounter == 0) {
      //end game logic
      clearInterval(timeerInterval);
    }
  }, 1000);
};

answers.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button")) {
    let choice = element.dataset.number;
    if (choice == questionsArray[currentQuestion].answerIndex) {
      console.log("correct");
    } else {
      console.log("wrong");
      timeCounter -= 10;
    }
    renderNextQuestion();
  }
});

const renderNextQuestion = function () {
  currentQuestion++;
  answers.innerHTML = "";
  if (currentQuestion != questionsArray.length) {
    renderQuestion(currentQuestion);
  } else {
    localStorage.setItem("Score", timeCounter);
    clearInterval(timeerInterval);
    //Show Results screen
  }
};

const renderQuestion = function (questionIdx) {
  let question = questionsArray[questionIdx];
  let choices = question.choices;
  let categoryElm = document.createElement("h2");
  categoryElm.textContent = question.category;

  let questionElm = document.createElement("h3");
  questionElm.textContent = question.question;
  answers.appendChild(categoryElm);
  answers.appendChild(questionElm);
  for (let i = 0; i < choices.length; i++) {
    let btn = document.createElement("button");
    btn.innerText = choices[i];
    btn.setAttribute("data-number", i);
    answers.appendChild(btn);
  }
};

let question1 = {
  category: "music",
  question: "Who wrote Paradise City?",
  choices: ["Motley Crue", "Guns N' Roses", "Pantera", "Nirvana"],
  answerIndex: 1,
};
let question2 = {
  category: "Heroes",
  question: "What is Iron Man's role?",
  choices: [
    "Save the world",
    "Make next level technology",
    "Make huge money",
    "Getting turned to steel in the great magnetic field",
    "All of the above",
  ],
  answerIndex: 4,
};
let question3 = {
  category: "math",
  question: "2+2",
  choices: ["one", "two", "three", "four"],
  answerIndex: 3,
};
let questionsArray = [question1, question2, question3];
