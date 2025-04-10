document.addEventListener("DOMContentLoaded", () => {
  let questions = []; 
  let currentQuestionIndex = 0;
  let seen = new Set();
  let counter = 0;
  let q;

  const questionTextEl = document.getElementById("question-text");
  const answersContainerEl = document.getElementById("answers-container");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("timer");
  const q_title = document.getElementById("counter");
  const userDifficulty = localStorage.getItem("userDifficulty");
  const userLang = localStorage.getItem("userLang");


  // פונקציה שמחזירה אינדקס רנדומלי
  function getRandomIndex() {
    return Math.floor(Math.random() * questions.length);
  }

  function getUniqueRandomIndex() {
    if (seen.size === questions.length) {
      alert("נגמר המשחק");
      seen.clear();
      window.location.href = "endGame.html";
    }

    let randIndex = getRandomIndex();
    while (seen.has(randIndex)) {
      randIndex = getRandomIndex();
    }

    seen.add(randIndex);
    return randIndex;
  }

  function renderQuestion(index) {
    counter++;
    q = questions[index];

    q_title.textContent = "שאלה מספר " + counter;
    questionTextEl.textContent = q.question;
    answersContainerEl.innerHTML = "";

    const gridContainer = document.createElement("div");
    gridContainer.className = "grid grid-cols-2 gap-4";

    q.answers.forEach((answer, i) => {
      const label = document.createElement("label");
      label.className =
        "flex items-center space-x-2 bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quizAnswer";
      input.value = i;
      input.className = "h-4 w-4 text-blue-600";

      const span = document.createElement("span");
      span.textContent = answer;

      label.appendChild(input);
      label.appendChild(span);
      gridContainer.appendChild(label);
    });

    answersContainerEl.appendChild(gridContainer);
  }

  let time = 30;
  function updateTimer() {
    time--;
    if (time === 10) {
      alert(`קח רמז על חשבון משרד הקליטה : ${q.hint}`);
    } else if (time == 0) {
      clearInterval(timerInterval);
      alert("Time's Up!");
      currentQuestionIndex = getUniqueRandomIndex();
      renderQuestion(currentQuestionIndex);
      time = 30;
      timerInterval = setInterval(updateTimer, 1000);
    }

    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  }

  let timerInterval;

  nextButton.addEventListener("click", () => {
    const selectedInput = document.querySelector('input[name="quizAnswer"]:checked');
    if (selectedInput) {
      const selectedIndex = parseInt(selectedInput.value);
      const isCorrect = selectedIndex === q.correct;

      if (isCorrect) {
        alert("תשובה נכונה");
      } else {
        alert("תשובה שגויה");
      }
    }

    clearInterval(timerInterval);
    time = 30;
    timerInterval = setInterval(updateTimer, 1000);
    currentQuestionIndex = getUniqueRandomIndex();
    renderQuestion(currentQuestionIndex);
  });

  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data[userLang][userDifficulty]; // ✅ עכשיו מאתחל את המשתנה הגלובלי
      currentQuestionIndex = getUniqueRandomIndex();
      renderQuestion(currentQuestionIndex);
      timerInterval = setInterval(updateTimer, 1000);
    });
});
