document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement; // Reference the root element
    const btnTheme = document.getElementById("btnTheme"); // Theme toggle button
  
    btnTheme.dir = "ltr"; // Set the direction to left-to-right
    // Apply the saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      if (btnTheme) btnTheme.textContent = "☀️ מצב בהיר";
    } else {
      root.classList.remove("dark");
      if (btnTheme) btnTheme.textContent = "🌙 מצב כהה";
    }
  
    // Handle theme toggle button click
    if (btnTheme) {
      btnTheme.addEventListener("click", () => {
        if (root.classList.contains("dark")) {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
          btnTheme.textContent = "🌙 מצב כהה";
        } else {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
          btnTheme.textContent = "☀️ מצב בהיר";
        }
      });
    }
  });