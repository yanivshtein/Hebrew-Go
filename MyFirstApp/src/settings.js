const saveBtn = document.getElementById('saveBtn');
const nameInput = document.getElementById('name');
const languageInput = document.getElementById('language');
const difficultySelect = document.getElementById('difficulty');
const flags = document.querySelectorAll('.flag');

// Load saved values on page load
window.onload = () => {
  const savedName = localStorage.getItem('userName');
  const savedLang = localStorage.getItem('userLang');
  const savedDifficulty = localStorage.getItem('userDifficulty');

  if (savedName) {
    nameInput.value = savedName;
  }

  if (savedLang) {
    languageInput.value = savedLang;
    flags.forEach(flag => {
      if (flag.dataset.lang === savedLang) {
        flag.classList.add('border-blue-500');
      }
    });
  }

  if (savedDifficulty) {
    difficultySelect.value = savedDifficulty;
  }
};

// Handle flag click
flags.forEach(flag => {
  flag.addEventListener('click', () => {
    flags.forEach(f => f.classList.remove('border-blue-500'));
    flag.classList.add('border-blue-500');
    const selectedLang = flag.dataset.lang;
    languageInput.value = selectedLang;
    localStorage.setItem('userLang', selectedLang);
  });
});

// Handle Save button
saveBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const difficulty = difficultySelect.value;

  if (name === "") {
    alert("אנא הזן שם.");
    return;
  }

  localStorage.setItem('userName', name);
  localStorage.setItem('userDifficulty', difficulty);

  alert("ההגדרות נשמרו בהצלחה!");
});
