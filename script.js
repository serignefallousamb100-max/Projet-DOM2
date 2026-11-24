// ===== Les questions =====
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "SQL"],
    correct: 1
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    answers: ["var", "let", "const", "define"],
    correct: 2
  },
  {
    question: "Which method adds an event to an element?",
    answers: ["addEvent()", "onEvent()", "addEventListener()", "attachClick()"],
    correct: 2
  },
  {
    question: "Which method selects the first element matching a CSS selector?",
    answers: [
      "getElementsByClass()",
      "querySelector()",
      "selectFirst()",
      "findElement()"
    ],
    correct: 1
  }
];

// ===== Éléments de la page =====
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const numberEl = document.querySelector(".question-number");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next");

// ===== État du quiz =====
let current = 0;          // numéro de la question affichée
let score = 0;
let selectedIndex = null; // réponse choisie (null = aucune)
let locked = false;       // true pendant l'affichage de la correction
let finished = false;

// 1. Afficher une question et ses réponses
function showQuestion() {
  const q = questions[current];
  selectedIndex = null;
  locked = false;

  numberEl.textContent = `Question ${current + 1} / ${questions.length}`;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((texte, i) => {
    const bouton = document.createElement("button");
    bouton.className = "answer";
    bouton.textContent = texte;
    bouton.dataset.index = i;
    answersEl.appendChild(bouton);
  });

  nextBtn.textContent = current === questions.length - 1 ? "Finish" : "Next";
  nextBtn.disabled = false;
}

// 2 et 3. Choisir une seule réponse et l'afficher en surbrillance
answersEl.addEventListener("click", (e) => {
  const bouton = e.target.closest(".answer");
  if (!bouton || locked) return;

  answersEl.querySelectorAll(".answer").forEach((b) => b.classList.remove("selected"));
  bouton.classList.add("selected");
  selectedIndex = Number(bouton.dataset.index);
});

// 5. Vérifier la réponse et mettre à jour le score
function verifierReponse() {
  const q = questions[current];
  const boutons = answersEl.querySelectorAll(".answer");

  locked = true;
  nextBtn.disabled = true;

  boutons[q.correct].classList.add("correct");

  if (selectedIndex === q.correct) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    boutons[selectedIndex].classList.add("wrong");
  }
}

// 6. Écran final
function afficherScoreFinal() {
  finished = true;
  numberEl.textContent = "Finished";
  questionEl.textContent = "Quiz completed!";

  let message = "Keep practicing, you'll get there!";
  if (score === questions.length) message = "Perfect score! 🎉";
  else if (score >= questions.length / 2) message = "Well done! 👍";

  answersEl.innerHTML = `<p class="final-score">Your final score: ${score} / ${questions.length}<br>${message}</p>`;
  nextBtn.textContent = "Restart";
  nextBtn.disabled = false;
}

// Recommencer le quiz
function recommencer() {
  current = 0;
  score = 0;
  finished = false;
  scoreEl.textContent = "Score: 0";
  showQuestion();
}

// 4. Bouton Next
nextBtn.addEventListener("click", () => {
  if (finished) {
    recommencer();
    return;
  }

  if (selectedIndex === null) {
    alert("Please choose an answer first.");
    return;
  }

  verifierReponse();

  // On laisse voir la correction avant de passer à la suite
  setTimeout(() => {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      afficherScoreFinal();
    }
  }, 1000);
});

// Démarrage
showQuestion();