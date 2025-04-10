
    const btnTheme = document.getElementById("btnTheme");
    const btnMenu = document.getElementById("btnMenu");
    const popUpMenu = document.getElementById("popUpMenu");
    const root = document.documentElement;
    if(localStorage.theme === "dark") {
        root.classList.add("dark");
        btnTheme.textContent = "☀️ Light";
    }
  
    // Theme toggle
    btnTheme.addEventListener('click', () => {
        if (root.classList.contains('dark')) {
          root.classList.remove('dark');
          localStorage.theme = 'light';
          btnTheme.textContent = "🌙 Dark";
        } else {
          root.classList.add('dark');
          localStorage.theme = 'dark';
          btnTheme.textContent = "☀️ Light";
        }
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
    


    

  