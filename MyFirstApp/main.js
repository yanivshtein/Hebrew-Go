const btnTheme = document.getElementById("btnTheme");
    const btnMenu = document.getElementById("btnMenu");
    const popUpMenu = document.getElementById("popUpMenu");
    const root = document.documentElement;

    // Progress bar calculation based of correct answers
    document.addEventListener("DOMContentLoaded", () => {
      const progressBar = document.getElementById("progressBar");
      const progressText = document.getElementById("progressText");
    
      const totalQuestions = 18; // fake number of questions
      const correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;
    
      const progress = Math.round((correctAnswers / totalQuestions) * 100);
    
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;
    });


    // Menu toggle
    btnMenu?.addEventListener("click", () => {
      popUpMenu?.classList.toggle("hidden");
    });
    window.addEventListener("DOMContentLoaded", () => {
      const greetingEl = document.getElementById("greeting");
      const savedName = localStorage.getItem("userName");

      if (savedName && greetingEl) {
        greetingEl.textContent = `! היי ${savedName}`;
      }

      // Set default language if not already set
  if (!localStorage.getItem("userLang")) {
    localStorage.setItem("userLang", "en"); // Default language: English
  }

  // Set default difficulty if not already set
  if (!localStorage.getItem("userDifficulty")) {
    localStorage.setItem("userDifficulty", "easy"); // Default difficulty: Easy
  }

    });

    window.onload = () => {
      const greetingEl = document.getElementById("greeting");
      const savedName = localStorage.getItem("userName");

      if (savedName && greetingEl) {
        greetingEl.textContent = `! היי ${savedName}`;
      }
    }
