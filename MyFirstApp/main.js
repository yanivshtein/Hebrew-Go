const btnTheme = document.getElementById("btnTheme");
    const btnMenu = document.getElementById("btnMenu");
    const popUpMenu = document.getElementById("popUpMenu");
    const root = document.documentElement;


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
    });

    window.onload = () => {
      const greetingEl = document.getElementById("greeting");
      const savedName = localStorage.getItem("userName");

      if (savedName && greetingEl) {
        greetingEl.textContent = `! היי ${savedName}`;
      }
    }