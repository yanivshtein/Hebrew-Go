document.addEventListener("DOMContentLoaded", () => {
  let questions = []; 
  let currentQuestionIndex = 0;
  let seen = new Set();
  let counter = 0;
  let falafelBalls = 0; // Track falafel balls earned
  let q;
  let timerInterval;
  const falafelEmoji = "🧆"; // אימוג'י של פלאפל

  const questionTextEl = document.getElementById("question-text");
  const answersContainerEl = document.getElementById("answers-container");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("timer");
  const q_title = document.getElementById("counter");
  const userDifficulty = localStorage.getItem("userDifficulty");
  const userLang = localStorage.getItem("userLang");

  const hintButton = document.getElementById("hint-btn");
    hintButton.addEventListener("click", useHint);
  // פונקציה שמחזירה אינדקס רנדומלי
  function getRandomIndex() {
    return Math.floor(Math.random() * questions.length);
  }

  function getUniqueRandomIndex() {
    if (seen.size === questions.length) {
      clearInterval(timerInterval);
      const finalMessage = `המשחק נגמר! צברת סה"כ ${falafelBalls} כדורי פלאפל! ${falafelEmoji}\nהאם תרצה להתחיל מחדש?\nבחר 'Cancel' כדי לחזור לדף הבית.`;
      const restart = confirm(finalMessage);
    
      if (restart) {
        startNewGame();
      } else {
        window.location.href = "../index.html";
      }
      return null; // Return null to indicate game ended
    }
    
    let randIndex = getRandomIndex();
    while (seen.has(randIndex)) {
      randIndex = getRandomIndex();
    }

    seen.add(randIndex);
    return randIndex;
  }
  
  function startNewGame() {
    seen.clear();
    counter = 0; // Reset counter to 0
    falafelBalls = 0; // Reset falafel balls
    time = 30;
    clearInterval(timerInterval);
    
    // Get new random question
    const newIndex = getUniqueRandomIndex();
    if (newIndex !== null) { // Only proceed if we got a valid index
      currentQuestionIndex = newIndex;
      renderQuestion(currentQuestionIndex);
      timerInterval = setInterval(updateTimer, 1000);
    }
  }

  function renderQuestion(index) {
    counter++; // Increment counter before displaying
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
      const newIndex = getUniqueRandomIndex();
      if (newIndex !== null) {
        currentQuestionIndex = newIndex;
        renderQuestion(currentQuestionIndex);
        time = 30;
        timerInterval = setInterval(updateTimer, 1000);
      }
    }

    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  }

  // Set up next button handler
  nextButton.addEventListener("click", handleNextButtonClick);
  
  function handleNextButtonClick() {
    const selectedInput = document.querySelector('input[name="quizAnswer"]:checked');
    if (selectedInput) {
      const selectedIndex = parseInt(selectedInput.value);
      const isCorrect = selectedIndex === q.correct;

      if (isCorrect) {
        falafelBalls++; // Increment falafel balls
        alert(`תשובה נכונה! צברת ${falafelBalls} כדורי פלאפל! ${falafelEmoji}`);
        //saves progress
        let correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
        correctAnswers += 1;
        localStorage.setItem("correctAnswers", correctAnswers.toString());
      } else {
        alert("תשובה שגויה");
      }
    }

    clearInterval(timerInterval);
    time = 30;
    
    const newIndex = getUniqueRandomIndex();
    if (newIndex !== null) {
      currentQuestionIndex = newIndex;
      renderQuestion(currentQuestionIndex);
      timerInterval = setInterval(updateTimer, 1000);
    }
  }

  // Initialize the game
  fetch('questions.json')
    .then(res => res.json())
    .then(data => {
      questions = data[userLang][userDifficulty];
      const newIndex = getUniqueRandomIndex();
      if (newIndex !== null) {
        currentQuestionIndex = newIndex;
        renderQuestion(currentQuestionIndex);
        timerInterval = setInterval(updateTimer, 1000);
      }
    });





    function useHint() {
      const radioButtons = document.querySelectorAll('input[name="quizAnswer"]');
      const incorrectIndexes = [];
    
      // Collect indexes of incorrect answers
      radioButtons.forEach((radio, index) => {
        if (index !== q.correct) {
          incorrectIndexes.push(index);
        }
      });
    
      // Randomly select two incorrect answers to gray out
      while (incorrectIndexes.length > 2) {
        incorrectIndexes.splice(Math.floor(Math.random() * incorrectIndexes.length), 1);
      }
    
      // Gray out the selected incorrect answers
      incorrectIndexes.forEach(index => {
        const label = radioButtons[index].parentElement;
        label.style.opacity = "0.5"; // Gray out the label
        radioButtons[index].disabled = true; // Disable the radio button
      });
    
      // Disable the hint button after use
      document.getElementById("hint-btn").disabled = true;
    }
});