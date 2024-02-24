/* This code is a modified version of  GreatStack's quiz app tutorial. The YouTube link is:
https://www.youtube.com/watch?v=PBcqGxrr9g8
*/

const checkpoint1Questions = [
  // kinematic equation questions
  {
    question:
      "A car moving at 20 m/s overtakes a motorcycle at rest (t=0). From that point, the motorcycle starts accelerating at 4 m/s². How long will it take for the motorcycle to reach the car?",
    options: [
      { text: "10 seconds", correct: true },
      // picking this probably means they don't know what formula to use
      { text: "20 seconds", correct: false },
      // picking this probably means they forgot to square time
      { text: "0 seconds", correct: false },
    ],
  },
  {
    question:
      // This question was gotten from the Physics Classroom, 1-D Kinematics Lesson 6.
      "An airplane starting from rest accelerates down a runway at 3.20 m/s² for 32.8s until it finally lifts off the ground. How far did the plane travel before takeoff?",
    options: [
      { text: "1721.34 meters", correct: true },
      // choosing this probably means they forgot to square time
      { text: "52.48 meters", correct: false },
      // choosing this probably means they don't know what formula to use
      { text: "807.34 meters", correct: false },
    ],
  },
];

const checkpoint2Questions = [
  // representing motion with graphs questions
  {
    question:
      // the image for this question is in the Google document
      "The velocity-time graph for a car is shown in the image below. How far did the car travel after 5 seconds?",
    options: [
      { text: "25 meters", correct: true },
      // choosing this probably means they see velocity as displacement
      { text: "5 meters", correct: false },
      // choosing this probably means they don't know how to solve the problem
      { text: "10 meters", correct: false },
    ],
  },
  {
    question:
      // the image for this question is in the Google document
      "The velocity-time graph is shown in the image below. Which graph is the corresponding acceleration graph?",
    options: [
      { text: "b", correct: true },
      // choosing this probably means they mistook displacement for acceleration
      { text: "a", correct: false },
      // choosing this probably means they think acceleration is continuous
      { text: "c", correct: false },
    ],
  },
];

const checkpoint3Questions = [
  // free fall and acceleration of gravity questions
  {
    question:
      // the image for this question is in the Google document
      "A ball is thrown up vertically with an initial velocity of 5 m/s  to reach a max height of 20 m. If the ball starts falling back down at t = 3s, what time will the ball reach the ground?",
    options: [
      { text: "t = 5 seconds", correct: true },
      // choosing this probably means they forgot to add the initial time
      { text: "t = 2 seconds", correct: false },
      // choosing this probably means they added initial time but forgot to square time
      { text: "t = 9 seconds", correct: false },
    ],
  },
  {
    question:
      // the image for this question is in the Google document
      "A stunt actress skydives from a cliff and reaches the ground in 1.5s. What was the height of the cliff she jumped off?",
    options: [
      { text: "11.025 meters", correct: true },
      // choosing this probably means they forgot to square time
      { text: "7.35 meters", correct: false },
      // choosing this probably means they don't know how to solve the problem
      { text: "10 meters", correct: false },
    ],
  },
];

// these are the 'plugs' for the buttons
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let checkpoint = document.getElementById("checkpoint");

// this is the code for the trivia
let currentQuestionIndex = 0;
let score = 0;
let checkpointsCompleted = 0;

// this will reset the score and queston number
function startTrivia() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// this will display a question and its options based on the checkpoint
function showQuestion() {
  resetState();
  switch (checkpoint) {
    case "checkpoint1":
      questionElement.innerHTML =
        checkpoint1Questions[currentQuestionIndex].question;
      break;
    case "checkpoint2":
      questionElement.innerHTML =
        checkpoint2Questions[currentQuestionIndex].question;
      break;
    case "checkpoint3":
      questionElement.innerHTML =
        checkpoint3Questions[currentQuestionIndex].question;
      break;
  }
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(n) {
  const selectedBtn = n.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  switch (checkpoint) {
    case "checkpoint1":
      questionElement.innerHTML = `You scored ${score} out of ${checkpoint1Questions.length}`;
      break;
    case "checkpoint2":
      questionElement.innerHTML = `You scored ${score} out of ${checkpoint2Questions.length}`;
      break;
    case "checkpoint3":
      questionElement.innerHTML = `You scored ${score} out of ${checkpoint3Questions.length}`;
      break;
  }
  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < checkpoint1Questions.length) {
    showQuestion();
  } else {
    // this shows the results and gives access to the next checkpoint if the user passed
    switch (checkpoint) {
      case "checkpoint1":
        if score == 2 {
          checkpointsCompleted = 1;
        } 
        showScore();
        break;
      case "checkpoint2":
        showScore();
        if score == 2 {
          checkpointsCompleted = 2;
        } 
        break;
      case "checkpoint3":
        showScore();
        if score == 2 {
          checkpointsCompleted = 3;
        }
        break;
    }
  }
}

startQuiz();

export default function App() {
  return <Greeting name="world" />;
}
