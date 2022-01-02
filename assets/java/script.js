var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var timerElement = document.querySelector(".timer-count");
var startTimer;
var timer;
var myQuestions = [
  {
    question: "Who invented Java?",
    answers: {
      a: "Homer Simpson",
      b: "NASA",
      c: "James Gosling"
    },
    correctAnswer: "c"
  },
  {
    question: "What is JAVA?",
    answers: {
      a: "an object-oriented programmming language",
      b: "a cookie",
      c: "the Presidents nickname"
    },
    correctAnswer: "a"
  },
  {
    question: "From the options below wich is a Primary Goal of the creation of Java?",
    answers: {
      a: "Must be Simple",
      b: "must be robust and secure",
      c: "must be architechture-neutral and portable",
      d: "all of the above"
    },
    correctAnswer: "d"
  },
  {
    question: "When did it first appeared?",
    answers: {
      a: "Feb 1998",
      b: "July 1996",
      c: "December 26",
      d: "May 1995"
    },
    correctAnswer: "d"
  },
  {
    question: "What company originaly developed JAVA?",
    answers: {
      a: "Microsoft",
      b: "Apple",
      c: "Oracle",
      d: "WWE"
    },
    correctAnswer: "c"
  },
  {
    question: "Is Java Language the same as Javanese Language?",
    answers: {
      a: "True",
      b: "False",
    },
    correctAnswer: "b"
  }
];
function buildQuiz(){

  var output = [];


  myQuestions.forEach(
    (currentQuestion, questionNumber) => {


      var answers = [];


      for(letter in currentQuestion.answers){


        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }


      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );


  quizContainer.innerHTML = output.join('');
}

function showResults(){


  var answerContainers = quizContainer.querySelectorAll('.answers');


  let numCorrect = 0;


  myQuestions.forEach( (currentQuestion, questionNumber) => {


    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;


    if(userAnswer === currentQuestion.correctAnswer){

      numCorrect++;


      answerContainers[questionNumber].style.color = 'lightgreen';
    }

    else{

      answerContainers[questionNumber].style.color = 'red';
    }
  });


  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

function startTimer() {
    
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        
        if (isWin && timerCount > 0) {
          
          clearInterval(timer);
          winGame();
        }
      }
      
      if (timerCount === 0) {

        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

buildQuiz();

var previousButton = document.getElementById("previous");
var nextButton = document.getElementById("next");
var slides = document.querySelectorAll(".slide");
let currentSlide = 0;


showSlide(currentSlide);


submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide, startTimer());
