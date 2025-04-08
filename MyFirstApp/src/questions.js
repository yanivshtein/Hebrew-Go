const questions = [
    {
      text: "?איזה חג חוגגים בחודש תשרי",
      answers: ["ראש השנה", "שבועות", "פסח", "פורים"],
      correctIndex: 0,
    },
    {
      text: "What color is the sky?",
      answers: ["Blue", "Green", "Yellow", "Pink"],
      correctIndex: 0,
    },
    {
      text: "How many days are in a week?",
      answers: ["5", "6", "7", "8"],
      correctIndex: 2,
    },
  ];
  
  // פונקציה שמחזירה אינדקס רנדומלי
  function getRandomIndex() {
    return Math.floor(Math.random() * questions.length);
  }
  
  // שמירה של שאלות שכבר הוצגו
  let seen = new Set();
  let currentQuestionIndex = 0;
  
  document.addEventListener("DOMContentLoaded", () => {
    const questionTextEl = document.getElementById("question-text");
    const answersContainerEl = document.getElementById("answers-container");
    const nextButton = document.getElementById("next-btn");
    const timerElement = document.getElementById("timer");
    const q_title = document.getElementById("counter");
    let counter = 0;
  
    function renderQuestion(index) {
      counter++;
      const q = questions[index];
  
      q_title.textContent = "שאלה מספר " + counter;
      questionTextEl.textContent = q.text;
  
      // ניקוי תשובות ישנות
      answersContainerEl.innerHTML = "";
  
      // יצירת קונטיינר עם grid בן שתי עמודות
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
  
    // Timer
    let time = 30;
    function updateTimer() {
      time--;
      if (time === 10) {
        alert("קח רמז - על חשבון משרד הקליטה");
      }
      else if (time==0){
        clearInterval(timerInterval);
        alert("Time's Up!")
      }
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    }
    let timerInterval = setInterval(updateTimer, 1000);
  
    // Random index
    function getUniqueRandomIndex() {
      if (seen.size === questions.length) {
        alert("כל השאלות הוצגו! מתחילים מחדש.");
        seen.clear();
      }
  
      let randIndex = getRandomIndex();
      while (seen.has(randIndex)) {
        randIndex = getRandomIndex();
      }
  
      seen.add(randIndex);
      return randIndex;
    }
  
    // כפתור "שאלה הבאה"
    nextButton.addEventListener("click", () => {
      currentQuestionIndex = getUniqueRandomIndex();
      renderQuestion(currentQuestionIndex);
    });
  
    // טעינה ראשונית
    currentQuestionIndex = getUniqueRandomIndex();
    renderQuestion(currentQuestionIndex);
  });
  