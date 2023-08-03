var startQuiz = document.getElementById("startQuiz");
var answers = document.getElementById("answers");
var currentQuestion = 0;
var time = document.getElementById("timer");
let timeCounter;
let timeerInterval;
var results = document.getElementById("results");
var submit = document.getElementById("submit");

document.getElementById("startQuiz").addEventListener("click", function () {
  document.getElementById("quiz-intro").style.display = "none";
  document.getElementById("answers").style.display = "block";
  renderQuestion(currentQuestion);
  startTimer(20);
});

submit.addEventListener("click", function (event) {
  event.preventDefault();
  let scores = localStorage.getItem("scores");
  var score = {
    name: document.getElementById("name").value,
    score: timeCounter,
  };

  if (scores == null) {
    localStorage.setItem("scores", JSON.stringify([score]));
  } else {
    let temp = JSON.parse(scores);
    temp.push(score);
    temp.sort(function (a, b) {
      if (a.score > b.score) {
        return -1;
      }

      if (b.score > a.score) {
        return 1;
      }

      return 0;
    });
    localStorage.setItem("scores", JSON.stringify(temp));
  }

  //localStorage.setItem("scores", JSON.//stringify(score));
});

var endQuiz = function () {
  answers.style.display = "none";
  results.style.display = "block";
  document.getElementById("quiz-results").textContent =
    "You scored " + timeCounter + " points!";
  clearInterval(timeerInterval);
  time.style.display = "none";
};

var startTimer = function (runTime) {
  timeCounter = runTime;
  time.textContent = timeCounter;
  timeerInterval = setInterval(function () {
    timeCounter--;
    time.textContent = timeCounter;
    if (timeCounter == 0) {
      endQuiz();
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
      if (timeCounter <= 0) {
        timeCounter = 0;
        endQuiz();
      }
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
    endQuiz();
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
