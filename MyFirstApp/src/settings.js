const saveBtn = document.getElementById("saveBtn");
const nameInput = document.getElementById('name');
const message = document.getElementById('message');

// Load saved name if it exists
window.onload = () => {
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    nameInput.value = savedName;
  }
};

saveBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  // Save to localStorage
  localStorage.setItem('userName', name);

  // Show success message
  message.classList.remove('hidden');

  // Hide message after 3 seconds
  setTimeout(() => {
    message.classList.add('hidden');
  }, 3000);
});

