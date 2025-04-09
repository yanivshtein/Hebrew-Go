const questions = [
  {
    text: "?איזה חג חוגגים בחודש תשרי",
    answers: ["ראש השנה", "שבועות", "פסח", "פורים"],
    correctIndex: 0,
    hint: "בתחילת השנה"
  },
  {
    text: "?מהי עיר הבירה של ישראל",
    answers: ["תל אביב", "ירושלים", "חיפה", "באר שבע"],
    correctIndex: 1,
    hint: "עיר עם הרבה היסטוריה ודתות"
  },
  {
    text: "?מהו ההר הגבוה ביותר בישראל",
    answers: ["הר מירון", "הר הכרמל", "הר החרמון", "הר תבור"],
    correctIndex: 2,
    hint: "יש בו גם אתר סקי"
  },
  {
    text: "?באיזו עיר נמצא שוק מחנה יהודה",
    answers: ["תל אביב", "ירושלים", "אשדוד", "נתניה"],
    correctIndex: 1,
    hint: "העיר עם הכותל"
  },
  {
    text: "?איזה ים נמצא בדרום הארץ",
    answers: ["ים התיכון", "ים המלח", "ים סוף", "הים האדום"],
    correctIndex: 2,
    hint: "נמצא ליד אילת"
  },
  {
    text: "?מה פירוש הביטוי בסלנג 'חבל על הזמן'",
    answers: ["בבקשה", "תודה", "שבת", "שלום"],
    correctIndex: 3,
    hint: "גם ברכה וגם פרידה"
  },
  {
    text: "?מהי צורת הרבים של המילה 'ספר'",
    answers: ["ספרות", "ספרים", "ספריות", "ספורים"],
    correctIndex: 1,
    hint: "יש לי הרבה כאלה במדף"
  }
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
    let q;
  
    function renderQuestion(index) {
      counter++;
      q = questions[index];
  
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
        alert(`קח רמז על חשבון משרד הקליטה : ${q.hint}`);
      }
      else if (time==0){
        clearInterval(timerInterval);
        alert("Time's Up!")
        currentQuestionIndex = getUniqueRandomIndex();
        renderQuestion(currentQuestionIndex);
        time = 30;
        timerInterval = setInterval(updateTimer, 1000);
      }
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;
    }
    let timerInterval = setInterval(updateTimer, 1000);
  
    // Random index
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
  
    // כפתור "שאלה הבאה"
    nextButton.addEventListener("click", () => {
      const selectedInput = document.querySelector('input[name="quizAnswer"]:checked');
  
      if (selectedInput) {
        const selectedIndex = parseInt(selectedInput.value);
        const isCorrect = selectedIndex === questions[currentQuestionIndex].correctIndex;

        if (isCorrect){
          alert("תשובה נכונה")
        }
        else{
          alert("תשובה שגויה")
        }
      }
      // עצירת הטיימר הקודם
      clearInterval(timerInterval);

      // התחלה מחדש
      time = 30;
      timerInterval = setInterval(updateTimer, 1000);
      currentQuestionIndex = getUniqueRandomIndex();
      renderQuestion(currentQuestionIndex);
    });
  
    // טעינה ראשונית
    currentQuestionIndex = getUniqueRandomIndex();
    renderQuestion(currentQuestionIndex);
  });
  